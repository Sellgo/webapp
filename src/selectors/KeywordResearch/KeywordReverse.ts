import get from 'lodash/get';

/* Actions */
import { makeOrGetUniqueTabID } from '../../actions/KeywordResearch/KeywordReverse';

const sessionTabId = makeOrGetUniqueTabID();

/* =================== KEYWORD REQUEST ID =============== */
/* Selector to get current keyword request Id */
export const getIsFetchingKeywordReverseRequestId = (state: any) => {
  const stateChunk = get(state, `keywordReverse[${sessionTabId}]`);
  return get(stateChunk, 'isFetchingKeywordReverseRequestId');
};

/* Selector to get current keyword request Id */
export const getKeywordReverseRequestId = (state: any) => {
  const stateChunk = get(state, `keywordReverse[${sessionTabId}]`);
  return get(stateChunk, 'keywordReverseRequestId');
};

/* =================== KEYWORD REVERSE TABLE =============== */
/* Selector to get loading state for keyword reverse table */
export const getIsLoadingKeywordReverseTable = (state: any) => {
  const stateChunk = get(state, `keywordReverse[${sessionTabId}]`);
  return get(stateChunk, 'getisLoadingKeywordReverseTable');
};

/* Selector to get keyword reverse table results */
export const getKeywordReverseTableResults = (state: any) => {
  const stateChunk = get(state, `keywordReverse[${sessionTabId}]`);
  return get(stateChunk, 'keywordReverseTableResults');
};

/* Selector to get keyword reverse table pagination info */
export const getKeywordReverseTablePaginationInfo = (state: any) => {
  const stateChunk = get(state, `keywordReverse[${sessionTabId}]`);
  return get(stateChunk, 'keywordReverseTablePaginationInfo');
};
