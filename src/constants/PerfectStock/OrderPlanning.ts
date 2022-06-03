import {
  GanttChartPurchaseOrder,
  PurchaseOrder,
} from '../../interfaces/PerfectStock/OrderPlanning';
import { Column } from '../../interfaces/PerfectStock/Settings';
import { STATUS_OPTIONS, DIMENSION_UNIT_OPTIONS, WEIGHT_UNIT_OPTIONS, LEAD_TIME_OPTIONS } from './';

export const actionTypes = {
  IS_LOADING_INVENTORY_TABLE_RESULTS: 'IS_LOADING_INVENTORY_TABLE_RESULTS',
  IS_LOADING_PURCHASE_ORDERS: 'IS_LOADING_PURCHASE_ORDERS',
  SET_PURCHASE_ORDERS_LOADING_MESSAGE: 'SET_PURCHASE_ORDERS_LOADING_MESSAGE',
  SET_INVENTORY_TABLE_RESULTS: 'SET_INVENTORY_TABLE_RESULTS',
  SET_INVENTORY_TABLE_FILTERS: 'SET_INVENTORY_TABLE_FILTERS',
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
  vendorId: null,
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
  vendor_id: null,
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

export const CREATE_ORDER_STEP = {
  SELECT_ORDER_TYPE: 0,
  SELECT_OPTIMISATION_TYPE: 1,
  SELECT_ORDER_DETAILS: 2,
};

export const CREATE_ORDER_STATUS = {
  SELECT_ORDER_TYPE: 'SELECT_ORDER_TYPE',
  SELECT_OPTIMISATION_TYPE: 'SELECT_OPTIMISATION_TYPE',
  SELECT_SKUS: 'SELECT_SKUS',
  SELECT_PRIORITY_SKUS: 'SELECT_PRIORITY_SKUS',
  SELECT_INVENTORY_THRESHOLD: 'SELECT_INVENTORY_THRESHOLD',
  SELECT_TIME_INTERVAL: 'SELECT_TIME_INTERVAL',
  SELECT_LEAD_TIME: 'SELECT_LEAD_TIME',
  SELECT_START_DATE: 'SELECT_START_DATE',
  SELECT_TPL: 'SELECT_TPL',
  ORDER_CREATED: 'ORDER_CREATED',
};

export const CREATE_ORDER_FLOW = {
  SINGLE_ORDER: [
    CREATE_ORDER_STATUS.SELECT_ORDER_TYPE,
    CREATE_ORDER_STATUS.SELECT_SKUS,
    CREATE_ORDER_STATUS.SELECT_PRIORITY_SKUS,
    CREATE_ORDER_STATUS.SELECT_LEAD_TIME,
    CREATE_ORDER_STATUS.SELECT_START_DATE,
    CREATE_ORDER_STATUS.SELECT_TPL,
    CREATE_ORDER_STATUS.ORDER_CREATED,
  ],
  SMART_ORDER_MOQ: [
    CREATE_ORDER_STATUS.SELECT_ORDER_TYPE,
    CREATE_ORDER_STATUS.SELECT_OPTIMISATION_TYPE,
    CREATE_ORDER_STATUS.SELECT_SKUS,
    CREATE_ORDER_STATUS.SELECT_PRIORITY_SKUS,
    CREATE_ORDER_STATUS.SELECT_LEAD_TIME,
    CREATE_ORDER_STATUS.SELECT_START_DATE,
    CREATE_ORDER_STATUS.SELECT_TPL,
    CREATE_ORDER_STATUS.ORDER_CREATED,
  ],
  SMART_ORDER_INVENTORY: [
    CREATE_ORDER_STATUS.SELECT_ORDER_TYPE,
    CREATE_ORDER_STATUS.SELECT_OPTIMISATION_TYPE,
    CREATE_ORDER_STATUS.SELECT_SKUS,
    CREATE_ORDER_STATUS.SELECT_PRIORITY_SKUS,
    CREATE_ORDER_STATUS.SELECT_INVENTORY_THRESHOLD,
    CREATE_ORDER_STATUS.SELECT_LEAD_TIME,
    CREATE_ORDER_STATUS.SELECT_START_DATE,
    CREATE_ORDER_STATUS.SELECT_TPL,
    CREATE_ORDER_STATUS.ORDER_CREATED,
  ],
  SMART_ORDER_TIME: [
    CREATE_ORDER_STATUS.SELECT_ORDER_TYPE,
    CREATE_ORDER_STATUS.SELECT_OPTIMISATION_TYPE,
    CREATE_ORDER_STATUS.SELECT_SKUS,
    CREATE_ORDER_STATUS.SELECT_PRIORITY_SKUS,
    CREATE_ORDER_STATUS.SELECT_TIME_INTERVAL,
    CREATE_ORDER_STATUS.SELECT_LEAD_TIME,
    CREATE_ORDER_STATUS.SELECT_START_DATE,
    CREATE_ORDER_STATUS.SELECT_TPL,
    CREATE_ORDER_STATUS.ORDER_CREATED,
  ],
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

export const ACTIVE_FILTER_OPTIONS = [
  {
    key: 'Active Products',
    text: 'Active Products',
    value: 'sku_status=active',
  },
  {
    key: 'Inactive Products',
    text: 'Inactive Products',
    value: 'sku_status=inactive',
  },
  {
    key: 'Active and Inactive Products',
    text: 'Active and Inactive Products',
    value: 'null',
  },
];

export const FBA_FILTER_OPTIONS = [
  {
    key: 'FBA Products',
    text: 'FBA Products',
    value: 'fulfillment_channel=fba',
  },
  {
    key: 'FBM Products',
    text: 'FBM Products',
    value: 'fulfillment_channel=fbm',
  },
  {
    key: 'FBA and FBM Products',
    text: 'FBA and FBM Products',
    value: 'null',
  },
];

export const DEFAULT_FILTER = {
  active: 'sku_status=active',
  fba: 'fulfillment_channel=fba',
};

export const SETTINGS_OPTIONS = [
  {
    name: 'Days of Inventory',
    url: '/aistock/inventory-days-of-inventory-settings',
    disabled: false,
  },
  {
    name: 'Sku Settings',
    url: '/aistock/sku-settings',
    disabled: false,
  },
  {
    name: 'Payment Terms',
    url: '/aistock/payment-terms-settings',
    disabled: false,
  },
];

export const SKU_SETTINGS_COLUMNS: Column[] = [
  {
    width: 200,
    dataKey: 'title',
    title: 'Product Name',
    type: 'text',
    disabled: true,
    optional: true,
  },
  {
    width: 200,
    dataKey: 'asin',
    title: 'ASIN',
    type: 'text',
    disabled: true,
    optional: true,
  },
  {
    width: 200,
    dataKey: 'sku',
    title: 'Sku',
    type: 'text',
    disabled: true,
    optional: true,
  },
  {
    width: 200,
    dataKey: 'status',
    title: 'Status',
    type: 'selection',
    options: STATUS_OPTIONS,
    optional: true,
  },
  {
    width: 100,
    dataKey: 'currency',
    title: 'Currency',
    type: 'text',
    optional: true,
  },
  {
    width: 200,
    dataKey: 'moq',
    title: 'MOQ',
    type: 'number',
    optional: true,
    numberOptions: {
      isInteger: true,
    },
  },
  {
    width: 200,
    dataKey: 'length_unit',
    title: 'Length Unit',
    type: 'selection',
    options: DIMENSION_UNIT_OPTIONS,
    optional: true,
  },
  {
    width: 200,
    dataKey: 'length',
    title: 'Length',
    type: 'number',
    optional: true,
  },
  {
    width: 200,
    dataKey: 'width_unit',
    title: 'Width Unit',
    type: 'selection',
    options: DIMENSION_UNIT_OPTIONS,
    optional: true,
  },
  {
    width: 200,
    dataKey: 'width',
    title: 'Width',
    type: 'number',
    optional: true,
  },
  {
    width: 200,
    dataKey: 'height_unit',
    title: 'Height Unit',
    type: 'selection',
    options: DIMENSION_UNIT_OPTIONS,
    optional: true,
  },
  {
    width: 200,
    dataKey: 'height',
    title: 'Height',
    type: 'number',
    optional: true,
  },
  {
    width: 200,
    dataKey: 'weight_unit',
    title: 'Weight Unit',
    type: 'selection',
    options: WEIGHT_UNIT_OPTIONS,
    optional: true,
  },
  {
    width: 200,
    dataKey: 'weight',
    title: 'Weight',
    type: 'number',
    optional: true,
  },
  {
    width: 200,
    dataKey: 'package_height_unit',
    title: 'Package Height Unit',
    type: 'selection',
    options: DIMENSION_UNIT_OPTIONS,
    optional: true,
  },
  {
    width: 200,
    dataKey: 'package_height',
    title: 'Package Height',
    type: 'number',
    optional: true,
  },
  {
    width: 200,
    dataKey: 'package_length_unit',
    title: 'Package Length Unit',
    type: 'selection',
    options: DIMENSION_UNIT_OPTIONS,
    optional: true,
  },
  {
    width: 200,
    dataKey: 'package_length',
    title: 'Package Length',
    type: 'number',
    optional: true,
  },
  {
    width: 200,
    dataKey: 'package_width_unit',
    title: 'Package Width Unit',
    type: 'selection',
    options: DIMENSION_UNIT_OPTIONS,
    optional: true,
  },

  {
    width: 200,
    dataKey: 'package_width',
    title: 'Package Width',
    type: 'number',
    optional: true,
  },
  {
    width: 200,
    dataKey: 'package_weight_unit',
    title: 'Package Weight Unit',
    type: 'selection',
    options: WEIGHT_UNIT_OPTIONS,
    optional: true,
  },
  {
    width: 200,
    dataKey: 'package_weight',
    title: 'Package Weight',
    type: 'number',
    optional: true,
  },
  {
    width: 200,
    dataKey: 'carton_count',
    title: 'Carton Count',
    type: 'number',
    optional: true,
    numberOptions: {
      isInteger: true,
    },
  },
  {
    width: 200,
    dataKey: 'product_cost',
    title: 'Product Cost',
    type: 'number',
    optional: true,
  },
  {
    width: 200,
    dataKey: 'hs_code',
    title: 'HS Code',
    type: 'number',
    optional: true,
    numberOptions: {
      isInteger: true,
    },
  },
  {
    width: 200,
    dataKey: 'last_leg_cost',
    title: 'Last Leg Cost',
    type: 'number',
    optional: true,
  },
  {
    width: 200,
    dataKey: 'import_duty_rate',
    title: 'Import Duty Rate',
    type: 'number',
    optional: true,
  },
];

export const PAYMENT_TERMS_COLUMNS: Column[] = [
  {
    width: 200,
    dataKey: 'deposit_due',
    title: 'Deposit Due',
    type: 'selection',
    options: LEAD_TIME_OPTIONS,
  },
  {
    width: 200,
    dataKey: 'deposit_perc',
    title: 'Deposit %',
    type: 'number',
    append: '%',
  },
  {
    width: 200,
    dataKey: 'mid_pay_due',
    title: 'Mid Pay Due',
    type: 'selection',
    options: LEAD_TIME_OPTIONS,
  },
  {
    width: 200,
    dataKey: 'mid_pay_perc',
    title: 'Mid Pay %',
    type: 'number',
    append: '%',
  },
  {
    width: 200,
    dataKey: 'paid_full_due',
    title: 'Paid Full Due',
    type: 'selection',
    options: LEAD_TIME_OPTIONS,
  },
  {
    width: 200,
    dataKey: 'paid_full_perc',
    title: 'Paid Full %',
    type: 'number',
    append: '%',
  },
];
