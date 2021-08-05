import axios from 'axios';
import { AppConfig } from '../../config';
import {
  actionTypes,
  FILTER_QUERY_KEY_MAPPER,
  F_TYPES,
  INFO_FILTER_MESSAGE,
} from '../../constants/SellerResearch/SellerDatabase';
import {
  SellerDatabasePaginationInfo,
  SellerDatabasePayload,
  ShowFilterMessage,
} from '../../interfaces/SellerResearch/SellerDatabase';
import { sellerIDSelector } from '../../selectors/Seller';
import { getSellerDatabaseResults } from '../../selectors/SellerResearch/SellerDatabase';
import { info } from '../../utils/notifications';

/* Action to set loading state for seller database */
export const setIsLoadingSellerDatabase = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_SELLER_DATABASE,
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

/* Action to prepare the payload for query */
export const parseFilters = (sellerDatabaseFilter: any) => {
  const filterPayloadKeys = Object.keys(sellerDatabaseFilter);

  let filterQuery = '';

  filterPayloadKeys.forEach((key: string) => {
    const filter = sellerDatabaseFilter[key];

    const { keyName, type } = FILTER_QUERY_KEY_MAPPER[key];

    if (type === F_TYPES.TEXT) {
      if (filter) {
        filterQuery += `&${keyName}=${filter}`;
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

/* Main seller databse fetcher */
export const fetchSellerDatabase = (payload: SellerDatabasePayload) => async (dispatch: any) => {
  const sellerID = sellerIDSelector();

  try {
    const {
      resetFilter = false,
      filterPayload,
      page = 1,
      sort = 'seller_id',
      sortDir = 'asc',
      enabledLoader = true,
    } = payload;

    // if filter request is passed
    if (resetFilter) {
      dispatch(setIsLoadingSellerDatabase(false));
      dispatch(setSellerDatabaseResults([]));
      dispatch(
        setSellerDatabaseFilterMessage({
          type: 'info',
          show: true,
          message: INFO_FILTER_MESSAGE,
        })
      );
      removeSellerDatabaseFilters();
      return;
    }

    const pagination = `page=${page}`;
    const sorting = `ordering=${sortDir === 'desc' ? `-${sort}` : sort}`;

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

    dispatch(setIsLoadingSellerDatabase(enabledLoader));

    const URL = `sellers/${sellerID}/merchants-database?${pagination}&${sorting}${filtersQueryString}`;

    const { data } = await axios.get(`${AppConfig.BASE_URL_API}${URL}`);

    const { results, ...paginationInfo } = data;
    if (data) {
      dispatch(setSellerDatabaseResults(results));
      dispatch(setSellerDatabasePaginationInfo(paginationInfo));
      dispatch(setSellerDatabaseFilterMessage({ show: false, message: '', type: 'info' }));
      dispatch(setIsLoadingSellerDatabase(false));
    }
  } catch (err) {
    console.error('Error fetching ', err);
    dispatch(setIsLoadingSellerDatabase(false));
    dispatch(setSellerDatabaseResults([]));

    const { status, data } = err.response;

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
