/* Constants */
import axios from 'axios';
import { AppConfig } from '../../config';
import { actionTypes, TIME_SETTING } from '../../constants/PerfectStock/OrderPlanning';

/* Interfaces */
import { DateRange, UpdatePurchaseOrderPayload } from '../../interfaces/PerfectStock/OrderPlanning';
import {
  getActivePurchaseOrder,
  getDateRange,
  getPurchaseOrders,
  getTimeSetting,
} from '../../selectors/PerfectStock/OrderPlanning';
import { sellerIDSelector } from '../../selectors/Seller';
import { error } from '../../utils/notifications';

/* Action to set loading state for sales estimation */
export const isLoadingInventoryTableResults = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_INVENTORY_TABLE_RESULTS,
    payload,
  };
};

/* Action to set loading state for purchase orders */
export const isLoadingPurchaseOrders = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_PURCHASE_ORDERS,
    payload,
  };
};

/* Action to set inventory table results */
export const setInventoryTableResults = (payload: any) => {
  return {
    type: actionTypes.SET_INVENTORY_TABLE_RESULTS,
    payload,
  };
};

/* Action to set inventory table results */
export const setPurchaseOrders = (payload: any) => {
  return {
    type: actionTypes.SET_PURCHASE_ORDERS,
    payload,
  };
};

/* Action to set time settings */
export const setTimeSettings = (payload: string) => {
  return {
    type: actionTypes.SET_TIME_SETTING,
    payload,
  };
};

/* Action to set date range */
export const setDateRange = (payload: DateRange) => {
  return {
    type: actionTypes.SET_DATE_RANGE,
    payload,
  };
};

/* Action to set active purchase order */
export const setActivePurchaseOrder = (payload: any) => {
  return {
    type: actionTypes.SET_ACTIVE_PURCHASE_ORDER,
    payload,
  };
};

/*********** Async Actions ************************ */

/* Action to fetch purchase orders */
export const fetchPurchaseOrders = () => async (dispatch: any, getState: any) => {
  try {
    const state = getState();
    const activePurchaseOrder = getActivePurchaseOrder(state);
    const sellerId = sellerIDSelector();
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/purchase-orders${
      activePurchaseOrder ? `/${activePurchaseOrder.id}` : ''
    }`;

    dispatch(isLoadingPurchaseOrders(true));

    const { data } = await axios.get(URL);
    console.log(data);
    if (data) {
      dispatch(setPurchaseOrders(data));
    }
  } catch (err) {
    dispatch(setPurchaseOrders([]));
    console.error('Error fetching sales estimation', err);
  }
  dispatch(isLoadingPurchaseOrders(false));
};

/* Action to fetch purchase orders */
export const updatePurchaseOrder = (payload: UpdatePurchaseOrderPayload) => async (
  dispatch: any,
  getState: any
) => {
  try {
    /* Update the redux state first for responsiveness */
    const state = getState();
    const oldPurchaseOrders = getPurchaseOrders(state);
    const newPurchaseOrders = oldPurchaseOrders.map((order: any) => {
      if (order.id === payload.id) {
        return {
          ...order,
          date: payload.date,
        };
      }
      return order;
    });
    dispatch(setPurchaseOrders(newPurchaseOrders));

    /* Update backend's purchase orders */
    const sellerId = sellerIDSelector();
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/purchase-orders/${payload.id}`;
    const requestPayload = { date: new Date(payload.date) };
    const { status } = await axios.patch(URL, requestPayload);

    /* If backend update failed, revert back to old purchase order */
    if (status === 200) {
      dispatch(fetchInventoryTable());
    } else {
      error('Failed to update purchase order.');
      dispatch(setPurchaseOrders(oldPurchaseOrders));
    }
  } catch (err) {
    dispatch(setPurchaseOrders([]));
    console.error('Error fetching sales estimation', err);
  }
  dispatch(isLoadingPurchaseOrders(false));
};

/* Fetch inventory table */
export const fetchInventoryTable = () => async (dispatch: any, getState: any) => {
  try {
    dispatch(isLoadingInventoryTableResults(true));
    const state = getState();
    const sellerId = sellerIDSelector();
    const startDate = new Date(getDateRange(state).startDate);
    const startDateString = `${startDate.getFullYear()}-${startDate.getMonth() +
      1}-${startDate.getDate()}`;
    const endDate = new Date(getDateRange(state).endDate);
    const endDateString = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
    const timeSettings = getTimeSetting(state);
    let displayMode;
    if (timeSettings === TIME_SETTING.DAY) {
      displayMode = 'daily';
    } else {
      displayMode = 'weekly';
    }
    const activePurchaseOrder = getActivePurchaseOrder(state);
    console.log(activePurchaseOrder);

    const resourceString = `&start_date=${startDateString}&end_date=${endDateString}&display_mode=${displayMode}${
      activePurchaseOrder ? `&purchase_order_ids=${activePurchaseOrder.id}` : ''
    }`;
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/purchase-orders/order-plan-overview?${resourceString}`;

    const { data } = await axios.get(URL);
    if (data) {
      dispatch(setInventoryTableResults(data));
    }
  } catch (err) {
    dispatch(setInventoryTableResults([]));
    console.error('Error fetching inventory table', err);
  }
  dispatch(isLoadingInventoryTableResults(false));
};
