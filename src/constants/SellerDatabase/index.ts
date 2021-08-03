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
  // value should be paired with API query parameter name
  INVENTORY: 'inventory_count',
  SELLER_RATINGS: 'seller_rating',
  BRAND: 'number_brands',
  REVIEW_RATINGS: 'review_ratings',

  REVIEW_COUNT: 'count',
  POSITIVE_REVIEW: 'positive',
  NEUTRAL_REVIEW: 'neutral',
  NEGATIVE_REVIEW: 'negative',

  LAUNCHED: 'launched',
};

export const DURATIONS = [
  { key: '30D', text: '30D', value: '30_days' },
  { key: '90D', text: '90D', value: '90_days' },
  { key: '365D', text: '365D', value: '12_month' },
  { key: 'All', text: 'All', value: 'lifetime' },
];

export const defaultFilters = [
  {
    type: FILTERS.INVENTORY,
    min: 0,
    max: 0,
  },
  {
    type: FILTERS.SELLER_RATINGS,
    min: 0,
    max: 0,
  },
  {
    type: FILTERS.BRAND,
    min: 0,
    max: 0,
  },
  {
    type: FILTERS.REVIEW_RATINGS,
    min: 0,
    max: 0,
  },

  {
    type: FILTERS.REVIEW_COUNT,
    min: 0,
    max: 0,
    duration: '30_days',
  },
  {
    type: FILTERS.POSITIVE_REVIEW,
    min: 0,
    max: 0,
    duration: '30_days',
  },
  {
    type: FILTERS.NEUTRAL_REVIEW,
    min: 0,
    max: 0,
    duration: '30_days',
  },
  {
    type: FILTERS.NEGATIVE_REVIEW,
    min: 0,
    max: 0,
    duration: '30_days',
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

export const columnFilter = [
  {
    value: true,
    key: 'Select All',
    dataKey: 'select_all',
    visible: true,
    fixed: 'left',
  },
  {
    value: true,
    key: 'Brands',
    dataKey: 'brands',
    visible: true,
  },
  // Inventory
  {
    value: true,
    key: 'Inventory',
    dataKey: 'inventory_count',
    visible: true,
  },
  // Ratings
  {
    value: true,
    key: `Rating \nL365D`,
    dataKey: 'seller_rating',
    visible: true,
  },
  {
    value: true,
    key: `Rating% \nL365D`,
    dataKey: 'review_ratings',
    visible: true,
  },
  // Review
  {
    value: true,
    key: `Review \nL30D`,
    dataKey: 'count_30_days',
    visible: true,
  },
  {
    value: true,
    key: `Review \nL90D`,
    dataKey: 'count_90_days',
    visible: true,
  },
  {
    value: true,
    key: `Review \nL365D`,
    dataKey: 'count_12_month',
    visible: true,
  },
  {
    value: true,
    key: `Review \nLifetime`,
    dataKey: 'count_lifetime',
    visible: true,
  },
  // Negative Reviews
  {
    value: true,
    key: `Negative \n Review L30D`,
    dataKey: 'negative_30_days',
    visible: true,
  },
  {
    value: true,
    key: `Negative \n Review L90D`,
    dataKey: 'negative_90_days',
    visible: true,
  },
  {
    value: true,
    key: `Negative \n Review L365D`,
    dataKey: 'negative_12_month',
    visible: true,
  },
  {
    value: true,
    key: `Negative \n Review Lifetime`,
    dataKey: 'negative_lifetime',
    visible: true,
  },
  // Positive Review
  {
    value: true,
    key: `Positive \n Review L30D`,
    dataKey: 'positive_30_days',
    visible: true,
  },
  {
    value: true,
    key: `Positive \n Review L90D`,
    dataKey: 'positive_90_days',
    visible: true,
  },
  {
    value: true,
    key: `Positive \n Review L365D`,
    dataKey: 'positive_12_month',
    visible: true,
  },
  {
    value: true,
    key: `Positive\n Review Lifetime`,
    dataKey: 'positive_lifetime',
    visible: true,
  },
  // Neutral Reviews
  {
    value: true,
    key: `Neutral \n Review L30D`,
    dataKey: 'neutral_30_days',
    visible: true,
  },
  {
    value: true,
    key: `Neutral \n Review L90D`,
    dataKey: 'neutral_90_days',
    visible: true,
  },
  {
    value: true,
    key: `Neutral \n Review L365D`,
    dataKey: 'neutral_12_month',
    visible: true,
  },
  {
    value: true,
    key: `Neutral\n Review Lifetime`,
    dataKey: 'neutral_lifetime',
    visible: true,
  },
  // Launched Year
  {
    value: true,
    key: `Launched`,
    dataKey: 'launched',
    visible: true,
  },
  // State
  {
    value: true,
    key: `State`,
    dataKey: 'state',
    visible: true,
  },
];
