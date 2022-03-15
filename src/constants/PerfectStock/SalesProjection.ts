export const FOO = 'BAR';
/* All action types */
export const actionTypes = {
  IS_LOADING_SALES_PROJECTION_RESULTS: 'IS_LOADING_SALES_PROJECTION_RESULTS',
  SET_SALES_PROJECTION_RESULTS: 'SET_SALES_PROJECTION_RESULTS',
  SET_SALES_PROJECTION_UPDATE_DATE: 'SET_SALES_PROJECTION_UPDATE_DATE',
  SET_REFRESH_SALES_PROJECTION_ID: 'SET_REFRESH_SALES_PROJECTION_ID',
  SET_IS_FETCHING_PROGRESS_FOR_REFRESH: 'SET_IS_FETCHING_PROGRESS_FOR_REFRESH',
  SET_REFRESH_PROGRESS: 'SET_REFRESH_PROGRESS',
  SET_SALES_PROJECTION_FILTERS: 'SET_SALES_PROJECTION_FILTERS',
};

export const WEIGHT_OPTIONS = [
  {
    key: '0%',
    text: '0%',
    value: '0.00',
  },
  {
    key: '5%',
    text: '5%',
    value: '5.00',
  },
  {
    key: '10%',
    text: '10%',
    value: '10.00',
  },
  {
    key: '15%',
    text: '15%',
    value: '15.00',
  },
  {
    key: '20%',
    text: '20%',
    value: '20.00',
  },
  {
    key: '25%',
    text: '25%',
    value: '25.00',
  },
  {
    key: '30%',
    text: '30%',
    value: '30.00',
  },
  {
    key: '35%',
    text: '35%',
    value: '35.00',
  },
  {
    key: '40%',
    text: '40%',
    value: '40.00',
  },
  {
    key: '45%',
    text: '45%',
    value: '45.00',
  },
  {
    key: '50%',
    text: '50%',
    value: '50.00',
  },
  {
    key: '55%',
    text: '55%',
    value: '55.00',
  },
  {
    key: '60%',
    text: '60%',
    value: '60.00',
  },
  {
    key: '65%',
    text: '65%',
    value: '65.00',
  },
  {
    key: '70%',
    text: '70%',
    value: '70.00',
  },
  {
    key: '75%',
    text: '75%',
    value: '75.00',
  },
  {
    key: '80%',
    text: '80%',
    value: '80.00',
  },
  {
    key: '85%',
    text: '85%',
    value: '85.00',
  },
  {
    key: '90%',
    text: '90%',
    value: '90.00',
  },
  {
    key: '95%',
    text: '95%',
    value: '95.00',
  },
  {
    key: '100%',
    text: '100%',
    value: '100.00',
  },
];

export const DEFAULT_WEIGHT = {
  key: '20%',
  text: '20%',
  value: '20',
};

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
