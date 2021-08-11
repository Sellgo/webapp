import get from 'lodash/get';

/* Actions */
import { makeOrGetUniqueTabID } from '../../constants/KeywordResearch/KeywordReverse';

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
