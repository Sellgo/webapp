export const actionTypes = {
  IS_LOADING_INVENTORY_TABLE_RESULTS: 'IS_LOADING_INVENTORY_TABLE_RESULTS',
  IS_LOADING_PURCHASE_ORDERS: 'IS_LOADING_PURCHASE_ORDERS',
  SET_INVENTORY_TABLE_RESULTS: 'SET_INVENTORY_TABLE_RESULTS',
  SET_PURCHASE_ORDERS: 'SET_PURCHASE_ORDERS',
  SET_DATE_RANGE: 'SET_DATE_RANGE',
  SET_TIME_SETTING: 'SET_TIME_SETTING',
  SET_ACTIVE_PURCHASE_ORDER: 'SET_ACTIVE_PURCHASE_ORDER',
  SET_REFRESH_INVENTORY_TABLE_ID: 'SET_REFRESH_INVENTORY_TABLE_ID',
  SET_IS_FETCHING_PROGRESS_FOR_REFRESH: 'SET_IS_FETCHING_PROGRESS_FOR_REFRESH',
  SET_REFRESH_PROGRESS: 'SET_REFRESH_PROGRESS',
  SET_INVENTORY_TABLE_UPDATE_DATE: 'SET_INVENTORY_TABLE_UPDATE_DATE',
  SET_INVENTORY_TABLE_SHOW_ALL_SKUS: 'SET_INVENTORY_TABLE_SHOW_ALL_SKUS',
};

export const TIME_SETTING = {
  DAY: 'month',
  WEEK: 'year',
};

export type TimeSetting = 'month' | 'year';
export const TIME_SETTINGS_OPTIONS = [
  {
    key: 'month',
    value: 'month',
    text: 'Day',
  },
  {
    key: 'year',
    value: 'year',
    text: 'Week',
  },
];

/* Styling widths to maintain alignment of chart between gantt chart and tables */
export const UNIT_WIDTH = 48;
export const SIDE_SETTING_WIDTH = 250;
export const GANTT_ORDERS_WIDTH = 150;
export const OFFSET_TO_CHART_WIDTH =
  SIDE_SETTING_WIDTH +
  GANTT_ORDERS_WIDTH +
  18 + // Margin between side setting and gantt chart
  18; // Padding for gantt chart
