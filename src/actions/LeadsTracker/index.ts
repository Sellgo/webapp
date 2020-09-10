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
  FETCH_FILE_SEARCH,
  FETCH_FILE_SEARCH_SUCCESS,
} from '../../constants/LeadsTracker';
export interface FetchLeadsFilters {
  period: number;
  page: number;
  per_page: number;
  sort: string;
  sort_direction: string;
  supplierID: string;
  query: string;
  sorting: boolean;
}
export const fetchLeadsKPIs = (payload: FetchLeadsFilters) => async (dispatch: any) => {
  // eslint-disable-next-line max-len
  const {
    period = 30,
    page = 1,
    per_page = 10,
    sort = 'price',
    sort_direction = 'asc',
    supplierID = '',
    query = '',
    sorting = false,
  } = payload;
  if (!sorting) {
    dispatch(setFetchingKpi(true));
  }

  const response = await Axios.get(
    AppConfig.BASE_URL_API +
      // eslint-disable-next-line max-len
      `sellers/${supplierID}/leads-tracker-products?period=${period}&page=${page}&per_page=${per_page}&sort=${sort}&sort_direction=${sort_direction}&${query}`
  );

  if (response.data) {
    dispatch(setLeads(response.data));
    dispatch(setSort(sort));
    dispatch(setSortDirection(sort_direction));
    dispatch(setPageNo(page));
    dispatch(setPageSize(per_page));
    dispatch(setPeriod(period));
    dispatch(setTotalRecords(response.data.count));
    dispatch(setTotalPages(response.data.num_pages));
  }
  dispatch(setFetchingKpi(false));
};

export const fetchLeadsSearch = (payload: any) => async (dispatch: any) => {
  dispatch(setFetchingFileSearch(true));
  // eslint-disable-next-line max-len
  const { period = 30, page = 1, per_page = 50, supplierID = '' } = payload;
  const response = await Axios.get(
    AppConfig.BASE_URL_API +
      // eslint-disable-next-line max-len
      `sellers/${supplierID}/leads-tracker-products?period=${period}&page=${page}&per_page=${per_page}&column_value=search`
  );
  if (response.data) {
    dispatch(setFileSearch(response.data));
  }
  dispatch(setFetchingFileSearch(false));
};

export const setFetchingKpi = (isFetching: boolean) => ({
  type: SET_FETCHING_KPI,
  payload: isFetching,
});

export const setFetchingFileSearch = (isFetching: boolean) => ({
  type: FETCH_FILE_SEARCH_SUCCESS,
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

export const setFileSearch = (data: any) => ({
  type: FETCH_FILE_SEARCH,
  payload: data,
});
