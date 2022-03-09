import { CreateTplPayload } from '../../interfaces/PerfectStock/Tpl';

/* All action types */
export const actionTypes = {
  IS_LOADING_TPL_VENDORS: 'IS_LOADING_TPL_VENDORS',
  SET_TPL_VENDORS: 'SET_SALES_PROJECTION_RESULTS',
  SET_TPL_ACTIVE_VENDOR: 'SET_TPL_ACTIVE_VENDOR',
  IS_LOADING_TPL_SKU_DATA: 'IS_LOADING_TPL_SKU_DATA',
  SET_TPL_SKU_DATA: 'SET_TPL_SKU_DATA',
};

export const DEFAULT_NEW_TPL_SETTINGS: CreateTplPayload = {
  name: '',
  status: '',
  marketplace_id: '',
  account_number: '',
  address: '',
  city: '',
  state: '',
  zip_code: -1,
  country: '',
  monthly_cost: -1,
};
