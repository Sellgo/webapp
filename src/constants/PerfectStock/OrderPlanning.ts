import {
  GanttChartPurchaseOrder,
  PurchaseOrder,
} from '../../interfaces/PerfectStock/OrderPlanning';

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
  IS_LOADING_DRAFT_ORDER_INFORMATION: 'IS_LOADING_DRAFT_ORDER_INFORMATION',
  SET_DRAFT_ORDER_INFORMATION: 'SET_DRAFT_ORDER_INFORMATION',
  IS_LOADING_EXPECTED_DAYS_OF_INVENTORY: 'IS_LOADING_EXPECTED_DAYS_OF_INVENTORY',
  SET_EXPECTED_DAYS_OF_INVENTORY: 'SET_EXPECTED_DAYS_OF_INVENTORY',
  SET_ACTIVE_DRAFT_ORDER_TEMPLATE: 'SET_ACTIVE_DRAFT_ORDER_TEMPLATE',
  IS_LOADING_DRAFT_ORDER_TEMPLATES: 'IS_LOADING_DRAFT_ORDER_TEMPLATES',
  SET_DRAFT_ORDER_TEMPLATES: 'SET_DRAFT_ORDER_TEMPLATES',
};

export const EMPTY_GANTT_CHART_PURCHASE_ORDER: GanttChartPurchaseOrder = {
  id: -1,
  name: 'Show All SKUs',
  is_included: false,
  start: new Date(),
  end: new Date(),
  subTasks: [],
};

export const EMPTY_PURCHASE_ORDER: PurchaseOrder = {
  date: '',
  id: -1,
  lead_time_group: undefined,
  lead_time_group_id: 0,
  merchant_listings: [],
  number: '',
  status: '',
  is_included: false,
  purchase_order_template_id: -1,
};

export const AUTO_GENERATE_DURATION_OPTIONS = [
  {
    label: 'Future 6 months',
    value: 180,
  },
  {
    label: 'Future 12 months',
    value: 365,
  },
  {
    label: 'Future 18 months',
    value: 455,
  },
  {
    label: `I don't want to auto-generate future Draft Orders at the moment`,
    value: 0,
  },
];

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

export const CREATE_ORDER_STATUS = {
  SELECT_START_DATE: 0,
  SELECT_LEAD_TIME: 1,
  ORDER_CREATION_SUCCESS: 2,
};

/* Styling widths to maintain alignment of chart between gantt chart and tables */
export const UNIT_WIDTH = 43;
export const SIDE_SETTING_WIDTH = 250;
export const GANTT_ORDERS_WIDTH = 200;
export const OFFSET_TO_CHART_WIDTH =
  SIDE_SETTING_WIDTH +
  GANTT_ORDERS_WIDTH +
  18 + // Margin between side setting and gantt chart
  18; // Padding for gantt chart
