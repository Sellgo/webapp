import React from 'react';

// @ts-ignore
import TimeLine from '../../../components/ReactGanttChart/TimeLine';
// import { connect } from 'react-redux';

/* Styles */
// import styles from './index.module.scss';

// interface Props {}
const CONFIG = {
  header: {
    //Targert the time header containing the information month/day of the week, day and time.
    top: {
      //Tartget the month elements
      style: { backgroundColor: '#333333' }, //The style applied to the month elements
    },
    middle: {
      //Tartget elements displaying the day of week info
      style: { backgroundColor: 'chocolate' }, //The style applied to the day of week elements
      selectedStyle: { backgroundColor: '#b13525' }, //The style applied to the day of week elements when is selected
    },
    bottom: {
      //Tartget elements displaying the day number or time
      style: { background: 'grey', fontSize: 9 }, //the style tp be applied
      selectedStyle: { backgroundColor: '#b13525', fontWeight: 'bold' }, //the style tp be applied  when selected
    },
  },
  taskList: {
    //the right side task list
    title: {
      //The title od the task list
      label: 'Projects', //The caption to display as title
      style: {
        backgroundColor: '#333333',
        borderBottom: 'solid 1px silver',
        color: 'white',
        textAlign: 'center',
      }, //The style to be applied to the title
    },
    task: {
      // The items inside the list diplaying the task
      style: { backgroundColor: '#fbf9f9' }, // the style to be applied
    },
    verticalSeparator: {
      //the vertical seperator use to resize he width of the task list
      style: { backgroundColor: '#333333' }, //the style
      grip: {
        //the four square grip inside the vertical separator
        style: { backgroundColor: '#cfcfcd' }, //the style to be applied
      },
    },
  },
  dataViewPort: {
    //The are where we display the task
    rows: {
      //the row constainting a task
      style: { backgroundColor: '#fbf9f9', borderBottom: 'solid 0.5px #cfcfcd' },
    },
    task: {
      label: 'boo!',
      showLabel: true, //If the task display the a lable
      style: {
        position: 'absolute',
        borderRadius: 14,
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'grey',
      },
      selectedStyle: {}, //the style tp be applied  when selected
    },
  },
  links: {
    //The link between two task
    color: 'black',
    selectedColor: '#ff00fa',
  },
};

const DATA = [
  {
    id: 1,
    start: new Date(),
    end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 20),
    name: 'Order 1',
    subTasks: [1, 2, 3],
    color: 'orange',
  },
  {
    id: 2,
    start: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 20),
    end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 27),
    name: 'Order 1',
    color: 'orange',
  },
  {
    id: 3,
    start: new Date(),
    end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 20),
    name: 'Order 2',
  },
  {
    id: 4,
    start: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 20),
    end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 27),
    name: 'Order 2',
  },
];

const LINKS = [{ id: 1, start: 1, end: 2 }];
// const LINKS = [];

const OrderPlanning = () => {
  const updateOrder = (task: any) => {
    console.log(task);
    console.log('updateOrder');
  };

  return (
    <main>
      <h1> ORDER PLANNING </h1>
      <TimeLine onUpdateTask={updateOrder} data={DATA} mode="month" config={CONFIG} links={LINKS} />
    </main>
  );
};

// const mapStateToProps = (state: any) => {
//   return {};
// };

// export default connect(mapStateToProps)(OrderPlanning);
export default OrderPlanning;
