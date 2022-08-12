import * as actionTypes from '../../constants/NotificationInbox';
import { setIn } from '../../utils/immutablity';

const INITIAL_STATE = {
  isIncomingNotification: true,
  notificationsList: [],
  isLoadingNotifications: false,
};

const notificationInboxReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case actionTypes.SET_IS_INCOMING_NOTIFICATION: {
      return setIn(state, 'isIncomingNotification', action.payload);
    }

    case actionTypes.SET_NOTIFICATIONS_LIST: {
      return setIn(state, 'notificationsList', action.payload);
    }

    case actionTypes.SET_IS_LOADING_NOTIFICATIONS: {
      return setIn(state, 'isLoadingNotifications', action.payload);
    }

    default:
      return state;
  }
};

export default notificationInboxReducer;
