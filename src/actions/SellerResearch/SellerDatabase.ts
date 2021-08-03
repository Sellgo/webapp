import axios from 'axios';
import { AppConfig } from '../../config';
import {
  actionTypes,
  FILTER_QUERY_KEY_MAPPER,
  F_TYPES,
} from '../../constants/SellerResearch/SellerDatabase';
import {
  SellerDatabasePayload,
  ShowFilterMessage,
} from '../../interfaces/SellerResearch/SellerDatabase';
import { sellerIDSelector } from '../../selectors/Seller';

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
      const includes = filter.includes ? `&${keyName}_includes=${filter.includes}` : '';
      const excludes = filter.excludes ? `&${keyName}_excludes=${filter.excludes}` : '';
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

/* =========================== Async actions ======================= */
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
          message: 'Please specify atleast one filter to view the data',
        })
      );
      return;
    }

    const pagination = `page=${page}`;
    const sorting = `ordering=${sortDir === 'desc' ? `-${sort}` : sort}`;

    const filtersQueryString = parseFilters(filterPayload);

    dispatch(setIsLoadingSellerDatabase(enabledLoader));

    const URL = `sellers/${sellerID}/merchants-database?${pagination}&${sorting}${filtersQueryString}`;

    const { data } = await axios.get(`${AppConfig.BASE_URL_API}${URL}`);
    if (data) {
      dispatch(setSellerDatabaseResults(data));
      dispatch(setSellerDatabaseFilterMessage({ show: false, message: '', type: 'info' }));
      setIsLoadingSellerDatabase(false);
    }
  } catch (err) {
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
