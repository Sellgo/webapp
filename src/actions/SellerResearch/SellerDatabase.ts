import axios from 'axios';
import { AppConfig } from '../../config';
import {
  actionTypes,
  FILTER_QUERY_KEY_MAPPER,
  F_TYPES,
} from '../../constants/SellerResearch/SellerDatabase';
import {
  SellerDatabasePaginationInfo,
  SellerDatabasePayload,
  ShowFilterMessage,
  MarketplaceOption,
} from '../../interfaces/SellerResearch/SellerDatabase';
import { sellerIDSelector } from '../../selectors/Seller';
import {
  getSellerDatabasePaginationInfo,
  getSellerDatabaseResults,
} from '../../selectors/SellerResearch/SellerDatabase';
import { downloadFile } from '../../utils/download';
import { error, info, success } from '../../utils/notifications';
import { getSellerQuota } from '../Settings';

/* Action to set quota exceeded for seller database */
export const setSellerDatabaseQuotaExceeded = (payload: boolean) => {
  return {
    type: actionTypes.SET_SELLER_DATABASE_QUOTA_EXCEEDED,
    payload,
  };
};

/* Action to set loading state for seller database */
export const setIsLoadingSellerDatabase = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_SELLER_DATABASE,
    payload,
  };
};

/* Action to set loading state for seller database export */
export const setIsLoadingSellerDatabaseExport = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_SELLER_DATABASE_EXPORT,
    payload,
  };
};

/* Action to set seller database results */
export const setSellerDatabaseResults = (payload: any) => {
  return {
    type: actionTypes.SET_SELLER_DATABASE_RESULTS,
    payload,
  };
};

/* Action to set and show filter messages */
export const setSellerDatabaseFilterMessage = (payload: ShowFilterMessage) => {
  return {
    type: actionTypes.SHOW_FILTER_MESSAGE,
    payload,
  };
};

/* Action to set pagination info for seller database */
export const setSellerDatabasePaginationInfo = (payload: SellerDatabasePaginationInfo) => {
  return {
    type: actionTypes.SET_SELLER_DATABASE_PAGINATION_INFO,
    payload,
  };
};

/* Action to set marketplace info for seller database */
export const setSellerDatabaseMarketplace = (payload: MarketplaceOption) => {
  return {
    type: actionTypes.SET_SELLER_DATABASE_MARKETPLACE,
    payload,
  };
};

/* Action to set restore last search status */
export const setIsRestoringSellerDatabaseLastSearch = (payload: boolean) => {
  return {
    type: actionTypes.SET_IS_RESTORING_SELLER_DATABASE_LAST_SEARCH,
    payload,
  };
};

/* Action to prepare the payload for query */
export const parseFilters = (sellerDatabaseFilter: any) => {
  const filterPayloadKeys = Object.keys(sellerDatabaseFilter);

  let filterQuery = '';

  filterPayloadKeys.forEach((key: string) => {
    const filter = sellerDatabaseFilter[key];
    const { keyName, type } = FILTER_QUERY_KEY_MAPPER[key];

    if (type === F_TYPES.TEXT) {
      if (filter) {
        // encode URI is necessary to escape '&' in values for categories
        filterQuery += `&${keyName}=${encodeURIComponent(filter)}`;
      }
    }

    if (type === F_TYPES.INPUT_INCLUDE_EXCLUDE) {
      const includes = filter.include ? `&include_${keyName}=${filter.include}` : '';
      const excludes = filter.exclude ? `&exclude_${keyName}=${filter.exclude}` : '';
      filterQuery += `${includes}${excludes}`;
    }

    if (type === F_TYPES.MIN_MAX) {
      const min = filter.min ? `&${keyName}_min=${filter.min}` : '';
      const max = filter.max ? `&${keyName}_max=${filter.max}` : '';
      filterQuery += `${min}${max}`;
    }

    if (type === F_TYPES.MIN_MAX_PERIOD) {
      if (filter.period) {
        const min = filter.min ? `&${keyName}_${filter.period}_min=${filter.min}` : '';
        const max = filter.max ? `&${keyName}_${filter.period}_max=${filter.max}` : '';
        filterQuery += `${min}${max}`;
      }
    }

    if (type === F_TYPES.GROWTH_COUNT_FILTER || type === F_TYPES.GROWTH_PERCENT_FILTER) {
      if (filter.period) {
        const min = filter.min ? `&${filter.period}_min=${filter.min}` : '';
        const max = filter.max ? `&${filter.period}_max=${filter.max}` : '';
        filterQuery += `${min}${max}`;
      }
    }

    if (type === F_TYPES.MIN_MAX_PERIOD_REVIEW) {
      if (filter.type) {
        const min = filter.min ? `&${filter.type}_${filter.period}_min=${filter.min}` : '';
        const max = filter.max ? `&${filter.type}_${filter.period}_max=${filter.max}` : '';
        filterQuery += `${min}${max}`;
      }
    }
  });

  return filterQuery;
};

