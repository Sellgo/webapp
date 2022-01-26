import React from 'react';
import { connect } from 'react-redux';

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
  OFFSET_TO_CHART_WIDTH,
  UNIT_WIDTH,
} from '../../../../constants/PerfectStock/OrderPlanning';
import { getLeadTimeColor, getLeadTimeName } from '../../../../constants/PerfectStock';

type IOption = {
  key: string;
  value: string;
  text: string;
};

interface Props {
  setDateRange: (payload: DateRange) => void;
  setTimeSettings: (payload: string) => void;
  fetchPurchaseOrders: (isDraftMode: boolean) => void;
  fetchInventoryTable: () => void;
  updatePurchaseOrder: (payload: UpdatePurchaseOrderPayload) => void;
  setActivePurchaseOrder: (payload: PurchaseOrder) => void;
  activePurchaseOrder: GanttChartPurchaseOrder;
  purchaseOrders: PurchaseOrder[];
  isLoadingPurchaseOrders: boolean;
  timeSetting: TimeSetting;

  hideBottomBorder?: boolean;
  viewFilterOptions?: IOption[];
  viewFilter?: IOption;
  handleChangeFilterOption?: (value: string) => void;
  isDraftMode?: boolean;
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
    hideBottomBorder,
    viewFilterOptions,
    handleChangeFilterOption,
    viewFilter,
    isDraftMode,
  } = props;

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

    if (activePurchaseOrder) {
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

  React.useEffect(() => {
    if (isDraftMode) {
      fetchPurchaseOrders(isDraftMode);
    } else {
      fetchPurchaseOrders(false);
    }
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
            viewFilterOptions={viewFilterOptions}
            handleChangeFilterOption={handleChangeFilterOption}
            viewFilter={viewFilter}
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
    fetchPurchaseOrders: (isDraftMode: boolean) => {
      dispatch(fetchPurchaseOrders(isDraftMode));
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderGanttChart);
