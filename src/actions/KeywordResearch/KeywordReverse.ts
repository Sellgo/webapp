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
  KeywordReverseProgressData,
  KeywordReverseAsinProduct,
  KeywordReverseProductListPayload,
  KeywordReverseWordFreqSummary,
  KeywordReverseAggSummary,
} from '../../interfaces/KeywordResearch/KeywordReverse';

/* Selectors */
import {
  getKeywordReverseProductsList,
  getKeywordReverseRequestId,
} from '../../selectors/KeywordResearch/KeywordReverse';
import { sellerIDSelector } from '../../selectors/Seller';

/* Utils */
import { error, success } from '../../utils/notifications';
import { timeout } from '../../utils/timeout';

/* ============== KEYWORD  REVERSE REQUEST ================== */

/* Action for setting fetching state for keyword request id */
export const isFetchingKeywordReverseRequestId = (payload: boolean) => {
  return {
    type: actionTypes.IS_FETCHING_KEYWORD_REVERSE_REQUEST_ID,
    payload,
  };
};

/* Action for setting  keyword request id */
export const setKeywordReverseRequestId = (payload: string) => {
  sessionStorage.setItem('keywordReverseRequestId', payload);
  return {
    type: actionTypes.SET_KEYWORD_REVERSE_REQUEST_ID,
    payload,
  };
};

/* Action to set asin list for keyword reverse */
export const setAsinListForKeywordReverse = (payload: string) => {
  sessionStorage.setItem('keywordReverseAsinList', payload);
  return {
    type: actionTypes.SET_ASIN_LIST_FOR_KEYWORD_REVERSE,
    payload,
  };
};

/* Action to set referenced index for keyword reverse */
export const setReferencedAsinIndex = (payload: number) => {
  sessionStorage.setItem('referencedAsinId', payload.toString());
  return {
    type: actionTypes.SET_REFERENCED_ASIN_ID,
    payload,
  };
};

/* ============== KEYWORD REVERSE PRODUCTS LIST ================== */

/* Action to set loading state for keyword reverse asin products */
export const isLoadingKeywordReverseProductsList = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_KEYWORD_REVERSE_PRODUCTS_LIST,
    payload,
  };
};

/* Action to set keyword reverse products list */
export const setKeywordReverseProductsList = (payload: KeywordReverseAsinProduct[]) => {
  return {
    type: actionTypes.SET_KEYWORD_REVERSE_PRODUCTS_LIST,
    payload,
  };
};

/* ============== KEYWORD REVERSE PROGRESS ================== */

/* Action to set if progress needs to be called */
export const shouldFetchKeywordReverseProgress = (payload: boolean) => {
  return {
    type: actionTypes.SHOULD_FETCH_KEYWORD_REVERSE_PROGRESS,
    payload,
  };
};

/* Action to set the progress data for keyword reverse */
export const setKeywordReverseProgressData = (payload: KeywordReverseProgressData) => {
  sessionStorage.setItem('keywordReverseProgressData', JSON.stringify(payload));
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

/* ============== KEYWORD REVERSE TABLE SUMMARY ================== */

/* Action to set loading state for keyword database word freq summary */
export const isLoadingKeywordReverseWordFreqSummary = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_KEYWORD_REVERSE_WORD_FREQ_SUMMARY,
    payload,
  };
};

/* Action to set  for keyword database word freq summary */
export const setKeywordReverseWordFreqSummary = (payload: KeywordReverseWordFreqSummary[]) => {
  sessionStorage.setItem('keywordReverseWordFreqSummary', JSON.stringify(payload));
  return {
    type: actionTypes.SET_KEYWORD_REVERSE_WORD_FREQ_SUMMARY,
    payload,
  };
};

/* Action to set loading state for keyword database aggregation  summary */
export const isLoadingKeywordReverseAggSummary = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_KEYWORD_REVERSE_AGG_SUMMARY,
    payload,
  };
};

/* Action to set  keyword database aggregation summary */
export const setKeywordReverseAggSummary = (payload: KeywordReverseAggSummary) => {
  sessionStorage.setItem('keywordReverseAggSummary', JSON.stringify(payload));

  return {
    type: actionTypes.SET_KEYWORD_REVERSE_AGG_SUMMARY,
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
  });

  return filterQuery;
};

/* ========================= Async actions ======================*/

/* ============== KEYWORD PROGRESS ================== */

