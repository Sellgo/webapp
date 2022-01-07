import React from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'semantic-ui-react';

/* Components */
// @ts-ignore
import TimeLine from '../../../../components/ReactGanttChart/TimeLine';

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

  const [restockLimitEnabled, setRestockLimitEnabled] = React.useState<boolean>(false);

  /* Converting purchase orders to fit the format for gantt chart */
  const ganttChartPurchaseOrders: GanttChartPurchaseOrder[] = purchaseOrders.map(
    (purchaseOrder: any) => {
      const leadTimeDuration = purchaseOrder.lead_time_group?.lead_times?.reduce(
        (acc: number, leadTime: any) => acc + leadTime.duration,
        0
      );
      const id = purchaseOrder.id;
      const start = new Date(purchaseOrder.date);
      const end = new Date(
        start.getTime() + leadTimeDuration * 24 * 60 * 60 * 1000 * (leadTimeDuration || 0)
      );
      const name = `Order ${purchaseOrder.id}`;

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

  const updateOrder = (task: any, change: any) => {
    if (getDateOnly(task.start) !== getDateOnly(change.start)) {
      updatePurchaseOrder({
        id: task.id,
        date: getDateOnly(change.start),
      });
    }
  };

  const handleChangeTimeSetting = (payload: string) => {
    setTimeSettings(payload);
  };

  const handleSelectTask = (payload: GanttChartPurchaseOrder) => {
    const activePurchaseOrder = purchaseOrders.find(
      (purchaseOrder: PurchaseOrder) => purchaseOrder.id === payload.id
    );

    if (activePurchaseOrder && !showAllSkus) {
      setActivePurchaseOrder(activePurchaseOrder);
    }
  };

  React.useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  return (
    <>
      <div className={styles.ganttChartWrapper}>
        <div className={styles.ganttChartSettings} style={{ minWidth: SIDE_SETTING_WIDTH }}>
          <Checkbox
            toggle
            checked={restockLimitEnabled}
            onChange={() => setRestockLimitEnabled(!restockLimitEnabled)}
            label="Restock Limit"
            className={styles.settingToggle}
          />
          <Checkbox
            toggle
            checked={restockLimitEnabled}
            onChange={() => setRestockLimitEnabled(!restockLimitEnabled)}
            label="Calendar Check"
            className={styles.settingToggle}
          />
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
            onChange={() => setRestockLimitEnabled(!restockLimitEnabled)}
            label="Show inactive SKUs"
            className={`${styles.settingToggle} ${styles.settingToggle__indented}`}
          />
        </div>
        <div className={styles.ganttChart}>
          <TimeLine
            isLoading={isLoadingPurchaseOrders}
            onUpdateTask={updateOrder}
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
          />
        </div>
      </div>
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
