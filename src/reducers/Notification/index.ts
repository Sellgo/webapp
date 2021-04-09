import * as actionTypes from '../../constants/Notification';

const INITIAL_STATE = {
  isNotificationOpen: false,
};

const notificationReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case actionTypes.SET_NOTIFICATION_STATE: {
      return {
        ...state,
        isNotificationOpen: action.payload,
      };
    }

    default:
      return state;
  }
};

export default notificationReducer;
