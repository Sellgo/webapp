import get from 'lodash/get';

/* Selector to get all results from inventory table */
export const getInventoryTableResults = (state: any) => {
  return get(state, 'orderPlanning.inventoryTableResults');
};

/* Selector to get boolean to show all SKUs or show SKUs from order only */
export const getInventoryTableShowAllSkus = (state: any) => {
  return get(state, 'orderPlanning.inventoryTableShowAllSkus');
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

/* Selector to get draft order information */
export const getDraftOrderInformation = (state: any) => {
  return get(state, 'orderPlanning.draftOrderInformation');
};

/* Selector to get inventory table update date */
export const getInventoryTableUpdateDate = (state: any) => {
  return get(state, 'orderPlanning.inventoryTableUpdateDate');
};

/* Selector to get inventory table refresh id */
export const getRefreshInventoryTableId = (state: any) => {
  return get(state, 'orderPlanning.refreshInventoryTableId');
};

/* Selector to get status of is fetching progress for sales projection */
export const getIsFetchingProgressForRefresh = (state: any) => {
  return get(state, 'orderPlanning.isFetchingProgressForRefresh');
};

/* Selector to get progress for sales projection refresh */
export const getRefreshProgress = (state: any) => {
  return get(state, 'orderPlanning.refreshProgress');
};

/* Selector to get expected days of inventory */
export const getExpectedDaysOfInventory = (state: any) => {
  return get(state, 'orderPlanning.expectedDaysOfInventory');
};

/* Selector to get loading status of expected days of inventory */
export const getIsLoadingExpectedDaysOfInventory = (state: any) => {
  return get(state, 'orderPlanning.isLoadingExpectedDaysOfInventory');
};

/* Selector to get active draft order template */
export const getActiveDraftOrderTemplate = (state: any) => {
  return get(state, 'orderPlanning.activeDraftOrderTemplate');
};
