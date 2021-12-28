/* Constants */
import axios from 'axios';
import { AppConfig } from '../../config';
import { actionTypes, TIME_SETTING } from '../../constants/PerfectStock/OrderPlanning';

/* Interfaces */
import { DateRange, UpdatePurchaseOrderPayload } from '../../interfaces/PerfectStock/OrderPlanning';

/* Selectors */
import {
  getActivePurchaseOrder,
  getDateRange,
  getPurchaseOrders,
  getRefreshInventoryTableId,
  getTimeSetting,
} from '../../selectors/PerfectStock/OrderPlanning';
import { sellerIDSelector } from '../../selectors/Seller';

/* Utils */
import { getDateOnly } from '../../utils/date';
import { error, success } from '../../utils/notifications';

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

/* Action to set refresh inventory table id */
export const setRefreshInventoryTableId = (payload: number) => {
  return {
    type: actionTypes.SET_REFRESH_INVENTORY_TABLE_ID,
    payload,
  };
};

/* Action to set fetch progress for inventory table refresh status */
export const setIsFetchingProgressForRefresh = (payload: boolean) => {
  return {
    type: actionTypes.SET_IS_FETCHING_PROGRESS_FOR_REFRESH,
    payload,
  };
};

/* Action to set progress for inventory table refresh status */
export const setRefreshProgress = (payload: number) => {
  return {
    type: actionTypes.SET_REFRESH_PROGRESS,
    payload,
  };
};

/* Action to set inventory table update date */
export const setInventoryTableUpdateDate = (payload: string) => {
  return {
    type: actionTypes.SET_INVENTORY_TABLE_UPDATE_DATE,
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
    /* Set inventory to be loading */
    dispatch(isLoadingInventoryTableResults(true));

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
    const formattedDate = getDateOnly(new Date(payload.date));
    const requestPayload = { date: formattedDate };
    const { status } = await axios.patch(URL, requestPayload);

    /* If backend update failed, revert back to old purchase order */
    if (status === 200) {
      dispatch(fetchInventoryTable());
    } else {
      error('Failed to update purchase order.');
      dispatch(isLoadingInventoryTableResults(false));
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

    /* Generate and format start/end dates */
    const startDate = new Date(getDateRange(state).startDate);
    const startDateString = getDateOnly(startDate);
    const endDate = new Date(getDateRange(state).endDate);
    const endDateString = getDateOnly(endDate);

    /* Get display mode (daily or weekly) */
    const timeSettings = getTimeSetting(state);
    let displayMode;
    if (timeSettings === TIME_SETTING.DAY) {
      displayMode = 'daily';
    } else {
      displayMode = 'weekly';
    }

    /* Get active purchase order highlighted (if any) */
    const activePurchaseOrder = getActivePurchaseOrder(state);

    /* Temporary pagination settings */
    const resourceString =
      `&start_date=${startDateString}` +
      `&end_date=${endDateString}` +
      `&display_mode=${displayMode}` +
      `&page=1` +
      `&per_page=20` +
      `${activePurchaseOrder ? `&purchase_order_ids=${activePurchaseOrder.id}` : ''}`;
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/purchase-orders/order-plan-overview?${resourceString}`;

    const { data } = await axios.get(URL);
    if (data && data.results) {
      dispatch(setInventoryTableResults(data.results));
      dispatch(setInventoryTableUpdateDate(data.last_forecast_update));
    }
  } catch (err) {
    dispatch(setInventoryTableResults([]));
    console.error('Error fetching inventory table', err);
  }
  dispatch(isLoadingInventoryTableResults(false));
};

/* Action to refresh inventory table results */
export const refreshInventoryTable = () => async (dispatch: any) => {
  try {
    const sellerId = sellerIDSelector();
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/perfect-stock/refresh-forecast`;
    const { data } = await axios.post(URL);

    if (data && data.perfect_stock_job_id) {
      dispatch(setRefreshInventoryTableId(data.perfect_stock_job_id));
      dispatch(setIsFetchingProgressForRefresh(true));
      success('Refreshing inventory table information.');
    }
  } catch (err) {
    dispatch(setIsFetchingProgressForRefresh(false));
    const { status } = err.response;
    if (status === 429) {
      error('Only 1 refresh per day allowed.');
    }
    console.error('Error updating sales estimation', err);
  }
};

/* Action to get refresh progress */
export const fetchRefreshProgress = () => async (dispatch: any, getState: any) => {
  try {
    const sellerId = sellerIDSelector();
    const state = getState();
    const refreshId = getRefreshInventoryTableId(state);
    const URL =
      `${AppConfig.BASE_URL_API}sellers/${sellerId}/perfect-stock/job/progress` +
      `?perfect_stock_job_id=${refreshId}`;
    const { data } = await axios.get(URL);

    if (data && data.progress) {
      if (data.status === 'completed') {
        dispatch(fetchInventoryTable());
        dispatch(setIsFetchingProgressForRefresh(false));
        dispatch(setRefreshInventoryTableId(-1));
      } else if (data.status === 'failed') {
        dispatch(setIsFetchingProgressForRefresh(false));
        dispatch(setRefreshInventoryTableId(-1));
        error('Refreshing of inventory table failed.');
      } else {
        dispatch(setRefreshProgress(parseFloat(data.progress)));
      }
    }
  } catch (err) {
    dispatch(setIsFetchingProgressForRefresh(false));
    console.error('Error fetching progress for perfect stock', err);
  }
};
