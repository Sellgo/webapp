import Axios from 'axios';
import { sellerIDSelector } from '../../selectors/Seller';
import { AppConfig } from '../../config';
import {
  FETCH_SELLER_DATABASE,
  FETCH_SELLER_DATABASE_SUCCESS,
  FETCH_SELLER_DATABASE_ERROR,
  SET_SELLER_DATABASE_PAGE_NO,
  SET_SELLER_DATABASE_PAGE_SIZE,
  SET_SELLER_DATABASE_PAGE_COUNT,
  SET_SELLER_DATABASE_COUNT,
  LOADING_DATABASE,
  SET_SELLER_DATABASE_SORT,
  SET_SELLER_DATABASE_SORT_DIRECTION,
  SET_SELLER_DATABASE_FILTERS,
  FILTERS,
  defaultFilters,
  SET_MARKETPLACE,
} from '../../constants/SellerDatabase';
import {
  databaseSort,
  databaseSortDirection,
  sellerDatabase,
  sellerDatabaseFilters,
  sellerDatabaseMarket,
} from '../../selectors/SellerDatabase';

import { info } from '../../utils/notifications';

export interface SellerDatabasePayload {
  pageNo?: number;
  pageSize?: number;
  enableLoader?: boolean;
  sort?: string;
  sortDirection?: string;
  filters?: boolean;
  resetFilters?: boolean;
  asins?: string;
  brands?: string;
  sellerIds?: string;
  state?: string;
}

export interface SellerDatabaseFilter {
  type: string;
  min: number;
  max: number;
  value: any;
  values: string[];
  active: boolean;
  duration: string;
}

export const fetchSellersDatabase = (payload: SellerDatabasePayload) => async (
  dispatch: any,
  getState: any
) => {
  try {
    const defaultSort = databaseSort(getState());
    const defaultSortDirection = databaseSortDirection(getState());
    const sellerDBFilters = sellerDatabaseFilters(getState());
    const defaultMarketplace = sellerDatabaseMarket(getState());

    const {
      pageNo = 1,
      pageSize = 50,
      enableLoader = true,
      sort = defaultSort,
      sortDirection = defaultSortDirection,
      filters,
      resetFilters,
      asins,
      brands,
      sellerIds,
      state,
    } = payload;

    const sellerID = sellerIDSelector();

    if (resetFilters) {
      localStorage.removeItem('seller-database-filters');
      localStorage.removeItem('showSellerDatabaseData');
      dispatch(setFilters(defaultFilters));
      dispatch(fetchSellerDatabaseSuccess([]));
      return;
    }

    let queryFilters = '';

    if (filters) {
      localStorage.setItem('seller-database-filters', JSON.stringify(sellerDBFilters));
    }

    // reset the reset local Storage Condition
    localStorage.setItem('showSellerDatabaseData', 'true');
    queryFilters = parseFilters(sellerDBFilters);

    if (state) {
      queryFilters += `&state=${state}`;
    }

    if (asins) {
      queryFilters += `&asins=${asins}`;
    }

    if (brands) {
      queryFilters += `&brands=${brands}`;
    }

    if (sellerIds) {
      queryFilters += `&merchant_ids=${sellerIds}`;
    }

    const pagination = `page=${pageNo}&per_page=${pageSize}`;
    const sorting = `ordering=${sortDirection === 'descending' ? `-${sort}` : sort}`;

    const url =
      AppConfig.BASE_URL_API +
      // eslint-disable-next-line max-len
      `sellers/${sellerID}/merchants-database?${pagination}&${sorting}${queryFilters}&marketplace_id=${defaultMarketplace}`;

    if (enableLoader) {
      dispatch(fetchSellerDatabase(true));
    }

    dispatch(setLoadingDatabase(!enableLoader));

    const res = await Axios.get(url);
    if (res.data) {
      const { results, count, per_page, current_page, total_pages } = res.data;
      dispatch(fetchSellerDatabasePageSize(per_page));
      dispatch(fetchSellerDatabasePageNo(current_page));
      dispatch(fetchSellerDatabasePageCount(total_pages));
      dispatch(fetchSellerDatabaseCount(count));
      dispatch(setDatabaseSort(sort));
      dispatch(setDatabaseSortDirection(sortDirection));
      dispatch(fetchSellerDatabase(false));
      dispatch(setLoadingDatabase(false));
      dispatch(fetchSellerDatabaseSuccess(results));
      return;
    }
  } catch (e) {
    dispatch(fetchSellerDatabaseError(e));
    console.log(e);
  }
};