/* Action to fetch keyword reverse request id using asins */
export const fetchKeywordReverseRequestId = (asinList: string) => async (
  dispatch: any,
  getState: any
) => {
  try {
    dispatch(isFetchingKeywordReverseRequestId(true));
    const sellerID = sellerIDSelector();

    const payload = {
      asins: asinList,
    };

    const currentProductList = getKeywordReverseProductsList(getState());

    const currentAsinList =
      currentProductList &&
      currentProductList
        .map((a: any) => {
          return a.asin;
        })
        .join(',');

    if (currentAsinList === asinList) {
      dispatch(isFetchingKeywordReverseRequestId(false));
      return;
    }

    const { data } = await axios.post(
      `${AppConfig.BASE_URL_API}sellers/${sellerID}/keywords/request`,
      payload
    );

    if (data) {
      const { keyword_request_id: keywordRequestId } = data;
      // set keyword request id
      dispatch(setKeywordReverseRequestId(keywordRequestId));
      // set the asin list for future use
      dispatch(setAsinListForKeywordReverse(asinList));

      // wait to 0.5 seconds
      await timeout(500);
      success('Fetching keywords');
      // dispatch the keyword request progress process
      dispatch(
        setKeywordReverseProgressData({
          seller: 0,
          status: '',
          progress: '',
          id: 0,
          report_xlsx_url: '',
        })
      );
      dispatch(isFetchingKeywordReverseRequestId(false));
      dispatch(shouldFetchKeywordReverseProgress(true));
    } else {
      dispatch(setKeywordReverseRequestId(''));
      dispatch(setAsinListForKeywordReverse(asinList));
      dispatch(isFetchingKeywordReverseRequestId(false));
      dispatch(shouldFetchKeywordReverseProgress(false));
    }
  } catch (err) {
    console.log('Error fetching the keyword request Id', err);
    dispatch(setKeywordReverseRequestId(''));
    dispatch(isFetchingKeywordReverseRequestId(false));
  }
};

export const fetchKeywordReverseProgress = () => async (dispatch: any, getState: any) => {
  try {
    const sellerID = sellerIDSelector();

    const keywordRequestId = getKeywordReverseRequestId(getState());

    if (!keywordRequestId) {
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
      error('Error: Failed on progress');
      return;
    }

    if (!isFailedStatus) {
      dispatch(setKeywordReverseProgressData(data));
      // if not completed should fetch again else not
      dispatch(shouldFetchKeywordReverseProgress(!isCompleted));

      if (isCompleted) {
        dispatch(fetchKeywordReverseProductsList({ enableLoader: true }));
        dispatch(fetchKeywordReverseTableInformation({ enableLoader: true }));
        dispatch(fetchKeywordReverseWordFreqSummary('desc'));
        dispatch(fetchKeywordReverseAggSummary());
      }
    }
  } catch (err) {
    console.error('Error fetching keyword progress');
    dispatch(shouldFetchKeywordReverseProgress(false));
    dispatch(
      setKeywordReverseProgressData({
        status: 'failed',
        progress: '',
        id: 0,
        seller: 0,
        report_xlsx_url: '',
      })
    );
  }
};

/* Action to fetch keyword reverse prodyct list */
export const fetchKeywordReverseProductsList = (
  payload: KeywordReverseProductListPayload
) => async (dispatch: any, getState: any) => {
  const sellerId = sellerIDSelector();

  const { enableLoader = true, resetProducts = false } = payload;

  try {
    const keywordRequestId = getKeywordReverseRequestId(getState());

    if (!keywordRequestId || resetProducts) {
      dispatch(isLoadingKeywordReverseProductsList(false));
      dispatch(setKeywordReverseProductsList([]));
      return;
    }

    const resourcePath = `keyword_request_id=${keywordRequestId}`;

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/keywords/products?${resourcePath}`;

    dispatch(isLoadingKeywordReverseProductsList(enableLoader));

    const { data } = await axios.get(URL);

    if (data) {
      // sort the posotion in ascending order
      const sortedByPosition = data.sort((a: any, b: any) => a.position - b.position);

      dispatch(setKeywordReverseProductsList(sortedByPosition));
      dispatch(isLoadingKeywordReverseProductsList(false));
    } else {
      dispatch(setKeywordReverseProductsList([]));
      dispatch(isLoadingKeywordReverseProductsList(false));
    }
  } catch (err) {
    console.error('Error fetching keyword reverse products list', err);
    dispatch(setKeywordReverseProductsList([]));
    dispatch(isLoadingKeywordReverseProductsList(false));
  }
};

/* Action to fetch keyword reverse word freq summary */
export const fetchKeywordReverseWordFreqSummary = (sortDir: 'asc' | 'desc' = 'desc') => async (
  dispatch: any,
  getState: any
) => {
  const sellerId = sellerIDSelector();

  try {
    const keywordRequestId = getKeywordReverseRequestId(getState());
    if (!keywordRequestId) {
      return;
    }

    const sorting = `sort_direction=${sortDir}`;

    const resourcePath = `keyword_request_id=${keywordRequestId}&${sorting}`;

    dispatch(isLoadingKeywordReverseWordFreqSummary(true));

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/keywords/word-freq?${resourcePath}`;

    const { data } = await axios.get(URL);
    if (data) {
      dispatch(setKeywordReverseWordFreqSummary(data));
      dispatch(isLoadingKeywordReverseWordFreqSummary(false));
    } else {
      dispatch(setKeywordReverseWordFreqSummary([]));
      dispatch(isLoadingKeywordReverseWordFreqSummary(false));
    }
  } catch (err) {
    console.error('Error fetching keyword database word freq summary', err);
    dispatch(setKeywordReverseWordFreqSummary([]));
    dispatch(isLoadingKeywordReverseWordFreqSummary(false));
  }
};

