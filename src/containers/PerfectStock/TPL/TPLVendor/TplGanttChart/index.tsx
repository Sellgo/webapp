import React from 'react';
import { connect } from 'react-redux';
import { Dimmer, Loader, Confirm, Icon } from 'semantic-ui-react';

/* Components */
// @ts-ignore
import TimeLine from '../../../../../components/TplGanttChartComponent/TimeLine';
/* Styles */
import styles from './index.module.scss';

/* Actions */
import {
  setDateRange,
  setTimeSettings,
  fetchShippingInbounds,
  updateTplInboundShippings,
  setActiveTplInbound,
} from '../../../../../actions/PerfectStock/Tpl';

/* Selectors */
import {
  getTplActiveVendor,
  getActiveTplInbound,
  getIsLoadingTplInbounds,
  getTimeSetting,
  getTplInbounds,
} from '../../../../../selectors/PerfectStock/Tpl';

/* Types */
import {
  DateRange,
  GanttChartPurchaseOrder,
} from '../../../../../interfaces/PerfectStock/OrderPlanning';

import {
  TplInbound,
  TplVendor,
  UpdateTplInboundPayload,
} from '../../../../../interfaces/PerfectStock/Tpl';

/* Constants */
import {
  OFFSET_TO_CHART_WIDTH,
  UNIT_WIDTH,
  EMPTY_GANTT_CHART_PURCHASE_ORDER,
  TimeSetting,
} from '../../../../../constants/PerfectStock/OrderPlanning';

import { EMPTY_TPL_INBOUND } from '../../../../../constants/PerfectStock/Tpl';

type IOption = {
  key: string;
  value: string;
  text: string;
};

interface Props {
  setDateRange: (payload: DateRange) => void;
  setTimeSettings: (payload: string) => void;
  fetchShippingInbounds: () => void;
  updateTplInboundShippings: (payload: UpdateTplInboundPayload) => void;
  setActiveTplInbound: (payload: TplInbound) => void;
  activeTplInbound: GanttChartPurchaseOrder;
  tplInbounds: TplInbound[];
  isLoadingTplInbounds: boolean;
  hideBottomBorder?: boolean;
  viewFilterOptions?: IOption[];
  viewFilter?: string;
  handleChangeFilterOption?: (value: string) => void;
  isDraftMode?: boolean;
  timeSetting: TimeSetting;
  activeTplVendor: TplVendor;
}

