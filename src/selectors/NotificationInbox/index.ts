import get from 'lodash/get';

export const selectIsNewIncomingNotification = (state: any) =>
  get(state, 'notificationInbox.isNewIncomingNotification');

export const selectNotificationsList = (state: any) =>
  get(state, 'notificationInbox.notificationsList');
