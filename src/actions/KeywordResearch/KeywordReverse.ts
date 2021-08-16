import axios from 'axios';

import { AppConfig } from '../../config';

import {
  actionTypes,
  FILTER_QUERY_KEY_MAPPER,
  F_TYPES,
} from '../../constants/KeywordResearch/KeywordReverse';

/* Interfaces */
import {
  KeywordReversePaginationInfo,
  KeywordReverseTablePayload,
} from '../../interfaces/KeywordResearch/KeywordReverse';

/* Selectors */
import { getKeywordReverseRequestId } from '../../selectors/KeywordResearch/KeywordReverse';

/* Selectors */
import { sellerIDSelector } from '../../selectors/Seller';
import { error, success } from '../../utils/notifications';
import { timeout } from '../../utils/timeout';

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

/* Action to set asin list for keyword reverse */
export const setAsinListForKeywordReverse = (payload: string) => {
  return {
    type: actionTypes.SET_ASIN_LIST_FOR_KEYWORD_REVERSE,
    payload,
  };
};

/* ============== KEYWORD REQUEST ================== */

/* Action to set if progress needs to be called */
export const shouldFetchKeywordReverseProgress = (payload: boolean) => {
  return {
    type: actionTypes.SHOULD_FETCH_KEYWORD_REVERSE_PROGRESS,
    payload,
  };
};

