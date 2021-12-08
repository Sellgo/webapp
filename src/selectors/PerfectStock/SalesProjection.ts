import get from 'lodash/get';

/* Selector to get all results from sales projection */
export const getSalesProjectionResults = (state: any) => {
  return get(state, 'salesProjection.salesProjectionResult');
};

/* Selector to get loading state for sales projection */
export const getIsLoadingSalesProjection = (state: any) => {
  return get(state, 'salesProjection.isLoadingSalesProjection');
};
