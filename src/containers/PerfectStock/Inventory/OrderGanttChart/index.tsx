import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';

/* Components */
// @ts-ignore
import TimeLine from '../../../../components/ReactGanttChart/TimeLine';
import AutoGenerateOrderPopup from './AutoGenerateOrderPopup';

/* Styles */
import styles from './index.module.scss';

/* Actions */
import {
  setDateRange,
  setTimeSettings,
  fetchPurchaseOrders,
  updatePurchaseOrder,
  setActivePurchaseOrder,
  generateNextOrder,
} from '../../../../actions/PerfectStock/OrderPlanning';

/* Selectors */
import {
  getActivePurchaseOrder,
  getIsLoadingPurchaseOrders,
  getPurchaseOrders,
  getTimeSetting,
} from '../../../../selectors/PerfectStock/OrderPlanning';

/* Types */
import {
  AutoGeneratePurchaseOrderPayload,
  DateRange,
  GanttChartPurchaseOrder,
  PurchaseOrder,
  UpdatePurchaseOrderPayload,
} from '../../../../interfaces/PerfectStock/OrderPlanning';
import { LeadTime } from '../../../../interfaces/PerfectStock/SalesProjection';

/* Utils */
import { getDateOnly } from '../../../../utils/date';
import history from '../../../../history';

/* Constants */
import {
  TimeSetting,
  OFFSET_TO_CHART_WIDTH,
  UNIT_WIDTH,
  EMPTY_PURCHASE_ORDER,
  EMPTY_GANTT_CHART_PURCHASE_ORDER,
} from '../../../../constants/PerfectStock/OrderPlanning';
import { getLeadTimeColor, getLeadTimeName } from '../../../../constants/PerfectStock';
import { info } from '../../../../utils/notifications';
import SetPrioritySkuPopup from './SetPrioritySkuPopup';

type IOption = {
  key: string;
  value: string;
  text: string;
};

interface Props {
  setDateRange: (payload: DateRange) => void;
  setTimeSettings: (payload: string) => void;
  fetchPurchaseOrders: () => void;
  updatePurchaseOrder: (payload: UpdatePurchaseOrderPayload) => void;
  setActivePurchaseOrder: (payload: PurchaseOrder) => void;
  generateNextOrder: (payload: AutoGeneratePurchaseOrderPayload) => void;
  activePurchaseOrder: GanttChartPurchaseOrder;
  purchaseOrders: PurchaseOrder[];
  isLoadingPurchaseOrders: boolean;
  timeSetting: TimeSetting;

  hideBottomBorder?: boolean;
  viewFilterOptions?: IOption[];
  viewFilter?: string;
  handleChangeFilterOption?: (value: string) => void;
  isDraftMode?: boolean;
}

