/* Actions Types */
export const actionTypes = {
  IS_LOADING_SELLER_DATABASE: 'IS_LOADING_SELLER_DATABASE',
  SET_SELLER_DATABASE_RESULTS: 'SET_SELLER_DATABASE_RESULTS',
  SHOW_FILTER_MESSAGE: 'SHOW_FILTER_MESSAGE',
  SET_SELLER_DATABASE_PAGINATION_INFO: 'SET_SELLER_DATABASE_PAGINATION_INFO',
};

/* Period Durations for filters */
export const FILTER_PERIOD_DURATIONS = [
  { key: '30D', text: '30D', value: '30_days' },
  { key: '90D', text: '90D', value: '90_days' },
  { key: '365D', text: '365D', value: '12_month' },
  { key: 'All', text: 'All', value: 'lifetime' },
];

/* Launched Durations for filters */
export const FILTER_LAUNCHED_DURATIONS = [
  { label: '<1-yr', value: '<1-yr' },
  { label: '>1-yr', value: '>1-yr' },
  { label: 'All', value: '' },
];

/* Filter Types */
export const DEFAULT_MIN_MAX_FILTER = {
  min: '',
  max: '',
};

export const DEFAULT_MIN_MAX_PERIOD_FILTER = {
  ...DEFAULT_MIN_MAX_FILTER,
  period: '30_days',
};

export const DEFAULT_INCLUDE_EXCLUDE_FILTER = {
  include: '',
  exclude: '',
};

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
  asins: { keyName: 'asin', type: F_TYPES.INPUT_INCLUDE_EXCLUDE },
  brands: { keyName: 'brands', type: F_TYPES.INPUT_INCLUDE_EXCLUDE },
  sellerIds: { keyName: 'seller_ids', type: F_TYPES.INPUT_INCLUDE_EXCLUDE },

  // min max based
  sellerRatings: { keyName: 'seller_rating', type: F_TYPES.MIN_MAX },
  reviewRatings: { keyName: 'review_ratings', type: F_TYPES.MIN_MAX },
  numBrands: { keyName: 'number_brands', type: F_TYPES.MIN_MAX },
  numInventory: { keyName: 'inventory_count', type: F_TYPES.MIN_MAX },

  // Period based
  reviewCount: { keyName: 'count', type: F_TYPES.MIN_MAX_PERIOD },
  positiveReview: { keyName: 'positive', type: F_TYPES.MIN_MAX_PERIOD },
  negativeReview: { keyName: 'negative', type: F_TYPES.MIN_MAX_PERIOD },
  neutralReview: { keyName: 'neutral', type: F_TYPES.MIN_MAX_PERIOD },
};
