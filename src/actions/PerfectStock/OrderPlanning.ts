/* Constants */
import axios from 'axios';
import { AppConfig } from '../../config';
import {
  actionTypes,
  EMPTY_PURCHASE_ORDER,
  TIME_SETTING,
} from '../../constants/PerfectStock/OrderPlanning';

/* Interfaces */
import {
  PurchaseOrder,
  DateRange,
  UpdatePurchaseOrderPayload,
  DraftOrderTemplate,
  InventoryTablePayload,
  AutoGeneratePurchaseOrderPayload,
} from '../../interfaces/PerfectStock/OrderPlanning';

/* Selectors */
import {
  getActiveDraftOrderTemplate,
  getActivePurchaseOrder,
  getDateRange,
  getDraftOrderInformation,
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

/* Action to set loading message for purchase orders */
export const setPurchaseOrdersLoadingMessage = (payload: string) => {
  return {
    type: actionTypes.SET_PURCHASE_ORDERS_LOADING_MESSAGE,
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
export const setPurchaseOrders = (payload: PurchaseOrder[]) => {
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
export const setActivePurchaseOrder = (payload: PurchaseOrder | null) => {
  return {
    type: actionTypes.SET_ACTIVE_PURCHASE_ORDER,
    payload: payload,
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

/* Action to display all skus regardless of orders in inventory table */
export const setInventoryTableShowAllSkus = (payload: boolean) => (
  dispatch: any,
  useState: any
) => {
  /* If show all SKUs, set active purchase orders to null */
  if (payload) {
    dispatch(setActivePurchaseOrder(null));
  } else {
    /* If show SKUs based on orders, set the first purchase order as active by default */
    const state = useState();
    const purchaseOrders = getPurchaseOrders(state);
    if (purchaseOrders && purchaseOrders.length > 0) {
      dispatch(setActivePurchaseOrder(purchaseOrders[0]));
    }
  }

  dispatch({
    type: actionTypes.SET_INVENTORY_TABLE_SHOW_ALL_SKUS,
    payload,
  });
};

/* Action to set loading status for draft order information */
export const isLoadingDraftOrderInformation = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_DRAFT_ORDER_INFORMATION,
    payload,
  };
};

/* Action to set draft order information */
export const setDraftOrderInformation = (payload: any) => {
  return {
    type: actionTypes.SET_DRAFT_ORDER_INFORMATION,
    payload,
  };
};

/* Action to set active draft order template */
export const setActiveDraftOrderTemplate = (payload: DraftOrderTemplate) => (dispatch: any) => {
  dispatch(setActivePurchaseOrder(EMPTY_PURCHASE_ORDER));
  dispatch({
    type: actionTypes.SET_ACTIVE_DRAFT_ORDER_TEMPLATE,
    payload,
  });
};

/* Action to set loading status for expected days of inventory */
export const isLoadingExpectedDaysOfInventory = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_EXPECTED_DAYS_OF_INVENTORY,
    payload,
  };
};

/* Action to set expected days of inventory table data */
export const setExpectedDaysOfInventory = (payload: any[]) => {
  return {
    type: actionTypes.SET_EXPECTED_DAYS_OF_INVENTORY,
    payload,
  };
};

/* Action to set loading for the draft templates */
export const isLoadingDraftTemplates = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_DRAFT_ORDER_TEMPLATES,
    payload,
  };
};

/* Action to set all the draft templates */
export const setDraftTemplates = (payload: DraftOrderTemplate[]) => {
  return {
    type: actionTypes.SET_DRAFT_ORDER_TEMPLATES,
    payload,
  };
};

