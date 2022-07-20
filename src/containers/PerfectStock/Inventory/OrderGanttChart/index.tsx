import React from 'react';
import { connect } from 'react-redux';
import { Modal, Dimmer, Loader, Confirm, Icon } from 'semantic-ui-react';

/* Components */
// @ts-ignore
import TimeLine from '../../../../components/ReactGanttChart/TimeLine';
import AutoGenerateOrderPopup from './AutoGenerateOrderPopup';
import AlignOrderPopup from './AlignOrderPopup';
import SetPrioritySkuPopup from './SetPrioritySkuPopup';
import ConnectTplPopup from './ConnectTplPopup';
import SetPaymentTermPopup from './SetPaymentTermPopup';

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
  alignOrder,
} from '../../../../actions/PerfectStock/OrderPlanning';

/* Selectors */
import {
  getActivePurchaseOrder,
  getIsLoadingInventoryTableResults,
  getIsLoadingPurchaseOrders,
  getPurchaseOrders,
  getPurchaseOrdersLoadingMessage,
  getTimeSetting,
} from '../../../../selectors/PerfectStock/OrderPlanning';

/* Types */
import {
  AutoGeneratePurchaseOrderPayload,
  DateRange,
  GanttChartPurchaseOrder,
  PurchaseOrder,
  UpdatePurchaseOrderPayload,
  AlignPurchaseOrderPayload,
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

type IOption = {
  key: string;
  value: string;
  text: string;
};

interface Props {
  setDateRange: (payload: DateRange) => void;
  setTimeSettings: (payload: string) => void;
  fetchPurchaseOrders: () => void;
  updatePurchaseOrder: (payload: UpdatePurchaseOrderPayload, refresh?: boolean) => void;
  setActivePurchaseOrder: (payload: PurchaseOrder) => void;
  generateNextOrder: (payload: AutoGeneratePurchaseOrderPayload) => void;
  alignOrder: (payload: AlignPurchaseOrderPayload) => void;
  activePurchaseOrder: GanttChartPurchaseOrder;
  purchaseOrders: PurchaseOrder[];
  isLoadingPurchaseOrders: boolean;
  isLoadingInventoryTableResults: boolean;
  purchaseOrdersLoadingMessage: string;
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
    purchaseOrdersLoadingMessage,
    isLoadingPurchaseOrders,
    isLoadingInventoryTableResults,
    updatePurchaseOrder,
    setActivePurchaseOrder,
    activePurchaseOrder,
    generateNextOrder,
    alignOrder,

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

  const [isChartExpanded, setIsChartExpanded] = React.useState(false);
  /* ================================================================ */
  /* Generating next order */
  /* ================================================================ */
  const [isAutoGeneratingNextOrder, setIsAutoGeneratingNextOrder] = React.useState(false);
  const [generateNextOrderDetails, setGenerateNextOrderDetails] = React.useState<{
    id: number;
    merchantListings: any[];
    defaultPrioritySku?: string;
  }>({ id: 0, merchantListings: [] });

  const handleGenerateNextOrderClick = (payload: GanttChartPurchaseOrder) => {
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
        defaultPrioritySku: payload.prioritySku,
      });
      setIsAutoGeneratingNextOrder(true);
    }
  };

  /* ================================================================ */
  /* Setting priority sku */
  /* ================================================================ */
  const [isSettingPrioritySku, setIsSettingPrioritySku] = React.useState(false);
  const [prioritySkuDetails, setPrioritySkuDetails] = React.useState({});

  const handleSetPrioritySkuClick = (payload: GanttChartPurchaseOrder) => {
    const selectedPurchaseOrder = purchaseOrders.find((purchaseOrder: PurchaseOrder) => {
      return purchaseOrder.id === payload.id;
    });

    if (selectedPurchaseOrder) {
      const selectedMerchantListings = selectedPurchaseOrder.merchant_listings.map(
        (orderProduct: any) => ({
          id: orderProduct.id?.toString() || '',
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

  /* ================================================================ */
  /* Setting payment terms */
  /* ================================================================ */
  const [isSettingPaymentTerm, setIsSettingPaymentTerm] = React.useState(false);
  const [paymentTermSkuDetails, setPaymentTermSkuDetails] = React.useState({});

  const handleSetPaymentTerm = (payload: GanttChartPurchaseOrder) => {
    const selectedPurchaseOrder = purchaseOrders.find((purchaseOrder: PurchaseOrder) => {
      return purchaseOrder.id === payload.id;
    });

    if (selectedPurchaseOrder) {
      setIsSettingPaymentTerm(true);
      setPaymentTermSkuDetails({
        id: payload.id,
        order_payment_term_id: payload.order_payment_term_id,
      });
    }
  };

  /* ================================================================ */
  /* Aligning order */
  /* ================================================================ */
  const [isAligningOrder, setIsAligningOrder] = React.useState(false);
  const [alignOrderDetails, setAlignOrderDetails] = React.useState({});

  const handleAlignOrder = (payload: GanttChartPurchaseOrder) => {
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

      setIsAligningOrder(true);
      setAlignOrderDetails({
        id: payload.id,
        prioritySku: payload.prioritySku,
        selectedMerchantListings,
      });
    }
  };

  const [isConnectingTpl, setIsConnectingTpl] = React.useState(false);
  const [connectTplDetails, setConnectTplDetails] = React.useState<{
    id: number;
    selectedVendor: number | null;
  }>({
    id: 0,
    selectedVendor: null,
  });

  const handleConnectTpl = (payload: GanttChartPurchaseOrder) => {
    setConnectTplDetails({ id: payload.id, selectedVendor: payload.vendorId });
    setIsConnectingTpl(true);
  };

  const handleDisconnectTpl = (payload: GanttChartPurchaseOrder) => {
    updatePurchaseOrder({
      id: payload.id,
      vendor_id: null,
    });
  };

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
      const paymentTermId = purchaseOrder.order_payment_term_id;
      const prioritySku = purchaseOrder.merchant_listings?.find(
        (merchantListing: any) => merchantListing.is_priority
      );
      const vendorId = purchaseOrder.vendor_id;

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
        order_payment_term_id: paymentTermId,
        vendorId,
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
        info("Orders must arrive after today's date");
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

  const handleDeleteAllTasks = () => {
    const purchaseOrderIds = purchaseOrders.map((purchaseOrder: PurchaseOrder) => purchaseOrder.id);
    updatePurchaseOrder({
      purchase_order_ids: purchaseOrderIds,
      status: 'inactive',
    });

    /* If current url is create-order, push to /order */
    if (window.location.pathname === '/aistock/create-order') {
      history.push('/aistock/order');
    }
  };

  const handleEditTask = (payload: GanttChartPurchaseOrder) => {
    handleSelectTask(payload);
    history.push(`/aistock/create-order`);
  };

  const handleEditActiveTask = () => {
    if (activePurchaseOrder.id !== -1 && activePurchaseOrder.id) {
      handleSelectTask(activePurchaseOrder);
    } else if (ganttChartPurchaseOrders.length > 1) {
      handleSelectTask(ganttChartPurchaseOrders[1]);
    }
    history.push(`/aistock/create-order`);
  };

  /* ===================================== */
  /* Checked purchase orders */
  /* ===================================== */
  const [checkedPurchaseOrders, setCheckedPurchaseOrders] = React.useState<
    GanttChartPurchaseOrder[]
  >([]);
  const [deletingPurchaseOrders, setDeletingPurchaseOrders] = React.useState<boolean>(false);

  const handleCheckPurchaseOrder = (payload: GanttChartPurchaseOrder) => {
    if (payload.id === -1) {
      if (checkedPurchaseOrders.length === ganttChartPurchaseOrders.length) {
        setCheckedPurchaseOrders([]);
      } else {
        setCheckedPurchaseOrders(ganttChartPurchaseOrders);
      }
      return;
    }

    if (checkedPurchaseOrders.find((po: GanttChartPurchaseOrder) => po.id === payload.id)) {
      setCheckedPurchaseOrders(
        checkedPurchaseOrders.filter((po: GanttChartPurchaseOrder) => po.id !== payload.id)
      );
    } else {
      setCheckedPurchaseOrders([...checkedPurchaseOrders, payload]);
    }
  };

  const handleDeleteSelectedTasks = () => {
    const purchaseOrderIds = checkedPurchaseOrders.map(
      (purchaseOrder: GanttChartPurchaseOrder) => purchaseOrder.id
    );
    updatePurchaseOrder({
      purchase_order_ids: purchaseOrderIds.filter((id: number) => id !== -1),
      status: 'inactive',
    });

    /* If current url is create-order, push to /order */
    if (
      window.location.pathname === '/aistock/create-order' &&
      ganttChartPurchaseOrders.length === 0
    ) {
      history.push('/aistock/order');
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
          ${isChartExpanded ? styles.ganttChart__expanded : ''}
          ${hideBottomBorder ? styles.ganttChart__hideBottomBorder : ''}`}
        >
          <Dimmer
            active={isLoadingPurchaseOrders || isLoadingInventoryTableResults}
            inverted
            className={styles.dimmerContent}
          >
            <Loader inline />
            <p>{purchaseOrdersLoadingMessage}</p>
          </Dimmer>
          <TimeLine
            /* Default Props */
            isLoading={isLoadingPurchaseOrders || isLoadingInventoryTableResults}
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
            purchaseOrders={purchaseOrders}
            handleUpdatePrioritySku={updatePurchaseOrder}
            checkedPurchaseOrders={checkedPurchaseOrders}
            handleChangeMode={handleChangeTimeSetting}
            handleDeleteTask={handleDeleteTask}
            handleDeleteAllTasks={handleDeleteAllTasks}
            handleEditTask={handleEditTask}
            handleEditActiveTask={handleEditActiveTask}
            handleCheckPurchaseOrder={handleCheckPurchaseOrder}
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
            generateNextOrder={handleGenerateNextOrderClick}
            handleSetPrioritySku={handleSetPrioritySkuClick}
            handleSetPaymentTerm={handleSetPaymentTerm}
            handleDeleteSelectedTasks={() => setDeletingPurchaseOrders(true)}
            handleAlignOrder={handleAlignOrder}
            handleConnectTpl={handleConnectTpl}
            handleDisconnectTpl={handleDisconnectTpl}
          />

          <button
            onClick={() => setIsChartExpanded(!isChartExpanded)}
            className={styles.expandButton}
          >
            {isChartExpanded ? (
              <Icon name="compress" size="huge" />
            ) : (
              <Icon name="expand" size="huge" />
            )}
          </button>

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
          <Modal
            open={isSettingPaymentTerm}
            content={
              <SetPaymentTermPopup
                handleCancel={() => setIsSettingPaymentTerm(false)}
                prioritySkuDetails={paymentTermSkuDetails}
                refreshPurchaseOrders={fetchPurchaseOrders}
                handleUpdatePaymentTermSku={updatePurchaseOrder}
              />
            }
            onClose={() => setIsSettingPrioritySku(false)}
            className={styles.setPrioritySkuModal}
          />
          <Modal
            open={isAligningOrder}
            content={
              <AlignOrderPopup
                handleCancel={() => setIsAligningOrder(false)}
                alignOrderDetails={alignOrderDetails}
                handleAlignOrder={alignOrder}
              />
            }
            onClose={() => setIsAligningOrder(false)}
          />
          <Modal
            open={isConnectingTpl}
            content={
              <ConnectTplPopup
                connectTplDetails={connectTplDetails}
                handleCancel={() => setIsConnectingTpl(false)}
              />
            }
            onClose={() => setIsConnectingTpl(false)}
            className={styles.setPrioritySkuModal}
          />
          <Confirm
            content={'Delete selected orders?'}
            open={deletingPurchaseOrders}
            onCancel={() => setDeletingPurchaseOrders(false)}
            onConfirm={() => {
              setDeletingPurchaseOrders(false);
              handleDeleteSelectedTasks();
            }}
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
    purchaseOrdersLoadingMessage: getPurchaseOrdersLoadingMessage(state),
    isLoadingPurchaseOrders: getIsLoadingPurchaseOrders(state),
    isLoadingInventoryTableResults: getIsLoadingInventoryTableResults(state),
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
    updatePurchaseOrder: (payload: UpdatePurchaseOrderPayload, refresh?: boolean) => {
      dispatch(updatePurchaseOrder(payload, refresh));
    },
    setActivePurchaseOrder: (task: PurchaseOrder) => {
      dispatch(setActivePurchaseOrder(task));
    },
    generateNextOrder: (payload: AutoGeneratePurchaseOrderPayload) => {
      dispatch(generateNextOrder(payload));
    },
    alignOrder: (payload: AlignPurchaseOrderPayload) => {
      dispatch(alignOrder(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderGanttChart);
