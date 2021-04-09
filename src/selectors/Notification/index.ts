import get from 'lodash/get';

export const selectIsNotificationOpen = (state: any) =>
  get(state, 'notification.isNotificationOpen');
