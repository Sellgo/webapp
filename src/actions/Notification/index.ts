import * as actionTypes from '../../constants/Notification';

export const toggleNotification = (payload: boolean) => ({
  type: actionTypes.SET_NOTIFICATION_STATE,
  payload,
});
