import axios from 'axios';

import { AppConfig } from '../../config';

import {
  actionTypes,
  FILTER_QUERY_KEY_MAPPER,
  F_TYPES,
} from '../../constants/KeywordResearch/KeywordDatabase';

/* Interfaces */
import {
  KeywordDatabasePaginationInfo,
  KeywordDatabaseTablePayload,
  KeywordDatabaseProgressData,
  KeywordDatabaseWordFreqSummary,
  KeywordDatabaseAggSummary,
} from '../../interfaces/KeywordResearch/KeywordDatabase';

/* Selectors */
import { getKeywordDatabaseRequestId } from '../../selectors/KeywordResearch/KeywordDatabase';
import { sellerIDSelector } from '../../selectors/Seller';

/* Utils */
import { error, success } from '../../utils/notifications';
import { timeout } from '../../utils/timeout';

/* ============== KEYWORD DATABASE REQUEST ================== */

/* Action for setting fetching state for keyword request id */
export const isFetchingKeywordDatabaseRequestId = (payload: boolean) => {
  return {
    type: actionTypes.IS_FETCHING_KEYWORD_DATABASE_REQUEST_ID,
    payload,
  };
};

/* Action for setting  keyword request id */
export const setKeywordDatabaseRequestId = (payload: string) => {
  sessionStorage.setItem('keywordDatabaseRequestId', payload);
  return {
    type: actionTypes.SET_KEYWORD_DATABASE_REQUEST_ID,
    payload,
  };
};

/* Action to set asin list for keyword database */
export const setKeywordListForKeywordDatabase = (payload: string) => {
  sessionStorage.setItem('keywordDatabaseKeywordList', payload);
  return {
    type: actionTypes.SET_KEYWORDS_LIST_FOR_KEYWORD_DATABASE,
    payload,
  };
};

/* ============== KEYWORD DATABASE PROGRESS ================== */

/* Action to set if progress needs to be called */
export const shouldFetchKeywordDatabaseProgress = (payload: boolean) => {
  return {
    type: actionTypes.SHOULD_FETCH_KEYWORD_DATABASE_PROGRESS,
    payload,
  };
};

/* Action to set the progress data for keyword database */
export const setKeywordDatabaseProgressData = (payload: KeywordDatabaseProgressData) => {
  sessionStorage.setItem('keywordDatabaseProgressData', JSON.stringify(payload));
  return {
    type: actionTypes.SET_KEYWORD_DATABASE_PROGRESS_DATA,
    payload,
  };
};

/* ============== KEYWORD REVERSE TABLE SUMMARY ================== */

/* Action to set loading state for keyword database word freq summary */
export const isLoadingKeywordDatabaseWordFreqSummary = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_KEYWORD_DATABASE_WORD_FREQ_SUMMARY,
    payload,
  };
};

/* Action to set  for keyword database word freq summary */
export const setKeywordDatabaseWordFreqSummary = (payload: KeywordDatabaseWordFreqSummary[]) => {
  sessionStorage.setItem('keywordDatabaseWordFreqSummary', JSON.stringify(payload));

  return {
    type: actionTypes.SET_KEYWORD_DATABASE_WORD_FREQ_SUMMARY,
    payload,
  };
};

/* Action to set loading state for keyword database aggregation  summary */
export const isLoadingKeywordDatabaseAggSummary = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_KEYWORD_DATABASE_AGG_SUMMARY,
    payload,
  };
};

/* Action to set  keyword database aggregation summary */
export const setKeywordDatabaseAggSummary = (payload: KeywordDatabaseAggSummary) => {
  sessionStorage.setItem('keywordDatabaseAggSummary', JSON.stringify(payload));

  return {
    type: actionTypes.SET_KEYWORD_DATABASE_AGG_SUMMARY,
    payload,
  };
};

/* ============== KEYWORD REVERSE TABLE ================== */

