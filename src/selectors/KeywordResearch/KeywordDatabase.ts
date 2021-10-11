import get from 'lodash/get';

/* Utils */
import { makeOrGetUniqueTabID } from '../../utils/session';

/* =================== KEYWORD DATABASE REQUEST ID =============== */
/* Selector to get current keyword request Id */
export const getIsFetchingkeywordDatabaseRequestId = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordDatabase[${sessionTabId}]`);
  return get(stateChunk, 'isFetchingKeywordDatabaseRequestId');
};

/* Selector to get current keyword request Id */
export const getKeywordDatabaseRequestId = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordDatabase[${sessionTabId}]`);
  return get(stateChunk, 'keywordDatabaseRequestId');
};

/* Selector to get current asins for keyword database */
export const getKeywordDatabaseKeywordList = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordDatabase[${sessionTabId}]`);
  return get(stateChunk, 'keywordsListForKeywordDatabase');
};

/* =================== KEYWORD DATABASE PROGRESS =============== */

/* Selector to get should fetch keyword database request id progress data */
export const getShouldFetchkeywordDatabaseProgress = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordDatabase[${sessionTabId}]`);
  return get(stateChunk, 'shouldFetchKeywordDatabaseProgress');
};

/* Selector to get should fetch keyword progress data */
export const getKeywordDatabaseProgressData = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordDatabase[${sessionTabId}]`);
  return get(stateChunk, 'keywordDatabaseProgressData');
};

/* =================== KEYWORD DATABASE SUMMARY =============== */

/* Selector to get loading state for word freq summary */
export const getIsLoadingKeywordDatabaseWordFreqSummary = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordDatabase[${sessionTabId}]`);
  return get(stateChunk, 'isLoadingKeywordDatabaseWordFreqSummary');
};

/* Selector to get word freq summary */
export const getKeywordDatabaseWordFreqSummary = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordDatabase[${sessionTabId}]`);
  return get(stateChunk, 'keywordDatabaseWordFreqSummary');
};

/* Selector to get loading state for word freq summary */
export const getIsLoadingKeywordDatabaseAggSummary = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordDatabase[${sessionTabId}]`);
  return get(stateChunk, 'isLoadingKeywordDatabaseAggSummary');
};

/* Selector to get word freq summary */
export const getKeywordDatabaseAggSummary = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordDatabase[${sessionTabId}]`);
  return get(stateChunk, 'keywordDatabaseAggSummary');
};

/* =================== KEYWORD DATABASE TABLE =============== */

/* Selector to get loading state for keyword database table */
export const getIsLoadingkeywordDatabaseTable = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordDatabase[${sessionTabId}]`);
  return get(stateChunk, 'isLoadingKeywordDatabaseTable');
};

/* Selector to get keyword database table results */
export const getKeywordDatabaseTableResults = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordDatabase[${sessionTabId}]`);
  return get(stateChunk, 'keywordDatabaseTableResults');
};

/* Selector to get keyword database table pagination info */
export const getKeywordDatabaseTablePaginationInfo = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordDatabase[${sessionTabId}]`);
  return get(stateChunk, 'keywordDatabaseTablePaginationInfo');
};
