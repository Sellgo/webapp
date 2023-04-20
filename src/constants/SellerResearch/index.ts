/* Routes on Seller Research */
export const SELLER_RESEARCH_PAGES = ['/abm/database', '/abm/map', '/abm/collection'];

/* Seller Research Product Details */
export const SELLER_RESEARCH_PRODUCT_DETAILS = [
  {
    name: 'Seller Database',
    desc: 'Easily identify Amazon sellers by category, brand, and much more.',
  },
  { name: 'Seller Map', desc: 'Locate and Scout Millions of Amazon Sellers in seconds.' },
  { name: 'Collection', desc: 'Unlocked Companies and Decision Makers' },
];

/* ======================================================= */
/* ========= TYPES FOR FILTERS ========================*/
/* ======================================================= */
export const F_TYPES = {
  TEXT: 'TEXT',
  INPUT_INCLUDE_EXCLUDE: 'INPUT_INCLUDE_EXCLUDE',
  MIN_MAX: 'MIN_MAX',
  MIN_MAX_PERIOD: 'MIN_MAX_PERIOD',
  MIN_MAX_PERIOD_REVIEW: 'MIN_MAX_PERIOD_REVIEW',
  GROWTH_PERCENT_FILTER: 'GROWTH_PERCENT_FILTER',
  GROWTH_COUNT_FILTER: 'GROWTH_COUNT_FILTER',
  MARKETPLACE: 'MARKETPLACE',
  COUNTRY: 'COUNTRY',
  STATE: 'STATE',
  CATEGORIES: 'CATEGORIES',
  SORT: 'SORT',
  SORT_DIR: 'SORT_DIR',
};

/* ======================================================= */
/* ========= COMMON FILTER OPTIONS ========================*/
/* ======================================================= */

/* Review Type Selection List */
export const FILTER_REVIEW_OPTIONS = [
  { key: 'Positive', text: 'Positive', value: 'positive' },
  { key: 'Negative', text: 'Negative', value: 'negative' },
  { key: 'Neutral', text: 'Neutral', value: 'neutral' },
];

/* Review Period Selection List */
export const REVIEW_FILTER_PERIOD_DURATIONS = [
  { key: '30D', text: '30D', value: '30_days' },
  { key: '90D', text: '90D', value: '90_days' },
  { key: '365D', text: '365D', value: '12_month' },
  { key: 'All', text: 'All', value: 'lifetime' },
];

/* Growth Period Selection List */
export const GROWTH_FILTER_PERIOD_DURATIONS = [
  { key: '30D', text: '30D', value: 'month' },
  { key: '90D', text: '90D', value: 'L90D' },
  { key: '365D', text: '365D', value: 'L180D' },
  { key: 'All', text: 'All', value: 'year' },
];

/* Launched Durations for filters */
export const LAUNCHED_FILTER_OPTIONS = [
  { label: 'Longer than a year', value: '>1Y' },
  { label: 'Less than a year', value: '90D-1Y' },
];

/* Launched Durations for filters */
export const FBA_PERCENT_FILTER_OPTIONS = [
  { label: 'Less than 25%', value: { max: 25 } },
  { label: '25 - 50%', value: { min: 25, max: 50 } },
  { label: '50 - 75%', value: { min: 50, max: 75 } },
  { label: '75 - 100%', value: { min: 75, max: 100 } },
];

/* Seller Type filter options */
export const SELLER_TYPE_FILTER_OPTIONS = [
  { label: 'Private Label Seller', value: 'private_label' },
  { label: 'Wholesale Reseller', value: 'wholesale' },
];

/* US Marketplace Information */
export const DEFAULT_US_MARKET = {
  text: 'United States',
  code: 'US',
  value: 'ATVPDKIKX0DER',
  disabled: false,
  key: 'US',
  currency: '$',
};

/* ======================================================= */
/* ========= DEFULT FILTER RESETS ========================*/
/* ======================================================= */

/* Reset for text filter */
export const DEFAULT_TEXT_FILTER = '';

/* Reset for default sort */
export const DEFAULT_SORT = 'seller_id';
export const DEFAULT_SORT_DIR = 'asc';

/* Reset for include exclude filter */
export const DEFAULT_INCLUDE_EXCLUDE_FILTER = {
  include: '',
  exclude: '',
};

/* Reset min max filters */
export const DEFAULT_MIN_MAX_FILTER = {
  min: '',
  max: '',
};

/* Reset for min max with period filter */
export const DEFAULT_MIN_MAX_PERIOD_FILTER = {
  ...DEFAULT_MIN_MAX_FILTER,
  period: '30_days',
};

/* Reset for min max with period filter (GROWTH) */
export const DEFAULT_MIN_MAX_PERIOD_FILTER_GROWTH = {
  ...DEFAULT_MIN_MAX_FILTER,
  period: 'month',
};

/* Reset for min max period and review filter */
export const DEFAULT_MIN_MAX_PERIOD_REVIEW = {
  ...DEFAULT_MIN_MAX_FILTER,
  period: '30_days',
  type: 'positive',
};

/* Generic function to get filter details */
export const parseSellerMapFilterData = (allFilters: any, key: string) => {
  return allFilters.find((f: any) => f.keyName === key);
};
