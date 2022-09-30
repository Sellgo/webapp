import get from 'lodash/get';

export const selectIncomingNotification = (state: any) =>
  get(state, 'notificationInbox.isIncomingNotification');

export const selectNotificationsList = (state: any) =>
  get(state, 'notificationInbox.notificationsList');

export const selectIsLoadingNotifications = (state: any) =>
  get(state, 'notificationInbox.isLoadingNotifications');
