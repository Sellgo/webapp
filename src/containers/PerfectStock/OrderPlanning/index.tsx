import React from 'react';
import { connect } from 'react-redux';

// @ts-ignore
import TimeLine from '../../../components/ReactGanttChart/TimeLine';
import InventoryTable from './InventoryTable';

/* Styles */
// import styles from './index.module.scss';

/* Actions */
import { setDateRange, setTimeSettings } from '../../../actions/PerfectStock/OrderPlanning';

/* Selectors */
import { getTimeSetting } from '../../../selectors/PerfectStock/OrderPlanning';

/* Types */
import { DateRange, Order } from '../../../interfaces/PerfectStock/OrderPlanning';
import { TimeSetting } from '../../../constants/PerfectStock/OrderPlanning';
import SelectionFilter from '../../../components/FormFilters/SelectionFilter';

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
const TIME_SETTINGS = [
  {
    key: 'month',
    value: 'month',
    text: 'Day',
  },
  {
    key: 'year',
    value: 'year',
    text: 'Week',
  },
];

const OrderPlanning = (props: Props) => {
  const { setDateRange, timeSetting, setTimeSettings } = props;
  const [tasks, setTasks] = React.useState<Order[]>(DATA);
  const [selectedTask, setSelectedTask] = React.useState<Order | null>(null);
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
    <main>
      <br />
      <br />
      <SelectionFilter
        filterOptions={TIME_SETTINGS}
        value={timeSetting}
        handleChange={(value: string) => setTimeSettings(value)}
        placeholder=""
      />
      <br />
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
      />
      <InventoryTable />
    </main>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlanning);
