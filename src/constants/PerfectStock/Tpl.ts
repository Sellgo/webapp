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
