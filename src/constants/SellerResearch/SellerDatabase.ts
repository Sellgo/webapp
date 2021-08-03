/* Actions Types */
export const actionTypes = {
  IS_LOADING_SELLER_DATABASE: 'IS_LOADING_SELLER_DATABASE',
  SET_SELLER_DATABASE_RESULTS: 'SET_SELLER_DATABASE_RESULTS',
  SET_SELLER_DATABASE_ERROR_MESSAGE: 'SET_SELLER_DATABASE_ERROR_MESSAGE',
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

/* Map the payload keys to query keys for API */
export const FILTER_QUERY_KEY_MAPPER = {
  merchantName: 'merchant_name',
  businessName: 'business_name',
  asin: 'asin',
  brands: 'brands',
  sellerIds: 'seller_ids',
  launched: 'launched',
  sellerRating: 'seller_rating',
  reviewRatings: 'review_ratings',
  numBrands: 'number_brands',
  numInventory: 'inventory_count',
  reviewCount: 'count',
  positiveReview: 'positive',
  negativeReview: 'negative',
  neutralReview: 'neutral',
};