// export const setSellerDatabaseSinglePageItemsCount = (count: number) => async (dispatch: any) =>
//   dispatch(fetchSellerDatabaseSingelPageItemsCount(count));

export const updateSellerDatabaseFilters = (filter: SellerDatabaseFilter) => async (
  dispatch: any,
  getState: any
) => {
  try {
    let filters: SellerDatabaseFilter[] = sellerDatabaseFilters(getState());
    filters = filters.map(f => {
      let update = f;
      if (update.type === filter.type) {
        update = { ...update, ...filter };
      }
      return update;
    });

    dispatch(setFilters(filters));
  } catch (e) {
    console.log('error', e);
  }
};

export const loadFilters = () => async (dispatch: any) => {
  const localFilters = localStorage.getItem('seller-database-filters');
  if (localFilters) {
    const parsed = JSON.parse(localFilters);
    dispatch(setFilters(parsed));
  }
};

export const updateMarketplace = (market: string) => async (dispatch: any) => {
  await dispatch(setMarketplace(market));
};

const parseFilters = (data: SellerDatabaseFilter[]): string => {
  const localFilters = localStorage.getItem('seller-database-filters');
  let query = '';
  let filters = data;
  if (localFilters) {
    filters = JSON.parse(localFilters);
  }
  filters.forEach(filter => {
    // if(filter.typ==='fbm and && filter.active)
    if (filter.type === FILTERS.LAUNCHED && filter.value) {
      query += `&${filter.type}=${filter.value}`;
    } else {
      if (filter.duration) {
        const min = filter.min ? `&${filter.type}_${filter.duration}_min=${filter.min}` : '';
        const max = filter.max ? `&${filter.type}_${filter.duration}_max=${filter.max}` : '';
        query += `${min}${max}`;
      } else {
        const min = filter.min ? `&${filter.type}_min=${filter.min}` : '';
        const max = filter.max ? `&${filter.type}_max=${filter.max}` : '';
        query += `${min}${max}`;
      }
    }
  });

  return query;
};

export const trackDatabaseSeller = (merchantId: any) => async (dispatch: any, getState: any) => {
  try {
    const sellerID = sellerIDSelector();

    const url = `${AppConfig.BASE_URL_API}sellers/${sellerID}/merchants/track`;
    const sellers = sellerDatabase(getState());
    const payload = new FormData();

    payload.set('amazon_merchant_id', merchantId);

    const res = await Axios.post(url, payload);

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
      dispatch(fetchSellerDatabaseSuccess(updatedSellersList));
      // dispatch(getSellerQuota());
    }
  } catch (err) {
    console.log('Error Tracking Seller', err);
  }
};

const fetchSellerDatabase = (loading: boolean) => ({
  type: FETCH_SELLER_DATABASE,
  data: loading,
});

const fetchSellerDatabaseSuccess = (database: any[]) => ({
  type: FETCH_SELLER_DATABASE_SUCCESS,
  data: database,
});

const fetchSellerDatabaseError = (error: any) => ({
  type: FETCH_SELLER_DATABASE_ERROR,
  data: error,
});

const fetchSellerDatabasePageNo = (pageNo: number) => ({
  type: SET_SELLER_DATABASE_PAGE_NO,
  data: pageNo,
});

const fetchSellerDatabasePageSize = (pageSize: number) => ({
  type: SET_SELLER_DATABASE_PAGE_SIZE,
  data: pageSize,
});

const fetchSellerDatabasePageCount = (pageCount: number) => ({
  type: SET_SELLER_DATABASE_PAGE_COUNT,
  data: pageCount,
});

const fetchSellerDatabaseCount = (count: number) => ({
  type: SET_SELLER_DATABASE_COUNT,
  data: count,
});

const setLoadingDatabase = (loading: boolean) => ({
  type: LOADING_DATABASE,
  data: loading,
});

const setDatabaseSort = (sort: string) => ({
  type: SET_SELLER_DATABASE_SORT,
  data: sort,
});

const setDatabaseSortDirection = (sortDirection: string) => ({
  type: SET_SELLER_DATABASE_SORT_DIRECTION,
  data: sortDirection,
});

const setFilters = (filters: any[]) => ({
  type: SET_SELLER_DATABASE_FILTERS,
  data: filters,
});

const setMarketplace = (market: string) => ({
  type: SET_MARKETPLACE,
  data: market,
});
