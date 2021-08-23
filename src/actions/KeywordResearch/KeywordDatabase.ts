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
export const setKeywordListForkeywordDatabase = (payload: string) => {
  sessionStorage.setItem('keywordDatabaseKeywordList', payload);
  return {
    type: actionTypes.SET_KEYWORDS_LIST_FOR_KEYWORD_DATABASE,
    payload,
  };
};

/* ============== KEYWORD DATABASE PROGRESS ================== */

/* Action to set if progress needs to be called */
export const shouldFetchkeywordDatabaseProgress = (payload: boolean) => {
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
      dispatch(shouldFetchkeywordDatabaseProgress(false));
      dispatch(setKeywordDatabaseProgressData(data));
      error('Error: Failed on progress');
      return;
    }

    if (!isFailedStatus) {
      dispatch(setKeywordDatabaseProgressData(data));
      // if not completed should fetch again else not
      dispatch(shouldFetchkeywordDatabaseProgress(!isCompleted));

      if (isCompleted) {
        // if completed fetch table data and run loader
        dispatch(fetchKeywordDatabaseTableInformation({ enableLoader: true }));
      }
    }
  } catch (err) {
    console.error('Error fetching keyword progress');
    dispatch(shouldFetchkeywordDatabaseProgress(false));
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
      dispatch(setKeywordListForkeywordDatabase(keywordList));
      dispatch(isFetchingKeywordDatabaseRequestId(false));

      // wait to 2 seconds
      await timeout(1200);
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
      dispatch(shouldFetchkeywordDatabaseProgress(true));
    } else {
      dispatch(setKeywordDatabaseRequestId(''));
      dispatch(setKeywordListForkeywordDatabase(keywordList));
      dispatch(isFetchingKeywordDatabaseRequestId(false));
      dispatch(shouldFetchkeywordDatabaseProgress(false));
    }
  } catch (err) {
    console.log('Error fetching the keyword request Id', err.response);
    dispatch(setKeywordDatabaseRequestId(''));
    dispatch(isFetchingKeywordDatabaseRequestId(false));
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
    console.error('Error fetching keyword database table', err.response);

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
