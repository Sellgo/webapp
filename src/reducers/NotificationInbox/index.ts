import * as actionTypes from '../../constants/NotificationInbox';

const data = [
  {
    message: 'Adipisicing velit incidunt impedit dolor accusamus.',
    status: 'info',
    read: false,
    sku_name: 'sku name',
    asin: 'asin',
    order_name: 'order name',
    date: '2 days ago',
  },
  {
    message: 'Adipisicing velit incidunt impedit dolor accusamus.',
    status: 'info',
    read: false,
    sku_name: 'sku name',
    asin: 'asin',
    order_name: 'order name',
    date: '2 days ago',
  },
  {
    message: 'Adipisicing velit incidunt impedit dolor accusamus.',
    status: 'info',
    read: true,
    sku_name: 'sku name',
    asin: 'asin',
    order_name: 'order name',
    date: '2 days ago',
  },
  {
    message: 'Adipisicing velit incidunt impedit dolor accusamus.',
    status: 'info',
    read: false,
    sku_name: 'sku name',
    asin: 'asin',
    order_name: 'order name',
    date: '2 days ago',
  },
  {
    message: 'Adipisicing velit incidunt impedit dolor accusamus.',
    status: 'info',
    read: false,
    sku_name: 'sku name',
    asin: 'asin',
    order_name: 'order name',
    date: '2 days ago',
  },
  {
    message: 'Adipisicing velit incidunt impedit dolor accusamus.',
    status: 'info',
    read: false,
    sku_name: 'sku name',
    asin: 'asin',
    order_name: 'order name',
    date: '2 days ago',
  },
  {
    message: 'Adipisicing velit incidunt impedit dolor accusamus.',
    status: 'info',
    read: false,
    sku_name: 'sku name',
    asin: 'asin',
    order_name: 'order name',
    date: '2 days ago',
  },
];

const INITIAL_STATE = {
  isNewIncomingNotification: false,
  notificationsList: data,
};

const notificationInboxReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case actionTypes.SET_INCOMING_NOTIFICATION: {
      return {
        ...state,
        isNewIncomingNotification: action.payload,
      };
    }

    case actionTypes.SET_NOTIFICATION: {
      return {
        ...state,
        notificationsList: [action.payload, ...state.notificationsList],
      };
    }

    default:
      return state;
  }
};

export default notificationInboxReducer;
