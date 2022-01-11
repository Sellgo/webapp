import React from 'react';
import { connect } from 'react-redux';
import { Checkbox, Icon, Popup } from 'semantic-ui-react';
import axios from 'axios';

/* Components */
// @ts-ignore
import TimeLine from '../../../../components/ReactGanttChart/TimeLine';
import DaysOfInventoryPopup from './DaysOfInventoryPopup';
import InputFilter from '../../../../components/FormFilters/InputFilter';
import SaveCancelOptions from '../../../../components/SaveCancelOptions';

/* Styles */
import styles from './index.module.scss';

/* Actions */
import {
  setDateRange,
  setTimeSettings,
  fetchPurchaseOrders,
  updatePurchaseOrder,
  fetchInventoryTable,
  setActivePurchaseOrder,
  setInventoryTableShowAllSkus,
} from '../../../../actions/PerfectStock/OrderPlanning';

/* Selectors */
import {
  getActivePurchaseOrder,
  getInventoryTableShowAllSkus,
  getIsLoadingPurchaseOrders,
  getPurchaseOrders,
  getTimeSetting,
} from '../../../../selectors/PerfectStock/OrderPlanning';

/* Types */
import {
  DateRange,
  GanttChartPurchaseOrder,
  PurchaseOrder,
  UpdatePurchaseOrderPayload,
} from '../../../../interfaces/PerfectStock/OrderPlanning';
import { LeadTime } from '../../../../interfaces/PerfectStock/SalesProjection';

/* Utils */
import { getDateOnly } from '../../../../utils/date';
import { success, error } from '../../../../utils/notifications';
import { AppConfig } from '../../../../config';
import { sellerIDSelector } from '../../../../selectors/Seller';

/* Constants */
import {
  TimeSetting,
  SIDE_SETTING_WIDTH,
  GANTT_ORDERS_WIDTH,
  UNIT_WIDTH,
} from '../../../../constants/PerfectStock/OrderPlanning';
import { getLeadTimeColor, getLeadTimeName } from '../../../../constants/PerfectStock';

interface Props {
  setDateRange: (payload: DateRange) => void;
  setTimeSettings: (payload: string) => void;
  fetchPurchaseOrders: () => void;
  fetchInventoryTable: () => void;
  updatePurchaseOrder: (payload: UpdatePurchaseOrderPayload) => void;
  setActivePurchaseOrder: (payload: PurchaseOrder) => void;
  activePurchaseOrder: GanttChartPurchaseOrder;
  purchaseOrders: PurchaseOrder[];
  isLoadingPurchaseOrders: boolean;
  timeSetting: TimeSetting;
  showAllSkus: boolean;
  setInventoryTableShowAllSkus: (payload: boolean) => void;
}