const TplGanttChart = (props: Props) => {
  const {
    /* Purchase Order Related Props */
    fetchShippingInbounds,
    tplInbounds,
    isLoadingTplInbounds,
    updateTplInboundShippings,
    setActiveTplInbound,
    activeTplInbound,
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
    activeTplVendor,
  } = props;

  const [isChartExpanded, setIsChartExpanded] = React.useState(false);

  /* ================================================================ */
  /* Converting tpl inbounds to fit the format for gantt chart */
  /* ================================================================ */
  let ganttChartPurchaseOrders: any[] = tplInbounds.map((tplInbound: any) => {
    const id = tplInbound.id;
    const start = new Date(tplInbound.date);
    const end = new Date(start.getTime() + tplInbound.lead_time * 24 * 60 * 60 * 1000);
    const name = tplInbound.name;
    const is_included = tplInbound.is_included;
    const vendorId = tplInbound.vendor_id;
    const leadTimeDate = start;
    const subTasks = [
      {
        id: 0,
        start: tplInbound.date,
        end: new Date(leadTimeDate.getTime() + Number(tplInbound.lead_time) * 24 * 60 * 60 * 1000),
        name: name,
        color: '#BDC5CC',
      },
    ];

    return {
      id,
      start,
      end,
      name,
      is_included,
      vendorId,
      subTasks: subTasks || [],
    };
  });

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
    const newActiveTplInbound = tplInbounds.find(
      (tplInbound: TplInbound) => tplInbound.id === payload.id
    );

    if (newActiveTplInbound && newActiveTplInbound.id !== activeTplInbound?.id) {
      setActiveTplInbound(newActiveTplInbound);
    } else if (payload.id === -1) {
      setActiveTplInbound(EMPTY_TPL_INBOUND);
    }
  };

  const handleDeleteTask = (payload: any) => {
    updateTplInboundShippings({
      inbound_shipping_ids: [payload.id],
      status: 'inactive',
    });
  };

  // const handleUpdateTask = (task: any, change: any) => {
  //   if (getDateOnly(task.start) !== getDateOnly(change.start)) {
  //     const duration = Math.round(
  //       (change.end.getTime() - change.start.getTime()) / (24 * 60 * 60 * 1000)
  //     );
  //     let newDate = getDateOnly(change.start);

  //     /* If the new arrival date is before the current date, then force the arrival date to be today */
  //     if (change.end < new Date()) {
  //       newDate = getDateOnly(new Date(new Date().getTime() - duration * 24 * 60 * 60 * 1000));
  //       info("Orders must arrive after today's date");
  //     }

  //     /* If the new arrival date is more than 2 years in the future,
  //      then force the arrival date to 2 years in the future */
  //     const maximumDate = new Date(new Date().getTime() + 2 * 365 * 24 * 60 * 60 * 1000);
  //     if (change.end > maximumDate) {
  //       newDate = getDateOnly(new Date(maximumDate.getTime() - duration * 24 * 60 * 60 * 1000));
  //       info('Orders can only be forecasted up to 2 years in the future');
  //     }

  //     updateTplInboundShippings({
  //       id: task.id,
  //       date: newDate,
  //     });
  //   }
  // };

  const handleDeleteAllTasks = () => {
    const tplInboundIds = tplInbounds.map((tplInbound: TplInbound) => tplInbound.id);
    updateTplInboundShippings({
      inbound_shipping_ids: tplInboundIds,
      status: 'inactive',
    });
  };

  const handleDeleteSelectedTasks = () => {
    const tplInboundsIds = checkedPurchaseOrders.map(
      (purchaseOrder: GanttChartPurchaseOrder) => purchaseOrder.id
    );
    updateTplInboundShippings({
      inbound_shipping_ids: tplInboundsIds.filter((id: number) => id !== -1),
      status: 'inactive',
    });
  };

  // const handleEditActiveTask = () => {
  //   if (activeTplInbound.id !== -1 && activeTplInbound.id) {
  //     handleSelectTask(activeTplInbound);
  //   } else if (ganttChartPurchaseOrders.length > 1) {
  //     handleSelectTask(ganttChartPurchaseOrders[1]);
  //   }
  //   history.push(`/aistock/create-order`);
  // };

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

  React.useEffect(() => {
    if (activeTplVendor.id >= 0) {
      fetchShippingInbounds();
    }
  }, [activeTplVendor]);

  return (
    <>
      <div className={styles.ganttChartWrapper}>
        <div
          className={`
          ${styles.ganttChart}
          ${isChartExpanded ? styles.ganttChart__expanded : ''}
          ${hideBottomBorder ? styles.ganttChart__hideBottomBorder : ''}`}
        >
          <Dimmer active={isLoadingTplInbounds} inverted className={styles.dimmerContent}>
            <Loader inline />
          </Dimmer>
          <TimeLine
            /* Default Props */
            isLoading={isLoadingTplInbounds}
            // onUpdateTask={handleUpdateTask}
            data={ganttChartPurchaseOrders}
            mode={timeSetting}
            selectedTask={activeTplInbound}
            onSelectTask={handleSelectTask}
            onViewportChange={(start: Date, end: Date) => {
              setDateRange({ startDate: start.toString(), endDate: end.toString() });
            }}
            sideWidth={OFFSET_TO_CHART_WIDTH - 18}
            unitWidth={UNIT_WIDTH}
            purchaseOrders={tplInbounds}
            handleUpdatePrioritySku={updateTplInboundShippings}
            checkedPurchaseOrders={checkedPurchaseOrders}
            handleChangeMode={handleChangeTimeSetting}
            handleDeleteTask={handleDeleteTask}
            handleDeleteAllTasks={handleDeleteAllTasks}
            handleCheckPurchaseOrder={handleCheckPurchaseOrder}
            viewFilterOptions={viewFilterOptions}
            handleChangeFilterOption={handleChangeFilterOption}
            viewFilter={viewFilter}
            handleIncludedToggle={(id: number) => {
              updateTplInboundShippings({
                inbound_shipping_ids: [id],
                is_included: !tplInbounds.find((tplInbound: TplInbound) => tplInbound.id === id)
                  ?.is_included,
              });
            }}
            isDraftMode={isDraftMode}
            handleDeleteSelectedTasks={() => setDeletingPurchaseOrders(true)}
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
    tplInbounds: getTplInbounds(state),
    isLoadingTplInbounds: getIsLoadingTplInbounds(state),
    activeTplInbound: getActiveTplInbound(state),
    activeTplVendor: getTplActiveVendor(state),
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
    fetchShippingInbounds: () => {
      dispatch(fetchShippingInbounds());
    },
    updateTplInboundShippings: (payload: UpdateTplInboundPayload) => {
      dispatch(updateTplInboundShippings(payload));
    },
    setActiveTplInbound: (task: TplInbound) => {
      dispatch(setActiveTplInbound(task));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TplGanttChart);
