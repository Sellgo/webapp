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
export const SET_MARKETPLACE = 'SET_MARKETPLACE';

export const FILTERS = {
  INVENTORY: 'inventory_count',
  SELLER_RATINGS: 'seller_rating',
  BRAND: 'number_brands',
  REVIEW_RATINGS: 'review_ratings',
  TOTAL_SALES: 'total_sales',
  REVENUE: 'revenue',
  REVIEW_COUNT: 'count',
  POSITIVE_REVIEW: 'positive',
  NEUTRAL_REVIEW: 'neutral',
  NEGATIVE_REVIEW: 'negative',
  INCLUDE_BRANDS: 'brands',
  FBA: 'fba',
  FBM: 'fbm',
  LAUNCHED: 'launched',
};

export const DURATIONS = [
  { key: '30D', text: '30D', value: '30_days' },
  { key: '90D', text: '90D', value: '90_days' },
  { key: '365D', text: '365D', value: '12_month' },
];

export const SEARCH_TYPE = {
  ASIN: 'ASIN',
  SELLER_ID: 'SELLER_ID',
  SELLER_NAME: 'SELLER_NAME',
  AMAZON_LINK: 'AMAZON_LINK',
};

export const SEARCH_TYPES = [
  {
    key: 'ASIN',
    text: 'ASIN',
    value: 'ASIN',
  },
  {
    key: 'Seller ID',
    text: 'Seller ID',
    value: 'SELLER_ID',
  },
  {
    key: 'Seller Name',
    text: 'Seller Name',
    value: 'SELLER_NAME',
  },
  {
    key: 'Amazon Links',
    text: 'Amazon Links',
    value: 'AMAZON_LINK',
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
    type: FILTERS.REVIEW_RATINGS,
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
    type: FILTERS.REVIEW_COUNT,
    min: 0,
    max: 0,
    active: false,
    duration: '30_days',
  },
  {
    type: FILTERS.POSITIVE_REVIEW,
    min: 0,
    max: 0,
    active: false,
    duration: '30_days',
  },
  {
    type: FILTERS.NEUTRAL_REVIEW,
    min: 0,
    max: 0,
    active: false,
    duration: '30_days',
  },
  {
    type: FILTERS.NEGATIVE_REVIEW,
    min: 0,
    max: 0,
    active: false,
    duration: '30_days',
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
  {
    name: 'Alabama',
    code: 'AL',
  },
  {
    name: 'Alaska',
    code: 'AK',
  },
  {
    name: 'American Samoa',
    code: 'AS',
  },
  {
    name: 'Arizona',
    code: 'AZ',
  },
  {
    name: 'Arkansas',
    code: 'AR',
  },
  {
    name: 'California',
    code: 'CA',
  },
  {
    name: 'Colorado',
    code: 'CO',
  },
  {
    name: 'Connecticut',
    code: 'CT',
  },
  {
    name: 'Delaware',
    code: 'DE',
  },
  {
    name: 'District Of Columbia',
    code: 'DC',
  },
  {
    name: 'Federated States Of Micronesia',
    code: 'FM',
  },
  {
    name: 'Florida',
    code: 'FL',
  },
  {
    name: 'Georgia',
    code: 'GA',
  },
  {
    name: 'Guam',
    code: 'GU',
  },
  {
    name: 'Hawaii',
    code: 'HI',
  },
  {
    name: 'Idaho',
    code: 'ID',
  },
  {
    name: 'Illinois',
    code: 'IL',
  },
  {
    name: 'Indiana',
    code: 'IN',
  },
  {
    name: 'Iowa',
    code: 'IA',
  },
  {
    name: 'Kansas',
    code: 'KS',
  },
  {
    name: 'Kentucky',
    code: 'KY',
  },
  {
    name: 'Louisiana',
    code: 'LA',
  },
  {
    name: 'Maine',
    code: 'ME',
  },
  {
    name: 'Marshall Islands',
    code: 'MH',
  },
  {
    name: 'Maryland',
    code: 'MD',
  },
  {
    name: 'Massachusetts',
    code: 'MA',
  },
  {
    name: 'Michigan',
    code: 'MI',
  },
  {
    name: 'Minnesota',
    code: 'MN',
  },
  {
    name: 'Mississippi',
    code: 'MS',
  },
  {
    name: 'Missouri',
    code: 'MO',
  },
  {
    name: 'Montana',
    code: 'MT',
  },
  {
    name: 'Nebraska',
    code: 'NE',
  },
  {
    name: 'Nevada',
    code: 'NV',
  },
  {
    name: 'New Hampshire',
    code: 'NH',
  },
  {
    name: 'New Jersey',
    code: 'NJ',
  },
  {
    name: 'New Mexico',
    code: 'NM',
  },
  {
    name: 'New York',
    code: 'NY',
  },
  {
    name: 'North Carolina',
    code: 'NC',
  },
  {
    name: 'North Dakota',
    code: 'ND',
  },
  {
    name: 'Northern Mariana Islands',
    code: 'MP',
  },
  {
    name: 'Ohio',
    code: 'OH',
  },
  {
    name: 'Oklahoma',
    code: 'OK',
  },
  {
    name: 'Oregon',
    code: 'OR',
  },
  {
    name: 'Palau',
    code: 'PW',
  },
  {
    name: 'Pennsylvania',
    code: 'PA',
  },
  {
    name: 'Puerto Rico',
    code: 'PR',
  },
  {
    name: 'Rhode Island',
    code: 'RI',
  },
  {
    name: 'South Carolina',
    code: 'SC',
  },
  {
    name: 'South Dakota',
    code: 'SD',
  },
  {
    name: 'Tennessee',
    code: 'TN',
  },
  {
    name: 'Texas',
    code: 'TX',
  },
  {
    name: 'Utah',
    code: 'UT',
  },
  {
    name: 'Vermont',
    code: 'VT',
  },
  {
    name: 'Virgin Islands',
    code: 'VI',
  },
  {
    name: 'Virginia',
    code: 'VA',
  },
  {
    name: 'Washington',
    code: 'WA',
  },
  {
    name: 'West Virginia',
    code: 'WV',
  },
  {
    name: 'Wisconsin',
    code: 'WI',
  },
  {
    name: 'Wyoming',
    code: 'WY',
  },
];
