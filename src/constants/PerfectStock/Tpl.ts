import { TplVendor } from '../../interfaces/PerfectStock/Tpl';

/* All action types */
export const actionTypes = {
  IS_LOADING_TPL_VENDORS: 'IS_LOADING_TPL_VENDORS',
  SET_TPL_VENDORS: 'SET_TPL_VENDORS',
  SET_TPL_ACTIVE_VENDOR: 'SET_TPL_ACTIVE_VENDOR',
  IS_LOADING_TPL_SKU_DATA: 'IS_LOADING_TPL_SKU_DATA',
  SET_TPL_SKU_DATA: 'SET_TPL_SKU_DATA',
};

export const DEFAULT_NEW_TPL_VENDOR: TplVendor = {
  id: 0,
  name: 'New Vendor',
  status: '',
  marketplace_id: '',
  account_number: '',
  address: '',
  city: '',
  state: '',
  zip_code: null,
  country: '',
  monthly_cost_q1: null,
  monthly_cost_q2: null,
  monthly_cost_q3: null,
  monthly_cost_q4: null,
  isNew: true,
};

export const TPL_STATUSES = [
  {
    key: 'Active',
    text: 'Active',
    value: 'active',
  },
  {
    key: 'Inactive',
    text: 'Inactive',
    value: 'inactive',
  },
];

export const SEND_IN_INTERVALS = [
  {
    key: '1',
    value: '1',
    text: 'Daily',
  },
  {
    key: '4',
    value: '4',
    text: 'Twice a week',
  },
  {
    key: '7',
    value: '7',
    text: 'Weekly',
  },
  {
    key: '14',
    value: '14',
    text: 'Biweekly',
  },
  {
    key: '30',
    value: '30',
    text: 'Monthly',
  },
];

export const TIME_SETTING = {
  DAY: 'month',
  WEEK: 'year',
};

export const CREATE_STREAMLINE_STATUS = {
  SELECT_REPLENISHMENT_TYPE: 'SELECT_REPLENISHMENT_TYPE',
  SELECT_START_DATE: 'SELECT_START_DATE',
  SELECT_START_END_DATE: 'SELECT_START_END_DATE',
  SELECT_FBA_REPLENISHMENT_TEMPLATE: 'SELECT_FBA_REPLENISHMENT_TEMPLATE',
  SELECT_SKUS: 'SELECT_SKUS',
  SELECT_SHIPMENT_TEMPLATE: 'SELECT_SHIPMENT_TEMPLATE',
  SELECT_QUANTITY: 'SELECT_QUANTITY',
};

export const CREATE_SAMRTLINE_FLOW = {
  SINGLE_TRANSFER: [
    CREATE_STREAMLINE_STATUS.SELECT_REPLENISHMENT_TYPE,
    CREATE_STREAMLINE_STATUS.SELECT_START_DATE,
    CREATE_STREAMLINE_STATUS.SELECT_FBA_REPLENISHMENT_TEMPLATE,
    CREATE_STREAMLINE_STATUS.SELECT_SKUS,
    CREATE_STREAMLINE_STATUS.SELECT_SHIPMENT_TEMPLATE,
    CREATE_STREAMLINE_STATUS.SELECT_QUANTITY,
  ],
  SMART_STREAMLINE_MULTIPLE: [
    CREATE_STREAMLINE_STATUS.SELECT_REPLENISHMENT_TYPE,
    CREATE_STREAMLINE_STATUS.SELECT_START_END_DATE,
    CREATE_STREAMLINE_STATUS.SELECT_FBA_REPLENISHMENT_TEMPLATE,
    CREATE_STREAMLINE_STATUS.SELECT_SKUS,
    CREATE_STREAMLINE_STATUS.SELECT_SHIPMENT_TEMPLATE,
    CREATE_STREAMLINE_STATUS.SELECT_QUANTITY,
  ],
};

export const REPLENISMENT_FULFILLMENTS = {
  amz: 'Standard Fulfillment by Amazon',
  blank_box: 'Blank Box',
  mix: 'Mixture of both',
  asdas: 'Mixture of both',
};
