import React from 'react';

// @ts-ignore
import TimeLine from '../../../components/ReactGanttChart/TimeLine';
// import { connect } from 'react-redux';

/* Styles */
// import styles from './index.module.scss';

/* Types */
import { Order } from '../../../interfaces/PerfectStock/OrderPlanning';

// interface Props {}

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
        color: 'red',
      },
      {
        id: 2,
        start: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 10),
        end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 20),
        name: 'Phase 2',
        color: 'blue',
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
        color: 'red',
      },
      {
        id: 2,
        start: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 10),
        end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 15),
        name: 'Phase 2',
        color: 'blue',
      },
      {
        id: 3,
        start: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 15),
        end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 20),
        name: 'Phase 3',
        color: 'orange',
      },
    ],
  },
];

const OrderPlanning = () => {
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
      <h1> ORDER PLANNING </h1>
      <TimeLine
        onUpdateTask={updateOrder}
        data={DATA}
        mode="month"
        selectedTask={selectedTask}
        onSelectTask={(task: Order) => {
          console.log('Selected from outside', task);
          setSelectedTask(task);
        }}
      />
    </main>
  );
};

// const mapStateToProps = (state: any) => {
//   return {};
// };

// export default connect(mapStateToProps)(OrderPlanning);
export default OrderPlanning;