/* Store filter in local storage */
export const storeSellerDatabaseFilters = (sellerDatabaseFilter: any) => {
  localStorage.setItem('sellerDatabaseFilters', JSON.stringify(sellerDatabaseFilter));
};

/* Remove filter from local storage */
export const removeSellerDatabaseFilters = () => {
  localStorage.removeItem('sellerDatabaseFilters');
};

/* Extract and parse filter from local storage */
export const extractSellerDatabaseFilters = () => {
  const storedFilters = JSON.parse(localStorage.getItem('sellerDatabaseFilters') || '{}');
  return storedFilters;
};
/* =========================== Async actions ======================= */

/* Export seller database table */
export const exportSellerDatabaseTable = (resourcePath: string) => async (
  dispatch: any,
  getState: any
) => {
  try {
    dispatch(setIsLoadingSellerDatabaseExport(true));
    const state = getState();
    const paginationInfo = getSellerDatabasePaginationInfo(state);
    const page = paginationInfo?.current_page || 1;
    const sort = paginationInfo?.sort || '';
    const sellerID = sellerIDSelector();

    const { data } = await axios.get(
      `${AppConfig.BASE_URL_API}sellers/${sellerID}/merchants-database?page=${page}&${sort}&${resourcePath}`
    );

    if (data) {
      const { url } = data;
      if (url) {
        await downloadFile(url);
        success('File successfully exported');
      }
    }
  } catch (err) {
    const { response } = err as any;
    const { status, data } = response;

    if (status === 403) {
      error(data.message);
    }
  }
  dispatch(setIsLoadingSellerDatabaseExport(false));
};
export const exportSellerEmployeesTable = (resourcePath: string) => async (
  dispatch: any,
  getState: any
) => {
  try {
    dispatch(setIsLoadingSellerDatabaseExport(true));
    const state = getState();
    const paginationInfo = getSellerDatabasePaginationInfo(state);
    const page = paginationInfo?.current_page || 1;
    const sort = paginationInfo?.sort || '';
    const sellerID = sellerIDSelector();

    const { data } = await axios.get(
      `${AppConfig.BASE_URL_API}sellers/${sellerID}/merchants-empployees?page=${page}&${sort}&${resourcePath}`
    );

    if (data) {
      const { url } = data;
      if (url) {
        await downloadFile(url);
        success('File successfully exported');
      }
    }
  } catch (err) {
    const { response } = err as any;
    const { status, data } = response;

    if (status === 403) {
      error(data.message);
    }
  }
  dispatch(setIsLoadingSellerDatabaseExport(false));
};

