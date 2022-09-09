import { TplVendor } from '../../interfaces/PerfectStock/Tpl';
import { COUNTRY_DROPDOWN_LIST, STATES_DROPDOWN_LIST } from '../SellerResearch/SellerMap';
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