/* Action to fetch keyword ditribution/aggregation on keyword reverse */
export const fetchKeywordReverseAggSummary = () => async (dispatch: any, getState: any) => {
  const sellerId = sellerIDSelector();

  try {
    const keywordRequestId = getKeywordReverseRequestId(getState());

    if (!keywordRequestId) {
      return;
    }

    const resourcePath = `keyword_request_id=${keywordRequestId}`;

    dispatch(isLoadingKeywordReverseAggSummary(true));

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/keywords/aggregation?${resourcePath}`;

    const { data } = await axios.get(URL);

    if (data) {
      dispatch(setKeywordReverseAggSummary(data));
      dispatch(isLoadingKeywordReverseAggSummary(false));
    } else {
      dispatch(
        setKeywordReverseAggSummary({
          total_keywords: 0,
          total_search_volume: 0,
          min_search_volume: 0,
          avg_search_volume: 0,
          max_search_volume: 0,
          min_competing_products: 0,
          avg_competing_products: 0,
          max_competing_products: 0,
          min_sponsored_asins: 0,
          avg_sponsored_asins: 0,
          max_sponsored_asins: 0,
        })
      );
      dispatch(isLoadingKeywordReverseAggSummary(false));
    }
  } catch (err) {
    console.error('Error fetching keyword reverse aggregation summary', err);
    dispatch(
      setKeywordReverseAggSummary({
        total_keywords: 0,
        total_search_volume: 0,
        min_search_volume: 0,
        avg_search_volume: 0,
        max_search_volume: 0,
        min_competing_products: 0,
        avg_competing_products: 0,
        max_competing_products: 0,
        min_sponsored_asins: 0,
        avg_sponsored_asins: 0,
        max_sponsored_asins: 0,
      })
    );
    dispatch(isLoadingKeywordReverseAggSummary(false));
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

    const keywordRequestId = getKeywordReverseRequestId(getState());

    // if no keyword ID return
    if (!keywordRequestId) {
      return;
    }

    const keywordRequestIdQuery = `keyword_request_id=${keywordRequestId}`;

    // full resource path
    const resourcePath = `?${pagination}&${perPage}&${sortingValue}&${sortDirection}${filtersQueryString}`;

    dispatch(isLoadingKeywordReverseTable(enableLoader));

    const { data } = await axios.get(
      `${AppConfig.BASE_URL_API}sellers/${sellerID}/keywords${resourcePath}&${keywordRequestIdQuery}`
    );

    const { results, ...paginationInfo } = data;

    if (data) {
      dispatch(setKeywordReverseTableResults(results));
      dispatch(setKeywordReverseTablePaginationInfo(paginationInfo));
      dispatch(isLoadingKeywordReverseTable(false));
    }
  } catch (err) {
    console.error('Error fetching keyword reverse table', err);

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

/* Action to reset keyword database */
export const resetKeywordReverse = () => async (dispatch: any) => {
  dispatch(isFetchingKeywordReverseRequestId(false));
  dispatch(shouldFetchKeywordReverseProgress(false));
  dispatch(
    setKeywordReverseProgressData({
      id: 0,
      seller: 0,
      status: '',
      progress: '',
      report_xlsx_url: '',
    })
  );
  dispatch(fetchKeywordReverseTableInformation({ resetFilter: true }));
};
