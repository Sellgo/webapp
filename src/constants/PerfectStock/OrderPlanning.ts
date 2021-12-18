export const actionTypes = {
  IS_LOADING_INVENTORY_TABLE_RESULTS: 'IS_LOADING_INVENTORY_TABLE_RESULTS',
  SET_INVENTORY_TABLE_RESULTS: 'SET_INVENTORY_TABLE_RESULTS',
  SET_DATE_RANGE: 'SET_DATE_RANGE',
  SET_TIME_SETTING: 'SET_TIME_SETTING',
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
