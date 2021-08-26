import get from 'lodash/get';

/* ================================================= */
/*    KEYWORD TRACK MAIN TABLE (PRODUCTS)  */
/* ================================================= */

/* Selector to find the loading state for keyword tracker products table*/
export const getIsLoadingKeywordTrackerProductsTable = (state: any) => {
  return get(state, 'keywordTracker.isLoadingKeywordTrackerProductsTable');
};

/* Selector to get the keyword tracker products table results */
export const getKeywordTrackerProductsTableResults = (state: any) => {
  return get(state, 'keywordTracker.keywordTrackerProductsTableResults');
};
