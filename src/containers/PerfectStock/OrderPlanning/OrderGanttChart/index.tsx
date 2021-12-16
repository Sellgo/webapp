import React from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'semantic-ui-react';

/* Components */
// @ts-ignore
import TimeLine from '../../../../components/ReactGanttChart/TimeLine';

/* Styles */
import styles from './index.module.scss';

/* Actions */
import { setDateRange, setTimeSettings } from '../../../../actions/PerfectStock/OrderPlanning';

/* Selectors */
import { getTimeSetting } from '../../../../selectors/PerfectStock/OrderPlanning';

/* Types */
import { DateRange, Order } from '../../../../interfaces/PerfectStock/OrderPlanning';

/* Constants */
import {
  TimeSetting,
  SIDE_SETTING_WIDTH,
  GANTT_ORDERS_WIDTH,
  UNIT_WIDTH,
} from '../../../../constants/PerfectStock/OrderPlanning';

interface Props {
  setDateRange: (payload: DateRange) => void;
  setTimeSettings: (payload: string) => void;
  timeSetting: TimeSetting;
}

const DATA = [
  {
    id: 1,
    start: new Date(),
    end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 20),
    name: 'Order 1',
    subTasks: [
      {
        id: 1,
        start: new Date(),
        end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 10),
        name: 'Phase 1',
        color: '#779ADE',
      },
      {
        id: 2,
        start: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 10),
        end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 20),
        name: 'Phase 2',
        color: '#F4AA74',
      },
    ],
  },
  {
    id: 2,
    start: new Date(),
    end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 20),
    name: 'Order 1',
    subTasks: [
      {
        id: 1,
        start: new Date(),
        end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 10),
        name: 'Phase 1',
        color: '#779ADE',
      },
      {
        id: 2,
        start: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 10),
        end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 15),
        name: 'Phase 2',
        color: '#F4AA74',
      },
      {
        id: 3,
        start: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 15),
        end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 20),
        name: 'Phase 3',
        color: '#EC5B62',
      },
    ],
  },
];

const OrderGanttChart = (props: Props) => {
  const { setDateRange, timeSetting, setTimeSettings } = props;
  const [tasks, setTasks] = React.useState<Order[]>(DATA);
  const [selectedTask, setSelectedTask] = React.useState<Order | null>(null);
  const [restockLimitEnabled, setRestockLimitEnabled] = React.useState<boolean>(false);
  const updateOrder = (task: any, change: any) => {
    task.start = change.start;
    task.end = change.end;

    // Replace the task
    const newTasks = tasks.map((t: any) => {
      if (t.id === task.id) {
        return task;
      }
      return t;
    });
    setTasks([...newTasks]);
  };

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
            checked={restockLimitEnabled}
            onChange={() => setRestockLimitEnabled(!restockLimitEnabled)}
            label="Orders-based"
            className={styles.settingToggle}
          />
          <Checkbox
            radio
            checked={restockLimitEnabled}
            onChange={() => setRestockLimitEnabled(!restockLimitEnabled)}
            label="All"
            className={styles.settingToggle}
          />
          <Checkbox
            checked={restockLimitEnabled}
            onChange={() => setRestockLimitEnabled(!restockLimitEnabled)}
            label="Show inactive SKUs"
            className={`${styles.settingToggle} ${styles.settingToggle__indented}`}
          />
        </div>
        <div className={styles.ganttChart}>
          <TimeLine
            onUpdateTask={updateOrder}
            data={DATA}
            mode={timeSetting}
            selectedTask={selectedTask}
            onSelectTask={(task: Order) => {
              console.log('Selected from outside', task);
              setSelectedTask(task);
            }}
            onViewportChange={(start: Date, end: Date) => {
              setDateRange({ startDate: start.toString(), endDate: end.toString() });
            }}
            sideWidth={GANTT_ORDERS_WIDTH}
            unitWidth={UNIT_WIDTH}
            handleChangeMode={setTimeSettings}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    timeSetting: getTimeSetting(state),
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderGanttChart);
