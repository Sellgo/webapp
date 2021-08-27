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

/* ================================================================= */
/*    KEYWORD TRACKER PRODUCTS KEYWORDS MAIN TABLE (PRODUCTS)  */
/* ================================================================= */

/* Selector to find the loading state for keyword tracker product keywords table */
export const getIsLoadingTrackerProductKeywordsTable = (state: any) => {
  return get(state, 'keywordTracker.isLoadingTrackerProductKeywordsTable');
};

/* Selector to get the keyword tracker product keywords table results */
export const getTrackerProductKeywordsTableResults = (state: any) => {
  return get(state, 'keywordTracker.trackerProductKeywordsTableResults');
};

/* Selector to get the keyword tracker product keywords table results */
export const getTrackerProductKeywordsTablePaginationInfo = (state: any) => {
  return get(state, 'keywordTracker.trackerProductKeywordsTablePaginationInfo');
};
