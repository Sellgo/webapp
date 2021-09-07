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

/* Selector to get the keyword tracker products  table pagination info */
export const getKeywordTrackerProductsTablePaginationInfo = (state: any) => {
  return get(state, 'keywordTracker.keywordTrackerProductsTablePaginationInfo');
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

/* ================================================================= */
/*                        KEYWORDS HISTORY                            */
/* ================================================================= */

/* Selector to get loading state for tracker product keywords history */
export const getIsLoadingTrackerProductKeywordsHistory = (state: any) => {
  return get(state, 'keywordTracker.isLoadingTrackerProductKeywordsHistory');
};

/* Selector to get state for tracker product keywords history data results */
export const getTrackerProductKeywordsHistoryResult = (state: any) => {
  return get(state, 'keywordTracker.trackerProductKeywordsHistoryResult');
};

/* Selector to check if the keyword export progress API should be hit again */
export const shouldFetchTrackerProductKeywordsHistoryExportProgress = (state: any) => {
  return get(state, 'keywordTracker.shouldFetchTrackerProductKeywordsHistoryExportProgress');
};

/* Selector to get the tracker product keyword histry progress data */
export const getTrackerProductKeywordsHistoryExportProgress = (state: any) => {
  return get(state, 'keywordTracker.trackerProductKeywordsHistoryExportProgress');
};
