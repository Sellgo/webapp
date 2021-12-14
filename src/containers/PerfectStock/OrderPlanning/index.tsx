import React from 'react';

// @ts-ignore
import TimeLine from '../../../components/ReactGanttChart/TimeLine';
import InventoryTable from './InventoryTable';

/* Styles */
// import styles from './index.module.scss';

/* Types */
import { DateRange, Order } from '../../../interfaces/PerfectStock/OrderPlanning';
import { setDateRange } from '../../../actions/PerfectStock/OrderPlanning';
import { connect } from 'react-redux';

interface Props {
  setDateRange: (payload: DateRange) => void;
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

const OrderPlanning = (props: Props) => {
  const { setDateRange } = props;
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
      <TimeLine
        onUpdateTask={updateOrder}
        data={DATA}
        mode="month"
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

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setDateRange: (payload: DateRange) => {
      dispatch(setDateRange(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlanning);
