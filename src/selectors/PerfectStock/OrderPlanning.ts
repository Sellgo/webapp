import get from 'lodash/get';

/* Selector to get all results from inventory table */
export const getInventoryTableResults = (state: any) => {
  return get(state, 'orderPlanning.inventoryTableResults');
};

/* Selector to get loading state for inventory table */
export const getIsLoadingInventoryTableResults = (state: any) => {
  return get(state, 'orderPlanning.isLoadingInventoryTableResults');
};

/* Selector to get date range */
export const getDateRange = (state: any) => {
  return get(state, 'orderPlanning.dateRange');
};
