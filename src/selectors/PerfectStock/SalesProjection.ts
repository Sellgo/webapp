import get from 'lodash/get';

/* Selector to get all results from sales projection */
export const getSalesProjectionResults = (state: any) => {
  return get(state, 'salesProjection.salesProjectionResult');
};

/* Selector to get loading state for sales projection */
export const getIsLoadingSalesProjection = (state: any) => {
  return get(state, 'salesProjection.isLoadingSalesProjection');
};

/* Selector to get sales projection update date */
export const getSalesProjectionUpdateDate = (state: any) => {
  return get(state, 'salesProjection.salesProjectionUpdateDate');
};

/* Selector to get sales projection refresh id */
export const getRefreshSalesProjectionId = (state: any) => {
  return get(state, 'salesProjection.refreshSalesProjectionId');
};

/* Selector to get status of is fetching progress for sales projection */
export const getIsFetchingProgressForRefresh = (state: any) => {
  return get(state, 'salesProjection.isFetchingProgressForRefresh');
};

/* Selector to get progress for sales projection refresh */
export const getRefreshProgress = (state: any) => {
  return get(state, 'salesProjection.refreshProgress');
};

/* Selector to get filter for sales projection */
export const getSalesProjectionFilters = (state: any) => {
  return get(state, 'salesProjection.salesProjectionFilters');
};