const OrderGanttChart = (props: Props) => {
  const {
    /* Purchase Order Related Props */
    fetchPurchaseOrders,
    purchaseOrders,
    isLoadingPurchaseOrders,
    updatePurchaseOrder,
    setActivePurchaseOrder,
    activePurchaseOrder,
    generateNextOrder,

    /* Date Range Related Props */
    setDateRange,
    timeSetting,
    setTimeSettings,

    /* Aesthetic Related Props */
    hideBottomBorder,
    viewFilterOptions,
    handleChangeFilterOption,
    viewFilter,
    isDraftMode,
  } = props;

  const [isAutoGeneratingNextOrder, setIsAutoGeneratingNextOrder] = React.useState(false);
  const [generateNextOrderDetails, setGenerateNextOrderDetails] = React.useState<{
    id: number;
    merchantListings: any[];
  }>({ id: 0, merchantListings: [] });

  const [isSettingPrioritySku, setIsSettingPrioritySku] = React.useState(false);
  const [prioritySkuDetails, setPrioritySkuDetails] = React.useState({});
  /* ================================================================ */
  /* Converting purchase orders to fit the format for gantt chart */
  /* ================================================================ */
  let ganttChartPurchaseOrders: GanttChartPurchaseOrder[] = purchaseOrders.map(
    (purchaseOrder: PurchaseOrder) => {
      const leadTimeDuration = purchaseOrder.lead_time_group?.lead_times?.reduce(
        (acc: number, leadTime: any) => acc + leadTime.duration,
        0
      );
      const id = purchaseOrder.id;
      const start = new Date(purchaseOrder.date);
      const end = new Date(start.getTime() + leadTimeDuration * 24 * 60 * 60 * 1000);
      const name = purchaseOrder.number;
      const is_included = purchaseOrder.is_included;
      const prioritySku = purchaseOrder.merchant_listings?.find(
        (merchantListing: any) => merchantListing.is_priority
      );

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
        is_included,
        prioritySku: prioritySku?.sku,
        subTasks: subTasks || [],
      };
    }
  );

  if (!isDraftMode) {
    ganttChartPurchaseOrders = [EMPTY_GANTT_CHART_PURCHASE_ORDER, ...ganttChartPurchaseOrders];
  }

  const handleChangeTimeSetting = (payload: string) => {
    setTimeSettings(payload);
  };

  /* ===================================== */
  /* Task and order handlers */
  /* ===================================== */
  const handleSelectTask = (payload: GanttChartPurchaseOrder) => {
    const newActivePurchaseOrder = purchaseOrders.find(
      (purchaseOrder: PurchaseOrder) => purchaseOrder.id === payload.id
    );

    if (newActivePurchaseOrder && newActivePurchaseOrder.id !== activePurchaseOrder.id) {
      setActivePurchaseOrder(newActivePurchaseOrder);
    } else if (payload.id === -1) {
      setActivePurchaseOrder(EMPTY_PURCHASE_ORDER);
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
      const duration = Math.round(
        (change.end.getTime() - change.start.getTime()) / (24 * 60 * 60 * 1000)
      );
      let newDate = getDateOnly(change.start);

      /* If the new arrival date is before the current date, then force the arrival date to be today */
      if (change.end < new Date()) {
        newDate = getDateOnly(new Date(new Date().getTime() - duration * 24 * 60 * 60 * 1000));
        info("Orders must arrive before today's date");
      }

      /* If the new arrival date is more than 2 years in the future,
       then force the arrival date to 2 years in the future */
      const maximumDate = new Date(new Date().getTime() + 2 * 365 * 24 * 60 * 60 * 1000);
      if (change.end > maximumDate) {
        newDate = getDateOnly(new Date(maximumDate.getTime() - duration * 24 * 60 * 60 * 1000));
        info('Orders can only be forecasted up to 2 years in the future');
      }

      updatePurchaseOrder({
        id: task.id,
        date: newDate,
      });
    }
  };

  const handleEditTask = (payload: GanttChartPurchaseOrder) => {
    handleSelectTask(payload);
    history.push(`/aistock/create-order`);
  };

  const handleGenerateNextOrder = (payload: GanttChartPurchaseOrder) => {
    const selectedPurchaseOrder = purchaseOrders.find((purchaseOrder: PurchaseOrder) => {
      return purchaseOrder.id === payload.id;
    });

    if (selectedPurchaseOrder) {
      const selectedMerchantListings = selectedPurchaseOrder.merchant_listings.map(
        (orderProduct: any) => ({
          id: orderProduct.merchant_listing_id?.toString() || '',
          productName: orderProduct.title,
          asin: orderProduct.asin,
          img: orderProduct.image_url,
          skuName: orderProduct.sku,
          activePurchaseOrders: orderProduct.active_purchase_orders,
          fulfillmentChannel: orderProduct.fulfillment_channel,
          skuStatus: orderProduct.sku_status,
        })
      );

      setGenerateNextOrderDetails({
        merchantListings: selectedMerchantListings,
        id: selectedPurchaseOrder.id,
      });
      setIsAutoGeneratingNextOrder(true);
    }
  };

  const handleSetPrioritySku = (payload: GanttChartPurchaseOrder) => {
    const selectedPurchaseOrder = purchaseOrders.find((purchaseOrder: PurchaseOrder) => {
      return purchaseOrder.id === payload.id;
    });

    if (selectedPurchaseOrder) {
      const selectedMerchantListings = selectedPurchaseOrder.merchant_listings.map(
        (orderProduct: any) => ({
          id: orderProduct.merchant_listing_id?.toString() || '',
          productName: orderProduct.title,
          asin: orderProduct.asin,
          img: orderProduct.image_url,
          skuName: orderProduct.sku,
          activePurchaseOrders: orderProduct.active_purchase_orders,
          fulfillmentChannel: orderProduct.fulfillment_channel,
          skuStatus: orderProduct.sku_status,
        })
      );

      setIsSettingPrioritySku(true);
      setPrioritySkuDetails({
        id: payload.id,
        prioritySku: payload.prioritySku,
        selectedMerchantListings,
      });
    }
  };

  React.useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  return (
    <>
      <div className={styles.ganttChartWrapper}>
        <div
          className={`
          ${styles.ganttChart} 
          ${hideBottomBorder ? styles.ganttChart__hideBottomBorder : ''}`}
        >
          <TimeLine
            /* Default Props */
            isLoading={isLoadingPurchaseOrders}
            onUpdateTask={handleUpdateTask}
            data={ganttChartPurchaseOrders}
            mode={timeSetting}
            selectedTask={activePurchaseOrder}
            onSelectTask={handleSelectTask}
            onViewportChange={(start: Date, end: Date) => {
              setDateRange({ startDate: start.toString(), endDate: end.toString() });
            }}
            sideWidth={OFFSET_TO_CHART_WIDTH - 18}
            unitWidth={UNIT_WIDTH}
            handleChangeMode={handleChangeTimeSetting}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            viewFilterOptions={viewFilterOptions}
            handleChangeFilterOption={handleChangeFilterOption}
            viewFilter={viewFilter}
            handleIncludedToggle={(id: number) => {
              updatePurchaseOrder({
                id,
                is_included: !purchaseOrders.find(
                  (purchaseOrder: PurchaseOrder) => purchaseOrder.id === id
                )?.is_included,
              });
            }}
            isDraftMode={isDraftMode}
            generateNextOrder={handleGenerateNextOrder}
            handleSetPrioritySku={handleSetPrioritySku}
          />

          <Modal
            open={isAutoGeneratingNextOrder}
            content={
              <AutoGenerateOrderPopup
                handleCancel={() => setIsAutoGeneratingNextOrder(false)}
                generateNextOrderDetails={generateNextOrderDetails}
                generateNextOrder={generateNextOrder}
              />
            }
            onClose={() => setIsAutoGeneratingNextOrder(false)}
            className={styles.autoGenerateOrderModal}
          />
          <Modal
            open={isSettingPrioritySku}
            content={
              <SetPrioritySkuPopup
                handleCancel={() => setIsSettingPrioritySku(false)}
                prioritySkuDetails={prioritySkuDetails}
                handleUpdatePrioritySku={updatePurchaseOrder}
              />
            }
            onClose={() => setIsSettingPrioritySku(false)}
            className={styles.setPrioritySkuModal}
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
    setActivePurchaseOrder: (task: PurchaseOrder) => {
      dispatch(setActivePurchaseOrder(task));
    },
    generateNextOrder: (payload: AutoGeneratePurchaseOrderPayload) => {
      dispatch(generateNextOrder(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderGanttChart);
