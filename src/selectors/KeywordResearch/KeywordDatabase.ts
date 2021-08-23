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
export const getkeywordDatabaseRequestId = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordDatabase[${sessionTabId}]`);
  return get(stateChunk, 'keywordDatabaseRequestId');
};

/* Selector to get current asins for keyword database */
export const getkeywordDatabaseKeywordList = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordDatabase[${sessionTabId}]`);
  return get(stateChunk, 'keywordsListForKeywordDatabase');
};

/* =================== KEYWORD DATABASE PROGRESS =============== */

/* Selector to get should fetch keyword database request id progress data */
export const getShouldFetchkeywordDatabaseProgress = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordDatabase[${sessionTabId}]`);
  return get(stateChunk, 'shouldFetchkeywordDatabaseProgress');
};

/* Selector to get should fetch keyword progress data */
export const getkeywordDatabaseProgressData = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordDatabase[${sessionTabId}]`);
  return get(stateChunk, 'keywordDatabaseProgressData');
};

/* =================== KEYWORD DATABASE TABLE =============== */

/* Selector to get loading state for keyword database table */
export const getIsLoadingkeywordDatabaseTable = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordDatabase[${sessionTabId}]`);
  return get(stateChunk, 'isLoadingkeywordDatabaseTable');
};

/* Selector to get keyword database table results */
export const getkeywordDatabaseTableResults = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordDatabase[${sessionTabId}]`);
  return get(stateChunk, 'keywordDatabaseTableResults');
};

/* Selector to get keyword database table pagination info */
export const getkeywordDatabaseTablePaginationInfo = (state: any) => {
  const sessionTabId = makeOrGetUniqueTabID();

  const stateChunk = get(state, `keywordDatabase[${sessionTabId}]`);
  return get(stateChunk, 'keywordDatabaseTablePaginationInfo');
};
