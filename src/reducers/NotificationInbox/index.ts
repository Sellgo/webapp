import * as actionTypes from '../../constants/NotificationInbox';
import { setIn } from '../../utils/immutablity';

const INITIAL_STATE = {
  isIncomingNotification: true,
  notificationsList: { results: [] },
  isLoadingNotifications: false,
};

const notificationInboxReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case actionTypes.SET_IS_INCOMING_NOTIFICATION: {
      return setIn(state, 'isIncomingNotification', action.payload);
    }

    case actionTypes.SET_NOTIFICATIONS_LIST: {
      let notificationsResults: any[] = state.notificationsList.results;

      if (action.payload?.results?.length) {
        for (let i = 0; i < action.payload.results.length; i++) {
          const indexOfObject = state.notificationsList.results.findIndex(
            (item: any) => item.id === action.payload.results[i].id
          );

          if (indexOfObject === -1) {
            notificationsResults = [...notificationsResults, action.payload.results[i]];
          }
        }
      }

      return {
        ...state,
        notificationsList: {
          ...state.notificationsList,
          ...action.payload,
          results: notificationsResults,
        },
      };
    }

    case actionTypes.UPDATE_NOTIFICATIONS_LIST: {
      return {
        ...state,
        notificationsList: {
          ...action.payload,
        },
      };
    }

    case actionTypes.SET_IS_LOADING_NOTIFICATIONS: {
      return setIn(state, 'isLoadingNotifications', action.payload);
    }

    default:
      return state;
  }
};

export default notificationInboxReducer;