/* Action to set loading state for keyword database  */
export const isLoadingKeywordDatabaseTable = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_KEYWORD_DATABASE_TABLE,
    payload,
  };
};

/* Action to set the keyword database table results */
export const setKeywordDatabaseTableResults = (payload: any) => {
  return {
    type: actionTypes.SET_KEYWORD_DATABASE_TABLE_RESULTS,
    payload,
  };
};

/* Action to set keyword database table pagination info */
export const setKeywordDatabaseTablePaginationInfo = (payload: KeywordDatabasePaginationInfo) => {
  return {
    type: actionTypes.SET_KEYWORD_DATABASE_TABLE_PAGINATION_INFO,
    payload,
  };
};

/* ======================== Session Storage =================== */

export const storekeywordDatabaseFilters = (keywordDatabaseFilters: any) => {
  sessionStorage.setItem('keywordDatabaseFilters', JSON.stringify(keywordDatabaseFilters));
};

/* Remove filter from local storage */
export const removekeywordDatabaseFilters = () => {
  sessionStorage.removeItem('keywordDatabaseFilters');
};

/* Extract and parse filter from local storage */
export const extractkeywordDatabaseFilters = () => {
  const storedFilters = JSON.parse(sessionStorage.getItem('keywordDatabaseFilters') || '{}');
  return storedFilters;
};

/* =============== Filter Parsing====================== */

