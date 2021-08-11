import { v4 as uuid } from 'uuid';

import { actionTypes } from '../../constants/KeywordResearch/KeywordReverse';

/* Interfaces */
import { KeywordReversePaginationInfo } from '../../interfaces/KeywordResearch/KeywordReverse';

/* Action to generate or give the unique session based on open tab  */
export const makeOrGetUniqueTabID = () => {
  let value = window.sessionStorage.getItem('unique-session-tab-id');

  if (!value || !window.name) {
    value = uuid();
    window.sessionStorage.setItem('unique-session-tab-id', value);
  }

  window.name = value;
  return value;
};

/* ============== KEYWORD REQUEST ================== */

/* Action for setting fetching state for keyword request id */
export const isFetchingKeywordReverseRequestId = (payload: boolean) => {
  return {
    type: actionTypes.IS_FETCHING_KEYWORD_REVERSE_REQUEST_ID,
    payload,
  };
};

/* Action for setting  keyword request id */
export const setKeywordReverseRequestId = (payload: string) => {
  return {
    type: actionTypes.SET_KEYWORD_REVERSE_REQUEST_ID,
    payload,
  };
};

/* ============== KEYWORD REVERSE TABLE ================== */

/* Action to set loading state for keyword reverse  */
export const isLoadingKeywordReverseTable = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_KEYWORD_REVERSE_TABLE,
    payload,
  };
};

/* Action to set the keyword reverse table results */
export const setKeywordReverseTableResults = (payload: any) => {
  return {
    type: actionTypes.SET_KEYWORD_REVERSE_TABLE_RESULTS,
    payload,
  };
};

/* Action to set keyword reverse table pagination info */
export const setKeywordReverseTablePaginationInfo = (payload: KeywordReversePaginationInfo) => {
  return {
    type: actionTypes.SET_KEYWORD_REVERSE_TABLE_PAGINATION_INFO,
    payload,
  };
};

/* ========================= Async actions ======================*/
