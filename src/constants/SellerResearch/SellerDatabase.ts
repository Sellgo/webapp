import { defaultMarketplaces } from '../../constants/Settings/index';

/* Actions Types */
export const actionTypes = {
  IS_LOADING_SELLER_DATABASE: 'IS_LOADING_SELLER_DATABASE',
  SET_SELLER_DATABASE_RESULTS: 'SET_SELLER_DATABASE_RESULTS',
  SHOW_FILTER_MESSAGE: 'SHOW_FILTER_MESSAGE',
  SET_SELLER_DATABASE_PAGINATION_INFO: 'SET_SELLER_DATABASE_PAGINATION_INFO',
};

export const INFO_FILTER_MESSAGE = `Enter at least one filter and click 'Find' to get started!`;

/* Period Durations for filters */
export const FILTER_PERIOD_DURATIONS = [
  { key: '30D', text: '30D', value: '30_days' },
  { key: '90D', text: '90D', value: '90_days' },
  { key: '365D', text: '365D', value: '12_month' },
  { key: 'All', text: 'All', value: 'lifetime' },
];

/* Revivew Filter Type Durations */
export const FILTER_REVIEW_OPTIONS = [
  { key: 'Positive', text: 'Positive', value: 'positive' },
  { key: 'Negative', text: 'Negative', value: 'negative' },
  { key: 'Neutral', text: 'Neutral', value: 'neutral' },
];

/* Launched Durations for filters */
export const FILTER_LAUNCHED_DURATIONS = [
  { label: '<1-yr', value: '<1Y' },
  { label: '>1-yr', value: '>1Y' },
  { label: 'All', value: '' },
];

/* Default include exclude filters */
export const DEFAULT_INCLUDE_EXCLUDE_FILTER = {
  include: '',
  exclude: '',
};

/* Filter Types */
export const DEFAULT_MIN_MAX_FILTER = {
  min: '',
  max: '',
};

/* Default min max with period filters */
export const DEFAULT_MIN_MAX_PERIOD_FILTER = {
  ...DEFAULT_MIN_MAX_FILTER,
  period: '30_days',
};

/* Include exclude error */
export const DEFAULT_INCLUDE_EXCLUDE_ERROR = {
  include: false,
  exclude: false,
};

export const DEFAULT_MIN_MAX_PERIOD_REVIEW = {
  ...DEFAULT_MIN_MAX_FILTER,
  period: '30_days',
  type: '',
};

/* Filter types */
export const F_TYPES = {
  TEXT: 'TEXT',
  INPUT_INCLUDE_EXCLUDE: 'INPUT_INCLUDE_EXCLUDE',
  MIN_MAX: 'MIN_MAX',
  MIN_MAX_PERIOD: 'MIN_MAX_PERIOD',
};

/* Map the payload keys to query keys for API */
export const FILTER_QUERY_KEY_MAPPER: { [key: string]: { keyName: string; type: string } } = {
  // simple
  merchantName: { keyName: 'merchant_name', type: F_TYPES.TEXT },
  businessName: { keyName: 'business_name', type: F_TYPES.TEXT },
  launched: { keyName: 'launched', type: F_TYPES.TEXT },
  asins: { keyName: 'asins', type: F_TYPES.INPUT_INCLUDE_EXCLUDE },
  brands: { keyName: 'brands', type: F_TYPES.INPUT_INCLUDE_EXCLUDE },
  sellerIds: { keyName: 'merchant_ids', type: F_TYPES.INPUT_INCLUDE_EXCLUDE },

  // min max based
  sellerRatings: { keyName: 'seller_rating', type: F_TYPES.MIN_MAX },
  reviewRatings: { keyName: 'review_ratings', type: F_TYPES.MIN_MAX },
  numBrands: { keyName: 'number_brands', type: F_TYPES.MIN_MAX },
  numInventory: { keyName: 'inventory_count', type: F_TYPES.MIN_MAX },
  salesEstimate: { keyName: 'sales_estimate', type: F_TYPES.MIN_MAX },

  // Period based
  reviewCount: { keyName: 'count', type: F_TYPES.MIN_MAX_PERIOD },
  positiveReview: { keyName: 'positive', type: F_TYPES.MIN_MAX_PERIOD },
  negativeReview: { keyName: 'negative', type: F_TYPES.MIN_MAX_PERIOD },
  neutralReview: { keyName: 'neutral', type: F_TYPES.MIN_MAX_PERIOD },
};

/* Exports data */
export const EXPORT_FORMATS = [
  { key: 'csv', value: 'csv', text: '.CSV' },
  { key: 'xlsx', value: 'xlsx', text: '.XLSX' },
];

export const EXPORT_DATA = [{ key: 'all', value: 'all', text: 'All Results' }];

export const DONT_DISABLE = ['US', 'GB'];

/* Marketplace options for seller DB */
export const SELLER_DB_MARKETPLACE = defaultMarketplaces.map((marketplace: any) => {
  return {
    text: marketplace.name,
    code: marketplace.code,
    key: marketplace.code,
    value: marketplace.id,
    disabled: !DONT_DISABLE.includes(marketplace.code),
  };
});

/* Default US Marketplace */
export const DEFAULT_US_MARKET = {
  text: 'United States',
  code: 'US',
  value: 'ATVPDKIKX0DER',
  disabled: false,
  key: 'US',
};
