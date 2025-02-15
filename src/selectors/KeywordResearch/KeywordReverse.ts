import get from 'lodash/get';

/* Utils */
import { makeOrGetUniqueTabID } from '../../utils/session';

/* =================== KEYWORD REQUEST ID =============== */
/* Selector to get current keyword request Id */
export const getIsFetchingKeywordReverseRequestId = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordReverse[${sessionTabId}]`);
  return get(stateChunk, 'isFetchingKeywordReverseRequestId');
};

/* Selector to get current keyword request Id */
export const getKeywordReverseRequestId = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordReverse[${sessionTabId}]`);
  return get(stateChunk, 'keywordReverseRequestId');
};

/* Selector to get current asins for keyword reverse */
export const getKeywordReverseAsinList = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordReverse[${sessionTabId}]`);
  return get(stateChunk, 'asinListForKeywordReverse');
};

/* Selector to get referenced asin index for keyword reverse */
export const getReferencedAsinIndex = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordReverse[${sessionTabId}]`);
  return get(stateChunk, 'referencedAsinId');
};

/* =================== KEYWORD REVERSE PRODUCTS  =============== */

/* Selector to get fetching state for product list*/
export const getIsLoadingKeywordReverseProductsList = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();
  const stateChunk = get(state, `keywordReverse[${sessionTabId}]`);

  return get(stateChunk, 'isLoadingKeywordReverseProductsList');
};

/* Selector to get keyword reverse products list */
export const getKeywordReverseProductsList = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();
  const stateChunk = get(state, `keywordReverse[${sessionTabId}]`);

  return get(stateChunk, 'keywordReverseProductsList');
};

/* =================== KEYWORD REVERSE PROGRESS =============== */

/* Selector to get should fetch keyword progress data */
export const getShouldFetchKeywordReverseProgress = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordReverse[${sessionTabId}]`);
  return get(stateChunk, 'shouldFetchKeywordReverseProgress');
};

/* Selector to get should fetch keyword progress data */
export const getKeywordReverseProgressData = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordReverse[${sessionTabId}]`);
  return get(stateChunk, 'keywordReverseProgressData');
};

/* =================== KEYWORD REVERSE TABLE =============== */

/* Selector to get loading state for keyword reverse table */
export const getIsLoadingKeywordReverseTable = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordReverse[${sessionTabId}]`);
  return get(stateChunk, 'isLoadingKeywordReverseTable');
};

/* Selector to get keyword reverse table results */
export const getKeywordReverseTableResults = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordReverse[${sessionTabId}]`);
  return get(stateChunk, 'keywordReverseTableResults');
};

/* Selector to get keyword reverse table pagination info */
export const getKeywordReverseTablePaginationInfo = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordReverse[${sessionTabId}]`);
  return get(stateChunk, 'keywordReverseTablePaginationInfo');
};

/* =================== KEYWORD DATABASE SUMMARY =============== */

/* Selector to get loading state for word freq summary */
export const getIsLoadingKeywordReverseWordFreqSummary = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordReverse[${sessionTabId}]`);
  return get(stateChunk, 'isLoadingKeywordReverseWordFreqSummary');
};

/* Selector to get word freq summary */
export const getKeywordReverseWordFreqSummary = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordReverse[${sessionTabId}]`);
  return get(stateChunk, 'keywordReverseWordFreqSummary');
};

/* Selector to get loading state for word freq summary */
export const getIsLoadingKeywordReverseAggSummary = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordReverse[${sessionTabId}]`);
  return get(stateChunk, 'isLoadingKeywordReverseAggSummary');
};

/* Selector to get word freq summary */
export const getKeywordReverseAggSummary = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordReverse[${sessionTabId}]`);
  return get(stateChunk, 'keywordReverseAggSummary');
};
