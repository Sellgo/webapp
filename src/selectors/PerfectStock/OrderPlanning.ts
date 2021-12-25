import get from 'lodash/get';

/* Selector to get all results from inventory table */
export const getInventoryTableResults = (state: any) => {
  return get(state, 'orderPlanning.inventoryTableResults');
};

/* Selector to get purchase orders */
export const getPurchaseOrders = (state: any) => {
  return get(state, 'orderPlanning.purchaseOrders');
};

/* Selector to get loading state for inventory table */
export const getIsLoadingInventoryTableResults = (state: any) => {
  return get(state, 'orderPlanning.isLoadingInventoryTableResults');
};

/* Selector to get loading state for inventory table */
export const getIsLoadingPurchaseOrders = (state: any) => {
  return get(state, 'orderPlanning.isLoadingPurchaseOrders');
};

/* Selector to get date range */
export const getDateRange = (state: any) => {
  return get(state, 'orderPlanning.dateRange');
};

/* Selector to get time setting */
export const getTimeSetting = (state: any) => {
  return get(state, 'orderPlanning.timeSetting');
};

/* Selector to get active purchase order */
export const getActivePurchaseOrder = (state: any) => {
  return get(state, 'orderPlanning.activePurchaseOrder');
};