const OrderGanttChart = (props: Props) => {
  const {
    setDateRange,
    timeSetting,
    setTimeSettings,
    fetchPurchaseOrders,
    purchaseOrders,
    isLoadingPurchaseOrders,
    updatePurchaseOrder,
    setActivePurchaseOrder,
    activePurchaseOrder,
    showAllSkus,
    setInventoryTableShowAllSkus,
  } = props;

  const [daysOfInventory, setDaysOfInventory] = React.useState<number>(0);
  const [defaultDaysOfInventory, setDefaultDaysOfInventory] = React.useState<number>(0);
  const [isEditingDaysOfInventory, setIsEditingDaysOfInventory] = React.useState<boolean>(false);

  /* State for mini action box popup for days of inventory */
  const [isDaysOfInventoryEditOptionsOpen, setDaysOfInventoryEditOptionsOpen] = React.useState(
    false
  );

  /* State for main pop up for days of inventory edits */
  const [daysOfInventoryPopupOpen, setDaysOfInventoryPopupOpen] = React.useState<boolean>(false);

  /* ================================================================ */
  /* Converting purchase orders to fit the format for gantt chart */
  /* ================================================================ */
  const ganttChartPurchaseOrders: GanttChartPurchaseOrder[] = purchaseOrders.map(
    (purchaseOrder: PurchaseOrder) => {
      const leadTimeDuration = purchaseOrder.lead_time_group?.lead_times?.reduce(
        (acc: number, leadTime: any) => acc + leadTime.duration,
        0
      );
      const id = purchaseOrder.id;
      const start = new Date(purchaseOrder.date);
      const end = new Date(
        start.getTime() + leadTimeDuration * 24 * 60 * 60 * 1000 * (leadTimeDuration || 0)
      );
      const name = purchaseOrder.number;

      const leadTimeDate = start;
      const subTasks = purchaseOrder.lead_time_group?.lead_times?.map(
        (leadTime: LeadTime, index: number) => {
          const id = index;
          const start = leadTimeDate;
          const end = new Date(leadTimeDate.getTime() + leadTime.duration * 24 * 60 * 60 * 1000);
          const name = getLeadTimeName(leadTime.type);
          const color = getLeadTimeColor(leadTime.type);
          return { id, start, end, name, color };
        }
      );

      return {
        id,
        start,
        end,
        name,
        subTasks: subTasks || [],
      };
    }
  );

  const handleChangeTimeSetting = (payload: string) => {
    setTimeSettings(payload);
  };

  /* ===================================== */
  /* Task and order handlers */
  /* ===================================== */
  const handleSelectTask = (payload: GanttChartPurchaseOrder) => {
    const activePurchaseOrder = purchaseOrders.find(
      (purchaseOrder: PurchaseOrder) => purchaseOrder.id === payload.id
    );

    if (activePurchaseOrder && !showAllSkus) {
      setActivePurchaseOrder(activePurchaseOrder);
    }
  };

  const handleDeleteTask = (payload: GanttChartPurchaseOrder) => {
    updatePurchaseOrder({
      id: payload.id,
      status: 'inactive',
    });
  };

  const handleUpdateTask = (task: any, change: any) => {
    if (getDateOnly(task.start) !== getDateOnly(change.start)) {
      updatePurchaseOrder({
        id: task.id,
        date: getDateOnly(change.start),
      });
    }
  };

  /* ===================================== */
  /* Days of inventory settings handlers */
  /* ===================================== */
  const fetchDaysOfInventoryConfig = async () => {
    try {
      const { status, data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/perfect-stock/config`
      );
      if (status === 200) {
        setDaysOfInventory(data.stockout_threshold_inventory);
        setDefaultDaysOfInventory(data.stockout_threshold_inventory);
      }
    } catch (error) {
      console.error(error);
      setDaysOfInventory(0);
      setDefaultDaysOfInventory(0);
    }
  };

  const handleDaysOfInventoryChange = (value: string) => {
    if (parseInt(value) === defaultDaysOfInventory) {
      setIsEditingDaysOfInventory(false);
    } else {
      setIsEditingDaysOfInventory(true);
    }
    setDaysOfInventory(parseInt(value));
  };

  const handleUpdateDaysOfInventorySave = async () => {
    try {
      const { status } = await axios.patch(
        `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/perfect-stock/config`,
        {
          stockout_threshold_inventory: daysOfInventory,
        }
      );
      setIsEditingDaysOfInventory(false);
      if (status === 200) {
        setDefaultDaysOfInventory(daysOfInventory);
        success('Successfully updated days of inventory setting.');
      }
    } catch (err) {
      console.error(err);
      setDaysOfInventory(defaultDaysOfInventory);
      error('Failed to update days of inventory setting.');
    }
  };

  const handleUpdateDaysOfInventoryCancel = () => {
    setIsEditingDaysOfInventory(false);
    setDaysOfInventory(defaultDaysOfInventory);
  };

  React.useEffect(() => {
    fetchPurchaseOrders();
    fetchDaysOfInventoryConfig();
  }, []);

  return (
    <>
      <div className={styles.ganttChartWrapper}>
        <div className={styles.ganttChartSettings} style={{ minWidth: SIDE_SETTING_WIDTH }}>
          <span>Show SKUs</span>
          <Checkbox
            radio
            checked={!showAllSkus}
            onChange={() => setInventoryTableShowAllSkus(!showAllSkus)}
            label="Orders-based"
            className={styles.settingToggle}
          />
          <Checkbox
            radio
            checked={showAllSkus}
            onChange={() => setInventoryTableShowAllSkus(!showAllSkus)}
            label="All"
            className={styles.settingToggle}
          />
          <Checkbox
            checked={true}
            onChange={() => null}
            label="Show inactive SKUs"
            className={`${styles.settingToggle} ${styles.settingToggle__indented}`}
          />
          <div className={styles.daysOfInventoryEdit}>
            <InputFilter
              label="Days of Inventory"
              placeholder="100"
              isNumber
              value={daysOfInventory?.toString() || ''}
              handleChange={handleDaysOfInventoryChange}
              className={styles.settingInput}
            />
            <Popup
              open={isDaysOfInventoryEditOptionsOpen}
              onClose={() => setDaysOfInventoryEditOptionsOpen(false)}
              on="click"
              position="bottom left"
              className="timeLine-actionsPopover"
              basic
              content={
                <>
                  <div className="timeLine-actionOptions">
                    <p>EDIT</p>
                    <button
                      onClick={() => {
                        setDaysOfInventoryPopupOpen(true);
                        setDaysOfInventoryEditOptionsOpen(false);
                      }}
                    >
                      <Icon name="pencil" />
                      <span>Edit Days Of Inventory</span>
                    </button>
                  </div>
                </>
              }
              trigger={
                <button
                  className={'timeLine-triggerButton'}
                  onClick={() => setDaysOfInventoryEditOptionsOpen(true)}
                >
                  <Icon name="ellipsis vertical" />
                </button>
              }
            />
          </div>
          {isEditingDaysOfInventory && (
            <SaveCancelOptions
              className={styles.saveCancelOptions}
              handleSave={handleUpdateDaysOfInventorySave}
              handleCancel={handleUpdateDaysOfInventoryCancel}
            />
          )}
        </div>
        <div className={styles.ganttChart}>
          <TimeLine
            isLoading={isLoadingPurchaseOrders}
            onUpdateTask={handleUpdateTask}
            data={ganttChartPurchaseOrders}
            mode={timeSetting}
            selectedTask={activePurchaseOrder}
            onSelectTask={handleSelectTask}
            onViewportChange={(start: Date, end: Date) => {
              setDateRange({ startDate: start.toString(), endDate: end.toString() });
            }}
            sideWidth={GANTT_ORDERS_WIDTH}
            unitWidth={UNIT_WIDTH}
            handleChangeMode={handleChangeTimeSetting}
            handleDeleteTask={handleDeleteTask}
          />
        </div>
      </div>

      <DaysOfInventoryPopup
        open={daysOfInventoryPopupOpen}
        setOpenPopup={setDaysOfInventoryPopupOpen}
      />
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    timeSetting: getTimeSetting(state),
    purchaseOrders: getPurchaseOrders(state),
    isLoadingPurchaseOrders: getIsLoadingPurchaseOrders(state),
    activePurchaseOrder: getActivePurchaseOrder(state),
    showAllSkus: getInventoryTableShowAllSkus(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setDateRange: (payload: DateRange) => {
      dispatch(setDateRange(payload));
    },
    setTimeSettings: (payload: string) => {
      dispatch(setTimeSettings(payload));
    },
    fetchPurchaseOrders: () => {
      dispatch(fetchPurchaseOrders());
    },
    updatePurchaseOrder: (payload: UpdatePurchaseOrderPayload) => {
      dispatch(updatePurchaseOrder(payload));
    },
    fetchInventoryTable: () => {
      dispatch(fetchInventoryTable());
    },
    setActivePurchaseOrder: (task: PurchaseOrder) => {
      dispatch(setActivePurchaseOrder(task));
    },
    setInventoryTableShowAllSkus: (payload: boolean) => {
      dispatch(setInventoryTableShowAllSkus(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderGanttChart);
