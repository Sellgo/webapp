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
} from '../../constants/SellerDatabase';
import { databaseSort, databaseSortDirection } from '../../selectors/SellerDatabase';

export interface SellerDatabasePayload {
  pageNo?: number;
  pageSize?: number;
  enableLoader?: boolean;
  sort?: string;
  sortDirection?: string;
}

export const fetchSellersDatabase = (payload: SellerDatabasePayload) => async (
  dispatch: any,
  getState: any
) => {
  try {
    const defaultSort = databaseSort(getState());
    const defaultSortDirection = databaseSortDirection(getState());

    const {
      pageNo = 1,
      pageSize = 50,
      enableLoader = true,
      sort = defaultSort,
      sortDirection = defaultSortDirection,
    } = payload;
    const pagination = `page=${pageNo}&per_page=${pageSize}`;
    const sorting = `ordering=${sortDirection === 'descending' ? `-${sort}` : sort}`;

    const sellerID = sellerIDSelector();
    const url =
      AppConfig.BASE_URL_API + `sellers/${sellerID}/merchants-database?${pagination}&${sorting}`;
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