/* Main seller databse fetcher */
export const fetchSellerDatabase = (payload: SellerDatabasePayload) => async (
  dispatch: any,
  getState: any
) => {
  const sellerID = sellerIDSelector();
  try {
    const {
      resetFilter = false,
      filterPayload,
      page = 1,
      sort = 'seller_id',
      sortDir = 'asc',
      enabledLoader = true,
      marketplaceId = 'ATVPDKIKX0DER',
      isExport = false,
      fileFormat = 'csv',
      restoreLastSearch = false,
      retrieve_default = false,
      exportEmployees = false,
    } = payload;

    // if filter request is passed
    if (resetFilter) {
      removeSellerDatabaseFilters();
      dispatch(setIsLoadingSellerDatabase(false));
      dispatch(setSellerDatabaseResults([]));
      dispatch(
        setSellerDatabaseFilterMessage({
          type: 'info',
          show: true,
          message: '',
        })
      );
      dispatch(
        setSellerDatabasePaginationInfo({ total_pages: 0, current_page: 0, count: 0, sort: '' })
      );

      return;
    }

    if (restoreLastSearch) {
      dispatch(setIsRestoringSellerDatabaseLastSearch(true));
      dispatch(setIsLoadingSellerDatabase(enabledLoader));
      const URL = `${AppConfig.BASE_URL_API}sellers/${sellerID}/merchants-database?restore_last_search=true`;
      const { data } = await axios.get(URL);

      const { results, ...paginationInfo } = data;
      if (data) {
        dispatch(setSellerDatabaseQuotaExceeded(false));
        dispatch(setSellerDatabaseResults(results));
        dispatch(setSellerDatabasePaginationInfo({ ...paginationInfo, sort: '' }));
        dispatch(setSellerDatabaseFilterMessage({ show: false, message: '', type: 'info' }));
        dispatch(setIsLoadingSellerDatabase(false));
      }
      return;
    }

    const pagination = `page=${page}`;
    const sorting = `ordering=${sortDir === 'desc' ? `-${sort}` : sort}`;
    const marketplace = `marketplace_id=${marketplaceId}`;
    const retrieveDefault = `retrieve_default=${retrieve_default ? 'true' : 'false'}`;

    let filterPayloadData: any;

    if (!filterPayload) {
      filterPayloadData = extractSellerDatabaseFilters();
    } else {
      storeSellerDatabaseFilters(filterPayload);
      filterPayloadData = filterPayload;
    }

    let filtersQueryString: string = parseFilters(filterPayloadData);

    if (!filtersQueryString) {
      filtersQueryString = parseFilters(extractSellerDatabaseFilters());
    }

    const resourcePath = `${pagination}&${sorting}&${marketplace}&${retrieveDefault}&${filtersQueryString}`;

    if (isExport && fileFormat) {
      const exportResource =
        `${marketplace}${filtersQueryString}` + `&is_export=${isExport}&file_format=${fileFormat}`;
      if (exportEmployees) {
        dispatch(exportSellerEmployeesTable(exportResource));
      } else {
        dispatch(exportSellerDatabaseTable(exportResource));
      }
      return;
    }

    // set the table to empty results if data already exists to show loader
    // on top of table instead of center until custom loader is built
    const currentSellerDatabaseResults = getSellerDatabaseResults(getState());
    if (currentSellerDatabaseResults && currentSellerDatabaseResults.length > 0) {
      dispatch(setSellerDatabaseResults([]));
    }

    dispatch(setIsLoadingSellerDatabase(enabledLoader));

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerID}/merchants-database?${resourcePath}`;

    const { data } = await axios.get(URL);

    const { results, ...paginationInfo } = data;
    if (data) {
      dispatch(setSellerDatabaseQuotaExceeded(false));
      dispatch(setSellerDatabaseResults(results));
      dispatch(setSellerDatabasePaginationInfo({ ...paginationInfo, sort: sorting }));
      dispatch(setSellerDatabaseFilterMessage({ show: false, message: '', type: 'info' }));
      dispatch(setIsLoadingSellerDatabase(false));
    }
    dispatch(getSellerQuota());
  } catch (err) {
    console.error('Error fetching ', err);
    dispatch(setIsLoadingSellerDatabase(false));
    dispatch(setSellerDatabaseResults([]));
    dispatch(
      setSellerDatabasePaginationInfo({ total_pages: 0, current_page: 0, count: 0, sort: '' })
    );

    const { response } = err as any;
    const { status, data } = response;

    if (status === 429) {
      error(data.message);
      dispatch(setSellerDatabaseQuotaExceeded(true));
    }

    dispatch(
      setSellerDatabaseFilterMessage({
        show: status === 400,
        message: data.message || '',
        type: 'error',
      })
    );

    console.error('Error fetching seller database', err);
  }
};

/* Tracker Merchant from database */
export const trackMerchantFromDatabase = (merchantId: string) => async (
  dispatch: any,
  getState: any
) => {
  try {
    const sellerID = sellerIDSelector();

    const url = `${AppConfig.BASE_URL_API}sellers/${sellerID}/merchants/track`;
    const sellers = getSellerDatabaseResults(getState());
    const payload = new FormData();

    payload.set('amazon_merchant_id', merchantId);

    const res = await axios.post(url, payload);

    const data = res.data;

    if (data) {
      const { tracking_status } = data.object;

      const updatedSellersList = sellers.map((seller: any) => {
        if (seller.merchant_id === data.object.merchant_id) {
          return {
            ...seller,
            ...data.object,
          };
        } else {
          return seller;
        }
      });

      info(
        `Seller ${
          tracking_status === 'active' || tracking_status === true ? 'Tracking' : 'Untracking'
        }`
      );
      dispatch(setSellerDatabaseResults(updatedSellersList));
    }
  } catch (err) {
    console.log('Error Tracking Seller', err);
  }
};

export const setCompanyInfo = (companyInfo: any, merchantId: string) => (
  dispatch: any,
  getState: any
) => {
  const sellers = getSellerDatabaseResults(getState());
  const updatedSellersList = sellers.map((seller: any) => {
    if (seller.merchant_id === merchantId) {
      return {
        ...seller,
        company_info: companyInfo,
      };
    } else {
      return seller;
    }
  });
  dispatch(setSellerDatabaseResults(updatedSellersList));
};
