export const FETCH_SELLER_DATABASE = 'FETCH_SELLER_DATABASE';
export const FETCH_SELLER_DATABASE_SUCCESS = 'FETCH_SELLER_DATABASE_SUCCESS';
export const FETCH_SELLER_DATABASE_ERROR = 'FETCH_SELLER_DATABASE_ERROR';
export const LOADING_DATABASE = 'LOADING_DATABASE';

export const SET_SELLER_DATABASE_PAGE_NO = 'SET_SELLER_DATABASE_PAGE_NO';
export const SET_SELLER_DATABASE_PAGE_SIZE = 'SET_SELLER_DATABASE_PAGE_SIZE';
export const SET_SELLER_DATABASE_PAGE_COUNT = 'SET_SELLER_DATABASE_PAGE_COUNT';
export const SET_SELLER_DATABASE_COUNT = 'SET_SELLER_DATABASE_COUNT';
export const SET_SELLER_DATABASE_SINGLE_PAGE_ITEMS_COUNT =
  'SET_SELLER_DATABASE_SINGLE_PAGE_ITEMS_COUNT';

export const SET_SELLER_DATABASE_SORT = 'SET_SELLER_DATABASE_SORT';
export const SET_SELLER_DATABASE_SORT_DIRECTION = 'SET_SELLER_DATABASE_SORT_DIRECTION';
export const SET_SELLER_DATABASE_FILTERS = 'SET_SELLER_DATABASE_FILTERS';

export const FILTERS = {
  INVENTORY: 'inventory',
  SELLER_RATINGS: 'seller_ratings',
  BRAND: 'brand',
  TOTAL_SALES: 'total_sales',
  REVENUE: 'revenue',
  REVIEW_RATINGS: 'review_ratings',
  REVIEW_COUNT: 'review_count',
  POSITIVE_REVIEW: 'positive_review',
  NEUTRAL_REVIEW: 'neutral_review',
  NEGATIVE_REVIEW: 'negative_review',
  INCLUDE_BRANDS: 'include_brands',
  FBA: 'fba',
  FBM: 'fbm',
  LAUNCHED: 'launched',
};

export const DURATIONS = [
  { key: '30D', text: '30D', value: '30D' },
  { key: '90D', text: '90D', value: '90D' },
  { key: '365D', text: '365D', value: '365D' },
];

export const SEARCH_TYPES = [
  {
    key: 'ASIN',
    text: 'ASIN',
    value: 'ASIN',
  },
  {
    key: 'Seller ID',
    text: 'Seller ID',
    value: 'Seller ID',
  },
  {
    key: 'Seller Name',
    text: 'Seller Name',
    value: 'Seller Name',
  },
  {
    key: 'Amazon Links',
    text: 'Amazon Links',
    value: 'Amazon Links',
  },
];

export const defaultFilters = [
  {
    type: FILTERS.INVENTORY,
    min: 0,
    max: 0,
    active: false,
  },
  {
    type: FILTERS.SELLER_RATINGS,
    min: 0,
    max: 0,
    active: false,
  },
  {
    type: FILTERS.BRAND,
    min: 0,
    max: 0,
    active: false,
  },
  {
    type: FILTERS.TOTAL_SALES,
    min: 0,
    max: 0,
    active: false,
  },
  {
    type: FILTERS.REVENUE,
    min: 0,
    max: 0,
    active: false,
  },
  {
    type: FILTERS.REVIEW_RATINGS,
    min: 0,
    max: 0,
    active: false,
    duration: null,
  },
  {
    type: FILTERS.REVIEW_COUNT,
    min: 0,
    max: 0,
    active: false,
    duration: null,
  },
  {
    type: FILTERS.POSITIVE_REVIEW,
    min: 0,
    max: 0,
    active: false,
    duration: null,
  },
  {
    type: FILTERS.NEUTRAL_REVIEW,
    min: 0,
    max: 0,
    active: false,
    duration: null,
  },
  {
    type: FILTERS.NEGATIVE_REVIEW,
    min: 0,
    max: 0,
    active: false,
    duration: null,
  },
  {
    type: FILTERS.INCLUDE_BRANDS,
    values: [],
  },
  {
    type: FILTERS.FBA,
    active: false,
  },
  {
    type: FILTERS.FBM,
    active: false,
  },
  {
    type: FILTERS.LAUNCHED,
    value: null,
  },
];

export const STATES = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District Of Columbia',
  'Federated States Of Micronesia',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Marshall Islands',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Northern Mariana Islands',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Palau',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virgin Islands',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];
