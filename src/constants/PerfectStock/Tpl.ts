import { TplInbound, TplVendor } from '../../interfaces/PerfectStock/Tpl';
import { COUNTRY_DROPDOWN_LIST, STATES_DROPDOWN_LIST } from '../SellerResearch/SellerMap';
/* All action types */
export const actionTypes = {
  IS_LOADING_TPL_VENDORS: 'IS_LOADING_TPL_VENDORS',
  SET_TPL_VENDORS: 'SET_TPL_VENDORS',
  SET_TPL_ACTIVE_VENDOR: 'SET_TPL_ACTIVE_VENDOR',
  IS_LOADING_TPL_SKU_DATA: 'IS_LOADING_TPL_SKU_DATA',
  SET_TPL_SKU_DATA: 'SET_TPL_SKU_DATA',
  IS_LOADING_TPL_INBOUNDS: 'IS_LOADING_TPL_INBOUNDS',
  SET_TPL_INBOUNDS: 'SET_TPL_INBOUNDS',
  SET_ACTIVE_TPL_INBOUND: 'SET_ACTIVE_TPL_INBOUND',
  SET_DATE_RANGE: 'SET_DATE_RANGE',
  SET_TIME_SETTING: 'SET_TIME_SETTING',
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

export const TPL_META_SETTINGS_FORM = {
  formInputs: [
    {
      formRow: [
        {
          id: 'status',
          label: 'STATUS*',
          placeholder: 'STATUS',
          type: 'select',
          disabled: false,
          options: TPL_STATUSES,
          width: 120,
        },
        {
          id: 'marketplace_id',
          label: 'MARKETPLACE*',
          placeholder: 'Market place',
          type: 'marketPlace',
          disabled: true,
          width: 200,
        },
        {
          id: 'account_number',
          label: 'ACCOUNT NUMBER',
          placeholder: 'Account Number',
          type: 'test',
          disabled: false,
          width: 200,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'address',
          label: 'ADDRESS*',
          placeholder: 'Address',
          type: 'text',
          disabled: false,
          width: 760,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'city',
          label: 'CITY*',
          placeholder: 'City',
          type: 'text',
          disabled: false,
          width: 200,
        },
        {
          id: 'state',
          label: 'STATE*',
          placeholder: 'State',
          type: 'select',
          disabled: false,
          options: STATES_DROPDOWN_LIST,
          width: 120,
        },
        {
          id: 'zip_code',
          label: 'ZIP*',
          placeholder: 'Zip Code',
          type: 'text',
          disabled: false,
          isNumber: true,
          isPositiveOnly: true,
          width: 120,
        },
        {
          id: 'country',
          label: 'COUNTRY*',
          placeholder: 'Country',
          type: 'select',
          disabled: false,
          options: COUNTRY_DROPDOWN_LIST,
          width: 200,
        },
      ],
    },
  ],
};

export const TPL_MONTHLY_STORAGE_COST_FORM = {
  formInputs: [
    {
      formRow: [
        {
          id: 'monthly_cost_q1',
          label: '1st Quarter*',
          placeholder: 'Q1',
          isNumber: true,
          isPositiveOnly: true,
          allow5Decimal: true,
          width: 110,
          showDollar: true,
        },
        {
          id: 'monthly_cost_q2',
          label: '2nd Quarter*',
          placeholder: 'Q2',
          isNumber: true,
          isPositiveOnly: true,
          allow5Decimal: true,
          width: 110,
          showDollar: true,
        },
        {
          id: 'monthly_cost_q3',
          label: '3rd Quarter*',
          placeholder: 'Q3',
          isNumber: true,
          isPositiveOnly: true,
          allow5Decimal: true,
          width: 110,
          showDollar: true,
        },
        {
          id: 'monthly_cost_q4',
          label: '4th Quarter*',
          placeholder: 'Q4',
          isNumber: true,
          isPositiveOnly: true,
          allow5Decimal: true,
          width: 110,
          showDollar: true,
        },
      ],
    },
  ],
};

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
  CREATE_AUTOMATE_DRAFT: 'CREATE_AUTOMATE_DRAFT',
  DRAFT_SUMMARY: 'DRAFT_SUMMARY',
};

export const CREATE_SAMRTLINE_FLOW = {
  SINGLE_TRANSFER: [
    CREATE_STREAMLINE_STATUS.SELECT_REPLENISHMENT_TYPE,
    CREATE_STREAMLINE_STATUS.SELECT_START_DATE,
    CREATE_STREAMLINE_STATUS.SELECT_FBA_REPLENISHMENT_TEMPLATE,
    CREATE_STREAMLINE_STATUS.SELECT_SKUS,
    CREATE_STREAMLINE_STATUS.SELECT_SHIPMENT_TEMPLATE,
    CREATE_STREAMLINE_STATUS.SELECT_QUANTITY,
    CREATE_STREAMLINE_STATUS.CREATE_AUTOMATE_DRAFT,
    CREATE_STREAMLINE_STATUS.DRAFT_SUMMARY,
  ],
  SMART_STREAMLINE_MULTIPLE: [
    CREATE_STREAMLINE_STATUS.SELECT_REPLENISHMENT_TYPE,
    CREATE_STREAMLINE_STATUS.SELECT_START_END_DATE,
    CREATE_STREAMLINE_STATUS.SELECT_FBA_REPLENISHMENT_TEMPLATE,
    CREATE_STREAMLINE_STATUS.SELECT_SKUS,
    CREATE_STREAMLINE_STATUS.SELECT_SHIPMENT_TEMPLATE,
    CREATE_STREAMLINE_STATUS.SELECT_QUANTITY,
    CREATE_STREAMLINE_STATUS.CREATE_AUTOMATE_DRAFT,
    CREATE_STREAMLINE_STATUS.DRAFT_SUMMARY,
  ],
};

export const REPLENISMENT_FULFILLMENTS = {
  amz: 'Standard Fulfillment by Amazon',
  blank_box: 'Blank Box',
  mix: 'Mixture of both',
  asdas: 'Mixture of both',
};

export const EMPTY_TPL_INBOUND: TplInbound = {
  id: -1,
  date: '',
  name: '',
  status: '',
  is_included: false,
  lead_time: -1,
};
