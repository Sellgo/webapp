import * as actionTypes from '../../constants/NotificationInbox';
import { AppConfig } from '../../config';
import axios from 'axios';
import { sellerIDSelector } from '../../selectors/Seller';
import { selectNotificationsList } from '../../selectors/NotificationInbox';

export const setNotifications = (payload: any) => ({
  type: actionTypes.SET_NOTIFICATIONS_LIST,
  payload,
});

export const toggleLoadingNotification = (payload: boolean) => ({
  type: actionTypes.SET_IS_LOADING_NOTIFICATIONS,
  payload,
});

export const toggleIncomingNotification = (payload: boolean) => ({
  type: actionTypes.SET_IS_INCOMING_NOTIFICATION,
  payload,
});

export const fetchNotifications = () => async (dispatch: any, _getState: any) => {
  try {
    const sellerId = sellerIDSelector();
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/alerts`;

    dispatch(toggleLoadingNotification(true));
    const { data } = await axios.get(URL);

    if (data) {
      dispatch(setNotifications(data));
    }
  } catch (err) {
    console.error('Error fetching notifications', err);
  }
  dispatch(toggleLoadingNotification(false));
};

export const toggleMarkAsRead = (id: number) => async (dispatch: any, getState: any) => {
  try {
    const sellerId = sellerIDSelector();
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/alerts`;

    const payload = { alerts: [{ id, is_read: true }] };
    const { data } = await axios.patch(URL, payload);

    if (data) {
      const updatedNotificationList = selectNotificationsList(getState()).map((notification: any) =>
        notification.id === id ? data[0] : notification
      );

      dispatch(setNotifications(updatedNotificationList));
    }
  } catch (err) {
    console.error('Error updating notifications', err);
  }
};

export const toggleMarkAllAsRead = (payload: any[]) => async (dispatch: any) => {
  try {
    const sellerId = sellerIDSelector();
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/alerts`;

    const { data } = await axios.patch(URL, { alerts: payload });

    if (data) {
      dispatch(setNotifications(data));
    }
  } catch (err) {
    console.error('Error updating notifications', err);
  }
};
