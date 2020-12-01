export const SET_LEADS = 'SET_LEADS';
export const SET_FETCHING_KPI = 'SET_FETCHING_KPI';
export const SET_PAGE_NO = 'SET_PAGE_NO';
export const SET_PAGE_SIZE = 'SET_PAGE_SIZE';
export const SET_PERIOD = 'SET_PERIOD';
export const SET_SORT = 'SET_SORT';
export const SET_SORT_DIRECTION = 'SET_SORT_DIRECTION';
export const SET_TOTAL_RECORDS = 'SET_TOTAL_RECORDS';
export const TOTAL_PAGES = 'TOTAL_PAGES';
export const SET_FILTERS = 'SET_FILTERS';
export const FETCH_FILTERS = 'FETCH_FILTERS';
export const FETCH_FILTERS_SUCCESS = 'FETCH_FILTERS_SUCCESS';
export const LOADING_DATA = 'LOADING_DATA';
export const SET_LEADS_TRACKER_SINGLE_PAGE_ITEMS_COUNT =
  'SET_LEADS_TRACKER_SINGLE_PAGE_ITEMS_COUNT';

export const DEFAULT_PERIOD = 1;

export const filterPeriods = {
  label: 'Period Reference',
  dataKey: 'period-reference',
  radio: true,
  data: [
    {
      label: '1D',
      dataKey: '1day',
      value: 1,
    },
    {
      label: '3D',
      dataKey: '3day',
      value: 3,
    },
    {
      label: '7D',
      dataKey: 'week',
      value: 7,
    },
    {
      label: '14D',
      dataKey: '2weeks',
      value: 14,
    },
    {
      label: '30D',
      dataKey: '1-Month',
      value: 30,
    },
    {
      label: '90D',
      dataKey: '3-Month',
      value: 90,
    },
  ],
};
