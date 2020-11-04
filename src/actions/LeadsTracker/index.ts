import Axios from 'axios';
import { AppConfig } from '../../config';
import {
  SET_LEADS,
  SET_FETCHING_KPI,
  SET_SORT,
  SET_SORT_DIRECTION,
  SET_PAGE_NO,
  SET_PAGE_SIZE,
  SET_PERIOD,
  SET_TOTAL_RECORDS,
  TOTAL_PAGES,
  FETCH_FILTERS,
  FETCH_FILTERS_SUCCESS,
  LOADING_DATA,
  SET_LEADS_TRACKER_SINGLE_PAGE_ITEMS_COUNT,
} from '../../constants/LeadsTracker';

import { sellerIDSelector } from '../../selectors/Seller';
import { getPageSize } from '../../selectors/LeadsTracker';

export interface FetchLeadsFilters {
  period: number;
  page: number;
  per_page: number;
  sort: string;
  sort_direction: string;
  query: string;
  loading: boolean;
}
export const fetchLeadsKPIs = (payload: FetchLeadsFilters) => async (
  dispatch: any,
  getState: () => any
) => {
  dispatch(setLoadingData(true));
  const saved = localStorage.getItem('leads-tracker:search');
  let search: any = '';
  if (!saved) {
    const filtersResponse = await getFilters({ query: 'column_value=search&column_type=search' });
    search =
      filtersResponse && filtersResponse.data
        ? filtersResponse.data.map((s: any) => s.value).join(',')
        : '';
  }

  const {
    period = 30,
    page = 1,
    per_page = 10,
    sort = 'price',
    sort_direction = 'asc',
    query = `searches=${search}`,
    loading = true,
  } = payload;

  dispatch(setFetchingKpi(loading));
  const sellerID = sellerIDSelector();
  const searches = new URLSearchParams(query).get('searches');

  const response = await Axios.get(
    AppConfig.BASE_URL_API +
      // eslint-disable-next-line max-len
      `sellers/${sellerID}/leads-tracker-products?period=${period}&page=${page}&per_page=${per_page}&sort=${sort}&sort_direction=${sort_direction}&${query.replace(
        `searches=${searches}`,
        ''
      )}`,
    {
      params: {
        searches,
      },
    }
  );
  dispatch(setPageSize(per_page));

  if (response.data) {
    const perPage = getPageSize(getState());
    dispatch(setLeads(response.data));
    dispatch(setSort(sort));
    dispatch(setSortDirection(sort_direction));
    dispatch(setPageNo(perPage !== per_page ? 1 : page));
    dispatch(setPeriod(period));
    dispatch(setTotalRecords(response.data.count));
    dispatch(setTotalPages(response.data.num_pages));
  }
  dispatch(setFetchingKpi(false));
  dispatch(setLoadingData(false));
};

export const fetchFilters = (payload: any) => async (dispatch: any) => {
  dispatch(setFetchingFilters(true));
  const response = await getFilters(payload);
  if (response.data) {
    dispatch(setFilters(response.data));
  }
  dispatch(setFetchingFilters(false));
};

const getFilters = async (payload: any) => {
  const { period = 30, page = 1, per_page = 50, query = '' } = payload;
  const sellerID = sellerIDSelector();
  const response = await Axios.get(
    AppConfig.BASE_URL_API +
      // eslint-disable-next-line max-len
      `sellers/${sellerID}/leads-tracker-products?period=${period}&page=${page}&per_page=${per_page}&${query}`
  );

  return response;
};

export const setFetchingKpi = (isFetching: boolean) => ({
  type: SET_FETCHING_KPI,
  payload: isFetching,
});

export const setFetchingFilters = (isFetching: boolean) => ({
  type: FETCH_FILTERS_SUCCESS,
  payload: isFetching,
});

export const setLeads = (data: any) => ({
  type: SET_LEADS,
  payload: data,
});

export const setSort = (sort: string) => ({
  type: SET_SORT,
  payload: sort,
});

export const setSortDirection = (sortDirection: string) => ({
  type: SET_SORT_DIRECTION,
  payload: sortDirection,
});

export const setPageNo = (pageNo: any) => ({
  type: SET_PAGE_NO,
  payload: pageNo,
});

export const setPageSize = (pageSize: any) => ({
  type: SET_PAGE_SIZE,
  payload: pageSize,
});

export const setPeriod = (period: number) => ({
  type: SET_PERIOD,
  payload: period,
});

export const setTotalRecords = (totalRecords: number) => ({
  type: SET_TOTAL_RECORDS,
  payload: totalRecords,
});

export const setTotalPages = (totalPages: number) => ({
  type: TOTAL_PAGES,
  payload: totalPages,
});

export const setFilters = (data: any) => ({
  type: FETCH_FILTERS,
  payload: data,
});

export const setLoadingData = (loading: boolean) => ({
  type: LOADING_DATA,
  payload: loading,
});

export const setLeadsTrackerSinglePageItemsCount = (itemsCount: number) => ({
  type: SET_LEADS_TRACKER_SINGLE_PAGE_ITEMS_COUNT,
  payload: itemsCount,
});