/*********** Async Actions ************************ */
/* Action to fetch purchase orders */
export const fetchPurchaseOrders = () => async (dispatch: any) => {
  try {
    const sellerId = sellerIDSelector();
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/purchase-orders`;

    dispatch(isLoadingPurchaseOrders(true));
    const { data } = await axios.get(URL);

    if (data) {
      dispatch(setPurchaseOrders(data));
    }
  } catch (err) {
    dispatch(setPurchaseOrders([]));
    console.error('Error fetching sales estimation', err);
  }
  dispatch(setPurchaseOrdersLoadingMessage(''));
  dispatch(isLoadingPurchaseOrders(false));
};

export const generateNextOrder = (payload: AutoGeneratePurchaseOrderPayload) => async (
  dispatch: any
) => {
  try {
    success('Generating next orders...');
    const sellerId = sellerIDSelector();
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/purchase-orders/${payload.id}/generate-next-order`;

    dispatch(isLoadingPurchaseOrders(true));
    dispatch(setPurchaseOrdersLoadingMessage('Order creation in progress...'));
    const { status } = await axios.post(URL, payload);

    if (status === 201) {
      dispatch(fetchPurchaseOrders());
      dispatch(fetchInventoryTable({}));
    } else {
      dispatch(isLoadingPurchaseOrders(false));
      error('Failed to generate next orders');
    }
  } catch (err) {
    dispatch(isLoadingPurchaseOrders(false));
    error('Failed to generate next orders');
    console.error('Error fetching sales estimation', err);
  }
  dispatch(setPurchaseOrdersLoadingMessage(''));
};

/* Action to update purchase orders */
export const updatePurchaseOrder = (payload: UpdatePurchaseOrderPayload) => async (
  dispatch: any,
  getState: any
) => {
  try {
    /* Set inventory to be loading */
    dispatch(isLoadingInventoryTableResults(true));
    let requestPayload = {
      ...payload,
    };

    const state = getState();
    let newPurchaseOrders = getPurchaseOrders(state);
    if (payload.date) {
      /* Update the redux state and display the updated state first for responsiveness */
      newPurchaseOrders = newPurchaseOrders.map((order: any) => {
        if (order.id === payload.id) {
          return {
            ...order,
            date: payload.date,
          };
        }
        return order;
      });

      /* Get formatted date */
      const formattedDate = getDateOnly(new Date(payload.date));
      requestPayload = {
        ...requestPayload,
        date: formattedDate,
      };
    }

    /* Check if is not undefined */
    if (payload.is_included !== undefined) {
      newPurchaseOrders = newPurchaseOrders.map((order: any) => {
        if (order.id === payload.id) {
          return {
            ...order,
            is_included: payload.is_included,
          };
        }
        return order;
      });
    }

    if (payload.is_priority) {
      newPurchaseOrders = newPurchaseOrders.map((order: any) => {
        if (order.id === payload.id) {
          return {
            ...order,
            is_priority: payload.is_priority,
          };
        }
        return order;
      });
    }

    if (payload.status) {
      newPurchaseOrders = newPurchaseOrders.map((order: any) => {
        if (order.id === payload.id) {
          return {
            ...order,
            status: payload.status,
          };
        }
        return order;
      });
      dispatch(setPurchaseOrdersLoadingMessage('Deletion in progress'));
      dispatch(isLoadingPurchaseOrders(true));
    }
    dispatch(setPurchaseOrders(newPurchaseOrders));

    /* Update backend's purchase orders */
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/purchase-orders${
      payload.id ? `/${payload.id}` : ''
    }`;
    const { status } = await axios.patch(URL, requestPayload);
    if (status === 200) {
      dispatch(fetchInventoryTable({}));

      if (!payload.date && payload.status === 'inactive') {
        dispatch(fetchPurchaseOrders());
        success('Deleted order successfully');
      }
    } else {
      error('Failed to update purchase order.');
      dispatch(isLoadingInventoryTableResults(false));
      dispatch(setPurchaseOrders([]));
      dispatch(isLoadingPurchaseOrders(false));
      dispatch(setPurchaseOrdersLoadingMessage(''));
    }
  } catch (err) {
    dispatch(setPurchaseOrders([]));
    console.error('Error fetching sales estimation', err);
  }
  dispatch(isLoadingPurchaseOrders(false));
};

/* Fetch inventory table */
export const fetchInventoryTable = (payload: InventoryTablePayload) => async (
  dispatch: any,
  getState: any
) => {
  try {
    const { sortDir = 'asc', sort = 'id' } = payload;

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
      `${activePurchaseOrder.id !== -1 ? `&purchase_order_ids=${activePurchaseOrder.id}` : ''}` +
      `&sort=${sort}` +
      `&sort_direction=${sortDir}`;
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
        dispatch(fetchInventoryTable({}));
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

/* -------------------------------------------------- */
/* ------------------- DEPRACATED ------------------- */
/* -------------------------------------------------- */
/* Action to fetch draft order information */
export const fetchDraftOrderInformation = () => async (dispatch: any, useState: any) => {
  dispatch(isLoadingDraftOrderInformation(true));
  try {
    const state = useState();
    const activePurchaseOrder = getActivePurchaseOrder(state);
    const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/purchase-orders/${
      activePurchaseOrder.id
    }`;
    const { data } = await axios.get(url);
    dispatch(setDraftOrderInformation(data));
  } catch (err) {
    dispatch(setDraftOrderInformation({}));
  }
  dispatch(isLoadingDraftOrderInformation(false));
};