export const setKeywordReverseProgressData = (payload: any) => {
  return {
    type: actionTypes.SET_KEYWORD_REVERSE_PROGRESS_DATA,
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

/* ======================== Session Storage =================== */

export const storeKeywordReverseFilters = (keywordReverseFilters: any) => {
  sessionStorage.setItem('keywordReverseFilters', JSON.stringify(keywordReverseFilters));
};

/* Remove filter from local storage */
export const removeKeywordReverseFilters = () => {
  sessionStorage.removeItem('keywordReverseFilters');
};

/* Extract and parse filter from local storage */
export const extractKeywordReverseFilters = () => {
  const storedFilters = JSON.parse(sessionStorage.getItem('keywordReverseFilters') || '{}');
  return storedFilters;
};

/* =============== Filter Parsing====================== */

/* Action to parse the  keyword reverse filters */
export const parseFilters = (keywordReverseFilter: any) => {
  const filterPayloadKeys = Object.keys(keywordReverseFilter);

  let filterQuery = '';

  filterPayloadKeys.forEach((key: string) => {
    const filter = keywordReverseFilter[key];

    const { keyName, type } = FILTER_QUERY_KEY_MAPPER[key];

    // basic text type
    if (type === F_TYPES.TEXT) {
      if (filter) {
        filterQuery += `&${keyName}=${filter}`;
      }
    }

    // include exclude
    if (type === F_TYPES.INPUT_INCLUDE_EXCLUDE) {
      const includes = filter.include ? `&include_${keyName}=${filter.include}` : '';
      const excludes = filter.exclude ? `&exclude_${keyName}=${filter.exclude}` : '';
      filterQuery += `${includes}${excludes}`;
    }

    // simple min max
    if (type === F_TYPES.MIN_MAX) {
      const min = filter.min ? `&${keyName}_min=${filter.min}` : '';
      const max = filter.max ? `&${keyName}_max=${filter.max}` : '';
      filterQuery += `${min}${max}`;
    }

    // min max with period
    if (type === F_TYPES.MIN_MAX_PERIOD) {
      if (filter.period) {
        const min = filter.min ? `&${keyName}_${filter.period}_min=${filter.min}` : '';
        const max = filter.max ? `&${keyName}_${filter.period}_max=${filter.max}` : '';

        filterQuery += `${min}${max}`;
      }
    }
  });

  return filterQuery;
};

/* ========================= Async actions ======================*/

/* ============== KEYWORD PROGRESS ================== */

export const fetchKeywordReverseProgress = () => async (dispatch: any, getState: any) => {
  try {
    const sellerID = sellerIDSelector();

    const keywordRequestId = getKeywordReverseRequestId(getState());

    if (!keywordRequestId) {
      console.log('No request Id returning');
      return;
    }

    const resourcePath = `keywords/progress?keyword_request_id=${keywordRequestId}`;
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerID}/${resourcePath}`;

    const { data } = await axios.get(URL);

    const isFailedStatus = data.status === 'failed';
    const isCompleted = data.status === 'completed';

    if (isFailedStatus) {
      dispatch(shouldFetchKeywordReverseProgress(false));
      dispatch(setKeywordReverseProgressData(data));
      error('Progress fetching has failed');
      return;
    }

    if (!isFailedStatus) {
      dispatch(setKeywordReverseProgressData(data));

      if (!isCompleted) {
        console.log('Still in pending state');
        dispatch(shouldFetchKeywordReverseProgress(true));
        return;
      }

      if (isCompleted) {
        console.log('Progress is completed');
        dispatch(shouldFetchKeywordReverseProgress(false));
        return;
      }
    }
  } catch (err) {
    console.error('Error fetching keyword progress');
  }
};

/* Action to fetch keyword reverse request id using asins */
export const fetchKeywordReverseRequestId = (asinList: string) => async (dispatch: any) => {
  try {
    const sellerID = sellerIDSelector();

    const payload = {
      asins: asinList,
    };

    const { data } = await axios.post(
      `${AppConfig.BASE_URL_API}sellers/${sellerID}/keywords/request`,
      payload
    );

    dispatch(isFetchingKeywordReverseRequestId(true));

    if (data) {
      const { keyword_request_id: keywordRequestId } = data;
      // set keyword request id
      dispatch(setKeywordReverseRequestId(keywordRequestId));
      // set the asin list for future use
      dispatch(setAsinListForKeywordReverse(asinList));
      dispatch(isFetchingKeywordReverseRequestId(false));

      // wait to 2 seconds
      await timeout(2000);
      success('Fetching of the progress has started');
      // dispatch the keyword request progress process
      dispatch(shouldFetchKeywordReverseProgress(true));
    } else {
      dispatch(setKeywordReverseRequestId(''));
      dispatch(setAsinListForKeywordReverse(asinList));
      dispatch(isFetchingKeywordReverseRequestId(false));
      dispatch(shouldFetchKeywordReverseProgress(false));
    }
  } catch (err) {
    console.log('Error fetching the keyword request Id', err.response);
    dispatch(setKeywordReverseRequestId(''));
    dispatch(isFetchingKeywordReverseRequestId(false));
  }
};

/* Action to fetch the keyword reverse table information */
export const fetchKeywordReverseTableInformation = (payload: KeywordReverseTablePayload) => async (
  dispatch: any,
  getState: any
) => {
  // const sellerID = sellerIDSelector();

  try {
    const {
      resetFilter = false,
      enableLoader = true,
      page = 1,
      per_page = 20,
      sort = 'id',
      sortDir = 'asc',
      filterPayload,
    } = payload;

    const sellerID = sellerIDSelector();

    // reset the filter
    if (resetFilter) {
      removeKeywordReverseFilters();
      dispatch(isLoadingKeywordReverseTable(false));
      dispatch(setKeywordReverseTableResults([]));
      dispatch(
        setKeywordReverseTablePaginationInfo({
          total_pages: 0,
          current_page: 0,
          count: 0,
          per_page: 20,
        })
      );

      return;
    }

    let filterPayloadData: any;

    if (!filterPayload) {
      filterPayloadData = extractKeywordReverseFilters();
    } else {
      storeKeywordReverseFilters(filterPayload);
      filterPayloadData = filterPayload;
    }

    let filtersQueryString: string = parseFilters(filterPayloadData);

    if (!filtersQueryString) {
      filtersQueryString = parseFilters(extractKeywordReverseFilters());
    }

    const pagination = `page=${page}`;
    const sortDirection = `sort_direction=${sortDir}`;
    const sortingValue = `sort=${sort}`;
    const perPage = `per_page=${per_page}`;

    const keywordRequestId = `keyword_request_id=${getKeywordReverseRequestId(getState())}`;

    // full resource path
    const resourcePath = `?${pagination}&${perPage}&${sortingValue}&${sortDirection}${filtersQueryString}`;

    dispatch(isLoadingKeywordReverseTable(enableLoader));

    const { data } = await axios.get(
      `${AppConfig.BASE_URL_API}sellers/${sellerID}/keywords${resourcePath}&${keywordRequestId}`
    );

    const { results, ...paginationInfo } = data;

    if (data) {
      dispatch(setKeywordReverseTableResults(results));
      dispatch(setKeywordReverseTablePaginationInfo(paginationInfo));
      dispatch(isLoadingKeywordReverseTable(false));
    }
  } catch (err) {
    console.error('Error fetching keyword reverse table', err.response);

    dispatch(setKeywordReverseTableResults([]));
    dispatch(
      setKeywordReverseTablePaginationInfo({
        count: 0,
        current_page: 0,
        total_pages: 0,
        per_page: 0,
      })
    );
    dispatch(isLoadingKeywordReverseTable(false));
  }
};
