import * as actionTypes from '../../constants/NotificationInbox';

export const setNotifiation = (payload: boolean) => ({
  type: actionTypes.SET_NOTIFICATION,
  payload,
});

export const toggleIncomingNotification = (payload: boolean) => ({
  type: actionTypes.SET_INCOMING_NOTIFICATION,
  payload,
});
