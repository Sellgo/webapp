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
  SET_SELLER_DATABASE_SINGLE_PAGE_ITEMS_COUNT,
  LOADING_DATABASE,
  SET_SELLER_DATABASE_SORT,
  SET_SELLER_DATABASE_SORT_DIRECTION,
  SET_SELLER_DATABASE_FILTERS,
  FILTERS,
  defaultFilters,
  SEARCH_TYPE,
} from '../../constants/SellerDatabase';
import {
  databaseSort,
  databaseSortDirection,
  sellerDatabaseFilters,
} from '../../selectors/SellerDatabase';
import { extractAsinFromUrl } from '../../utils/format';

export interface SellerDatabasePayload {
  pageNo?: number;
  pageSize?: number;
  enableLoader?: boolean;
  sort?: string;
  sortDirection?: string;
  filters?: boolean;
  resetFilters?: boolean;
  search?: string;
  searchType?: string;
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

    const {
      pageNo = 1,
      pageSize = 50,
      enableLoader = true,
      sort = defaultSort,
      sortDirection = defaultSortDirection,
      filters,
      resetFilters,
      search,
      searchType,
      state,
    } = payload;
    if (filters) {
      localStorage.setItem('seller-database-filters', JSON.stringify(sellerDBFilters));
    }
    let queryFilters = '';

    if (!resetFilters) {
      queryFilters = parseFilters(sellerDBFilters);
    } else {
      localStorage.removeItem('seller-database-filters');
      dispatch(setFilters(defaultFilters));
    }

    if (search) {
      if (searchType) {
        switch (searchType) {
          case SEARCH_TYPE.ASIN:
            queryFilters += `&asin=${search}`;
            break;

          case SEARCH_TYPE.SELLER_ID:
            queryFilters += `&seller_id=${search}`;
            break;

          case SEARCH_TYPE.SELLER_NAME:
            queryFilters += `&seller_name=${search}`;
            break;
          case SEARCH_TYPE.AMAZON_LINK:
            queryFilters += `&asin=${extractAsinFromUrl(search)}`;
            break;
        }
      }
    }
    if (state) {
      queryFilters += `&state=${state}`;
    }
    const pagination = `page=${pageNo}&per_page=${pageSize}`;
    const sorting = `ordering=${sortDirection === 'descending' ? `-${sort}` : sort}`;

    const sellerID = sellerIDSelector();
    const url =
      AppConfig.BASE_URL_API +
      `sellers/${sellerID}/merchants-database?${pagination}&${sorting}${queryFilters}`;
    dispatch(setLoadingDatabase(!enableLoader));
    if (enableLoader) {
      await dispatch(fetchSellerDatabase(true));
    }
    const res = await Axios.get(url);
    if (res.data) {
      const { results, count, per_page, current_page, total_pages } = res.data;
      dispatch(fetchSellerDatabaseSuccess(results));
      dispatch(fetchSellerDatabasePageNo(current_page));
      dispatch(fetchSellerDatabasePageSize(per_page));
      dispatch(fetchSellerDatabasePageCount(total_pages));
      dispatch(fetchSellerDatabaseCount(count));
      dispatch(setDatabaseSort(sort));
      dispatch(setDatabaseSortDirection(sortDirection));
      dispatch(fetchSellerDatabase(false));
      dispatch(setLoadingDatabase(false));
    }
  } catch (e) {
    dispatch(fetchSellerDatabaseError(e));
    console.log(e);
  }
};

export const setSellerDatabaseSinglePageItemsCount = (count: number) => async (dispatch: any) =>
  dispatch(fetchSellerDatabaseSingelPageItemsCount(count));

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

const parseFilters = (data: SellerDatabaseFilter[]): string => {
  const localFilters = localStorage.getItem('seller-database-filters');
  let query = '';
  let filters = data;
  if (localFilters) {
    filters = JSON.parse(localFilters);
  }
  filters.forEach(filter => {
    if (filter.type === FILTERS.FBA && filter.active) {
      query += `&${filter.type}=${filter.active}`;
    } else if (filter.type === FILTERS.FBM && filter.active) {
      query += `&${filter.type}=${filter.active}`;
    } else if (filter.type === FILTERS.INCLUDE_BRANDS && filter.values.length) {
      query += `&${filter.type}=${filter.values.join(',')}`;
    } else if (filter.type === FILTERS.LAUNCHED && filter.value) {
      query += `&${filter.type}=${filter.value}`;
    } else {
      if (filter.active) {
        const duration = filter.duration ? `&duration=${filter.duration}` : '';
        const min = filter.min ? `&${filter.type}_min=${filter.min}` : '';
        const max = filter.max ? `&${filter.type}_max=${filter.max}` : '';
        query += `${min}${max}${duration}`;
      }
    }
  });

  return query;
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

const fetchSellerDatabaseSingelPageItemsCount = (count: number) => ({
  type: SET_SELLER_DATABASE_SINGLE_PAGE_ITEMS_COUNT,
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