/* Action to parse the  keyword database filters */
export const parseFilters = (keywordDatabaseFilter: any) => {
  const filterPayloadKeys = Object.keys(keywordDatabaseFilter);

  let filterQuery = '';

  filterPayloadKeys.forEach((key: string) => {
    const filter = keywordDatabaseFilter[key];

    const { keyName, type } = FILTER_QUERY_KEY_MAPPER[key];

    // basic text type
    if (type === F_TYPES.TEXT) {
      if (filter) {
        filterQuery += `&${keyName}=${filter}`;
      }
    }

    // checkbox filter
    if (type === F_TYPES.CHECKBOX) {
      filterQuery += `&${keyName}=${filter}`;
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

/* Action to fetch keyword database request id using asins */
export const fetchKeywordDatabaseRequestId = (keywordList: string) => async (dispatch: any) => {
  try {
    const sellerID = sellerIDSelector();

    const payload = {
      phrases: keywordList,
    };

    const { data } = await axios.post(
      `${AppConfig.BASE_URL_API}sellers/${sellerID}/keywords/request`,
      payload
    );

    dispatch(isFetchingKeywordDatabaseRequestId(true));

    if (data) {
      const { keyword_request_id: keywordRequestId } = data;
      // set keyword request id
      dispatch(setKeywordDatabaseRequestId(keywordRequestId));
      // set the asin list for future use
      dispatch(setKeywordListForKeywordDatabase(keywordList));
      dispatch(isFetchingKeywordDatabaseRequestId(false));

      // wait to 0.5 seconds
      await timeout(500);
      success('Fetching keywords');
      // dispatch the keyword request progress process
      dispatch(
        setKeywordDatabaseProgressData({
          seller: 0,
          status: '',
          progress: '',
          id: 0,
          report_xlsx_url: '',
        })
      );
      dispatch(shouldFetchKeywordDatabaseProgress(true));
    } else {
      dispatch(setKeywordDatabaseRequestId(''));
      dispatch(setKeywordListForKeywordDatabase(keywordList));
      dispatch(isFetchingKeywordDatabaseRequestId(false));
      dispatch(shouldFetchKeywordDatabaseProgress(false));
    }
  } catch (err) {
    console.error('Error fetching the keyword request Id', err);
    dispatch(setKeywordDatabaseRequestId(''));
    dispatch(isFetchingKeywordDatabaseRequestId(false));
  }
};

export const fetchKeywordDatabaseProgress = () => async (dispatch: any, getState: any) => {
  try {
    const sellerID = sellerIDSelector();

    const keywordRequestId = getKeywordDatabaseRequestId(getState());

    if (!keywordRequestId) {
      return;
    }

    const resourcePath = `keywords/progress?keyword_request_id=${keywordRequestId}`;
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerID}/${resourcePath}`;

    const { data } = await axios.get(URL);

    const isFailedStatus = data.status === 'failed';
    const isCompleted = data.status === 'completed';

    if (isFailedStatus) {
      dispatch(shouldFetchKeywordDatabaseProgress(false));
      dispatch(setKeywordDatabaseProgressData(data));
      error('Error: Failed on progress');
      return;
    }

    if (!isFailedStatus) {
      dispatch(setKeywordDatabaseProgressData(data));
      // if not completed should fetch again else not
      dispatch(shouldFetchKeywordDatabaseProgress(!isCompleted));

      if (isCompleted) {
        // if completed fetch table data and run loader
        dispatch(fetchKeywordDatabaseWordFreqSummary());
        dispatch(fetchKeywordDatabaseAggSummary());
        dispatch(fetchKeywordDatabaseTableInformation({ enableLoader: true }));
      }
    }
  } catch (err) {
    console.error('Error fetching keyword progress');
    dispatch(shouldFetchKeywordDatabaseProgress(false));
    dispatch(
      setKeywordDatabaseProgressData({
        status: 'failed',
        progress: '',
        id: 0,
        seller: 0,
        report_xlsx_url: '',
      })
    );
  }
};

/* Action to fetch the keyword database table information */
export const fetchKeywordDatabaseTableInformation = (
  payload: KeywordDatabaseTablePayload
) => async (dispatch: any, getState: any) => {
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
      removekeywordDatabaseFilters();
      dispatch(isLoadingKeywordDatabaseTable(false));
      dispatch(setKeywordDatabaseTableResults([]));
      dispatch(
        setKeywordDatabaseTablePaginationInfo({
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
      filterPayloadData = extractkeywordDatabaseFilters();
    } else {
      storekeywordDatabaseFilters(filterPayload);
      filterPayloadData = filterPayload;
    }

    let filtersQueryString: string = parseFilters(filterPayloadData);

    if (!filtersQueryString) {
      filtersQueryString = parseFilters(extractkeywordDatabaseFilters());
    }

    const pagination = `page=${page}`;
    const sortDirection = `sort_direction=${sortDir}`;
    const sortingValue = `sort=${sort}`;
    const perPage = `per_page=${per_page}`;

    const keywordRequestId = getKeywordDatabaseRequestId(getState());

    // if no keyword ID return
    if (!keywordRequestId) {
      return;
    }

    const keywordRequestIdQuery = `keyword_request_id=${keywordRequestId}`;

    // full resource path
    const resourcePath = `?${pagination}&${perPage}&${sortingValue}&${sortDirection}${filtersQueryString}`;

    dispatch(isLoadingKeywordDatabaseTable(enableLoader));

    const { data } = await axios.get(
      `${AppConfig.BASE_URL_API}sellers/${sellerID}/keywords${resourcePath}&${keywordRequestIdQuery}`
    );

    const { results, ...paginationInfo } = data;

    if (data) {
      dispatch(setKeywordDatabaseTableResults(results));
      dispatch(setKeywordDatabaseTablePaginationInfo(paginationInfo));
      dispatch(isLoadingKeywordDatabaseTable(false));
    }
  } catch (err) {
    console.error('Error fetching keyword database table', err);

    dispatch(setKeywordDatabaseTableResults([]));
    dispatch(
      setKeywordDatabaseTablePaginationInfo({
        count: 0,
        current_page: 0,
        total_pages: 0,
        per_page: 0,
      })
    );
    dispatch(isLoadingKeywordDatabaseTable(false));
  }
};

/* Action to fetch keyword database word freq summary */
export const fetchKeywordDatabaseWordFreqSummary = (sortDir: 'asc' | 'desc' = 'desc') => async (
  dispatch: any,
  getState: any
) => {
  const sellerId = sellerIDSelector();

  try {
    const keywordRequestId = getKeywordDatabaseRequestId(getState());

    const sorting = `sort_direction=${sortDir}`;

    const resourcePath = `keyword_request_id=${keywordRequestId}&${sorting}`;

    dispatch(isLoadingKeywordDatabaseWordFreqSummary(true));

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/keywords/word-freq?${resourcePath}`;

    const { data } = await axios.get(URL);

    if (data) {
      dispatch(setKeywordDatabaseWordFreqSummary(data));
      dispatch(isLoadingKeywordDatabaseWordFreqSummary(false));
    } else {
      dispatch(setKeywordDatabaseWordFreqSummary([]));
      dispatch(isLoadingKeywordDatabaseWordFreqSummary(false));
    }
  } catch (err) {
    console.error('Error fetching keyword database word freq summary', err);
    dispatch(setKeywordDatabaseWordFreqSummary([]));
    dispatch(isLoadingKeywordDatabaseWordFreqSummary(false));
  }
};

/* Action to fetch keyword ditribution/aggregation on keyword database */
export const fetchKeywordDatabaseAggSummary = () => async (dispatch: any, getState: any) => {
  const sellerId = sellerIDSelector();

  try {
    const keywordRequestId = getKeywordDatabaseRequestId(getState());

    const resourcePath = `keyword_request_id=${keywordRequestId}`;

    dispatch(isLoadingKeywordDatabaseAggSummary(true));

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/keywords/aggregation?${resourcePath}`;

    const { data } = await axios.get(URL);

    if (data) {
      dispatch(setKeywordDatabaseAggSummary(data));
      dispatch(isLoadingKeywordDatabaseAggSummary(false));
    } else {
      dispatch(
        setKeywordDatabaseAggSummary({
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
      dispatch(isLoadingKeywordDatabaseAggSummary(false));
    }
  } catch (err) {
    console.error('Error fetching keyword database aggregation summary', err);
    dispatch(
      setKeywordDatabaseAggSummary({
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
    dispatch(isLoadingKeywordDatabaseAggSummary(false));
  }
};

let cancelToken: any;

/* Function to ask for suggestions */
export const askForKeywordSuggestion = async (keywords: string) => {
  try {
    const keywordArray = keywords.split(',');

    const shouldAskSuggestions = keywordArray.filter((item: string) => item.length > 0) || [];

    if (shouldAskSuggestions.length > 0) {
      const lastKeywordEntered = keywordArray[keywordArray.length - 1] || '';
      if (!lastKeywordEntered) {
        return [];
      }

      if (typeof cancelToken !== typeof undefined) {
        // cancel last pending auto suggestions requests
        cancelToken.cancel();
      }

      //Save the cancel token for the current request
      cancelToken = axios.CancelToken.source();

      const URL = `${
        AppConfig.BASE_URL_API
      }sellers/${sellerIDSelector()}/keywords/search?phrase=${lastKeywordEntered}`;

      const { data } = await axios.get(URL, {
        cancelToken: cancelToken.token,
      });

      return data || [];
    } else {
      return [];
    }
  } catch (err) {
    console.error('Error in autosuggestion');
  }
};

/* Action to reset keyword database */
export const resetKeywordDatabase = () => async (dispatch: any) => {
  dispatch(isFetchingKeywordDatabaseRequestId(false));
  dispatch(setKeywordDatabaseRequestId(''));
  dispatch(setKeywordListForKeywordDatabase(''));
  dispatch(shouldFetchKeywordDatabaseProgress(false));
  dispatch(
    setKeywordDatabaseProgressData({
      id: 0,
      seller: 0,
      status: '',
      progress: '',
      report_xlsx_url: '',
    })
  );
  dispatch(setKeywordDatabaseWordFreqSummary([]));
  dispatch(
    setKeywordDatabaseAggSummary({
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
  dispatch(fetchKeywordDatabaseTableInformation({ resetFilter: true }));
};