/* -------------------------------------------------- */
/* ------------------- DEPRACATED ------------------- */
/* -------------------------------------------------- */
/* Action to fetch draft order information */
export const fetchExpectedDaysOfInventory = () => async (dispatch: any, useState: any) => {
  dispatch(isLoadingExpectedDaysOfInventory(true));
  try {
    const state = useState();
    const dateRange = getDateRange(state);
    const timeSettings = getTimeSetting(state);
    const draftOrder = getDraftOrderInformation(state);
    const draftTemplate = getActiveDraftOrderTemplate(state);

    let merchantListings = [];
    if (draftOrder.merchant_listings) {
      merchantListings = draftOrder.merchant_listings;
    } else if (draftTemplate.merchant_listings) {
      merchantListings = draftTemplate.merchant_listings;
    }

    const ids = merchantListings
      .map((merchantListing: any) => {
        return merchantListing.merchant_listing_id;
      })
      .join(',');

    const resourceString =
      `?types=days_until_so_draft` +
      `&merchant_listing_ids=${ids}` +
      `&start_date=${getDateOnly(new Date(dateRange.startDate))}` +
      `&end_date=${getDateOnly(new Date(dateRange.endDate))}` +
      `&display_mode=${timeSettings === TIME_SETTING.DAY ? 'daily' : 'weekly'}`;
    const url = `${
      AppConfig.BASE_URL_API
    }sellers/${sellerIDSelector()}/order-plan${resourceString}`;
    const { data } = await axios.get(url);

    const expectedInventory = data.map((sku: any) => {
      if (sku.data.length > 0) {
        return {
          title: sku.title,
          ...sku.data[0].days_until_so_draft,
        };
      } else {
        return {
          title: sku.title,
        };
      }
    });
    dispatch(setExpectedDaysOfInventory(expectedInventory));
  } catch (err) {
    dispatch(setExpectedDaysOfInventory([]));
  }
  dispatch(isLoadingExpectedDaysOfInventory(false));
};

/* -------------------------------------------------- */
/* ------------------- DEPRACATED ------------------- */
/* -------------------------------------------------- */
/* Action to fetch draft templates */
export const fetchDraftTemplates = () => async (dispatch: any) => {
  dispatch(isLoadingDraftTemplates(true));
  try {
    const sellerId = sellerIDSelector();
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/purchase-order-templates`;
    const { data } = await axios.get(URL);
    dispatch(setDraftTemplates(data));
  } catch (err) {
    console.error('Error fetching draft templates', err);
  }
  dispatch(isLoadingDraftTemplates(false));
};
