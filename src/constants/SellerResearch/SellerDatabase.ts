import { defaultMarketplaces } from '../../constants/Settings/index';

/* Actions Types */
export const actionTypes = {
  IS_LOADING_SELLER_DATABASE: 'IS_LOADING_SELLER_DATABASE',
  IS_LOADING_SELLER_DATABASE_EXPORT: 'IS_LOADING_SELLER_DATABASE_EXPORT',
  SET_SELLER_DATABASE_RESULTS: 'SET_SELLER_DATABASE_RESULTS',
  SHOW_FILTER_MESSAGE: 'SHOW_FILTER_MESSAGE',
  SET_SELLER_DATABASE_PAGINATION_INFO: 'SET_SELLER_DATABASE_PAGINATION_INFO',
  SET_SELLER_DATABASE_MARKETPLACE: 'SET_SELLER_DATABASE_MARKETPLACE',
  SET_SELLER_DATABASE_QUOTA_EXCEEDED: 'SET_SELLER_DATABASE_QUOTA_EXCEEDED',
  SET_IS_RESTORING_SELLER_DATABASE_LAST_SEARCH: 'SET_IS_RESTORING_SELLER_DATABASE_LAST_SEARCH',
};

export const INFO_FILTER_MESSAGE = `Enter at least one filter and click 'Find' to get started!`;

/* Period Durations for filters */
export const FILTER_PERIOD_DURATIONS = [
  { key: '30D', text: 'L30D', value: '30_days' },
  { key: '90D', text: 'L3M', value: '90_days' },
  { key: '365D', text: 'L1Y', value: '12_month' },
  { key: 'All', text: 'All', value: 'lifetime' },
];

/* Revivew Filter Type Durations */
export const FILTER_REVIEW_OPTIONS = [
  { key: 'Positive', text: 'Positive', value: 'positive' },
  { key: 'Negative', text: 'Negative', value: 'negative' },
  { key: 'Neutral', text: 'Neutral', value: 'neutral' },
];

/* Growth * Period values */
export const GROWTH_PERCENT_PERIOD_OPTIONS = [
  { key: '30D', text: 'L30D', value: 'growth_month' },
  { key: '90D', text: 'L3M', value: 'growth_L90D' },
  { key: '180D', text: 'L6M', value: 'growth_L180D' },
  { key: '365D', text: 'L1Y', value: 'growth_year' },
];

export const GROWTH_COUNT_PERIOD_OPTIONS = [
  { key: '30D', text: 'L30D', value: 'growth_month_count' },
  { key: '180D', text: 'L6M', value: 'growth_count_L180D' },
];

export const REVERSE_GROWTH_PERCENT_MAPPER = {};

export const DEFAULT_GROWTH_PERCENT_FILTER = {
  min: '',
  max: '',
  period: 'growth_month',
};

export const DEFAULT_GROWTH_COUNT_FILTER = {
  min: '',
  max: '',
  period: 'growth_month_count',
};

/* Launched Durations for filters */
export const LAUNCHED_FILTER_OPTIONS = [
  { label: 'Longer than a year', value: '>1Y' },
  { label: 'Less than a year', value: '90D-1Y' },
];

/* Seller Type filter options */
export const SELLER_TYPE_FILTER_OPTIONS = [
  { label: 'Private Label Seller', value: 'private_label' },
  { label: 'Wholesale Reseller', value: 'wholesale' },
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
  type: 'positive',
};

/* Filter types */
export const F_TYPES = {
  TEXT: 'TEXT',
  INPUT_INCLUDE_EXCLUDE: 'INPUT_INCLUDE_EXCLUDE',
  MIN_MAX: 'MIN_MAX',
  MIN_MAX_PERIOD: 'MIN_MAX_PERIOD',
  MIN_MAX_PERIOD_REVIEW: 'MIN_MAX_PERIOD_REVIEW',
  GROWTH_PERCENT_FILTER: 'GROWTH_PERCENT_FILTER',
  GROWTH_COUNT_FILTER: 'GROWTH_COUNT_FILTER',
};

/* Map the payload keys to query keys for API */
export const FILTER_QUERY_KEY_MAPPER: { [key: string]: { keyName: string; type: string } } = {
  merchantName: { keyName: 'merchant_name', type: F_TYPES.TEXT },
  companyName: { keyName: 'company_name', type: F_TYPES.TEXT },
  zipCode: { keyName: 'zip_code', type: F_TYPES.TEXT },
  asins: { keyName: 'asins', type: F_TYPES.INPUT_INCLUDE_EXCLUDE },
  sellerIds: { keyName: 'merchant_ids', type: F_TYPES.INPUT_INCLUDE_EXCLUDE },

  businessName: { keyName: 'business_name', type: F_TYPES.TEXT },
  brands: { keyName: 'brands', type: F_TYPES.INPUT_INCLUDE_EXCLUDE },

  categories: { keyName: 'categories', type: F_TYPES.TEXT },
  monthlyRevenue: { keyName: 'sales_estimate', type: F_TYPES.MIN_MAX },

  numOfInventory: { keyName: 'inventory_count', type: F_TYPES.MIN_MAX },
  numOfBrands: { keyName: 'number_brands', type: F_TYPES.MIN_MAX },

  growthPercent: { keyName: 'growth_percent', type: F_TYPES.GROWTH_PERCENT_FILTER },
  growthCount: { keyName: 'growth_count', type: F_TYPES.GROWTH_COUNT_FILTER },

  reviewCount: { keyName: 'count', type: F_TYPES.MIN_MAX_PERIOD },
  fbaPercent: { keyName: 'fba_percent', type: F_TYPES.MIN_MAX },

  sellerRatings: { keyName: 'seller_rating', type: F_TYPES.MIN_MAX },
  review: { keyName: 'review', type: F_TYPES.MIN_MAX_PERIOD_REVIEW },

  country: { keyName: 'country', type: F_TYPES.TEXT },
  state: { keyName: 'state', type: F_TYPES.TEXT },

  launched: { keyName: 'launched', type: F_TYPES.TEXT },
  sellerType: { keyName: 'seller_type', type: F_TYPES.TEXT },

  sellerReachability: { keyName: 'has_phone', type: F_TYPES.TEXT },
  hasContact: { keyName: 'has_contact', type: F_TYPES.TEXT },
  hasAddress: { keyName: 'has_address', type: F_TYPES.TEXT },
  hasWebsite: { keyName: 'has_website', type: F_TYPES.TEXT },
  hasCompanySocial: { keyName: 'has_company_social', type: F_TYPES.TEXT },
  isLookedUp: { keyName: 'is_looked_up', type: F_TYPES.TEXT },
  countries: { keyName: 'countries', type: F_TYPES.TEXT },
};

export const GROWTH_PERCENT_FILTER_KEY_MAPPER = {
  '30_days': 'growth_month',
  '90_days': 'growth_L180D',
};

export const DONT_DISABLE = ['US', 'GB', 'IT', 'MX', 'CA'];

/* Marketplace options for seller DB */
export const SELLER_DB_MARKETPLACE = defaultMarketplaces
  .filter(m => DONT_DISABLE.includes(m.code))
  .map((marketplace: any) => {
    return {
      text: marketplace.name,
      code: marketplace.code,
      key: marketplace.code,
      value: marketplace.id,
      disabled: !DONT_DISABLE.includes(marketplace.code),
      currency: marketplace.currency,
    };
  });

/* Default US Marketplace */
export const DEFAULT_US_MARKET = {
  text: 'United States',
  code: 'US',
  value: 'ATVPDKIKX0DER',
  disabled: false,
  key: 'US',
  currency: '$',
};

export const getMarketplace = (marketplaceId: string) => {
  const marketplace = SELLER_DB_MARKETPLACE.find((marketplace: any) => {
    return marketplace.value === marketplaceId;
  });

  if (marketplace) {
    return marketplace;
  } else {
    return DEFAULT_US_MARKET;
  }
};

export const sellerTypeMapper: { [key: string]: string } = {
  private_label: 'Private Label',
  wholesale: 'Wholesale',
};

export const prettyPrintSeller = (sellerType: string) => {
  const seller = sellerTypeMapper[sellerType];

  if (!seller) {
    return '-';
  }

  return seller;
};

export const DEFAULT_SELLER_DATABASE_FILTER: any = {
  categories: [],
  countries: [],
  brands: DEFAULT_INCLUDE_EXCLUDE_FILTER,
  monthlyRevenue: DEFAULT_MIN_MAX_FILTER,
  businessName: '',
  zipCode: '',
  merchantName: '',
  companyName: '',
  asins: DEFAULT_INCLUDE_EXCLUDE_FILTER,
  sellerIds: DEFAULT_INCLUDE_EXCLUDE_FILTER,
  country: 'All Countries',
  state: '',
  sellerReachability: false,
  numOfInventory: DEFAULT_MIN_MAX_FILTER,
  numOfBrands: DEFAULT_MIN_MAX_FILTER,
  growthPercent: DEFAULT_GROWTH_PERCENT_FILTER,
  reviewCount: DEFAULT_MIN_MAX_PERIOD_FILTER,
  fbaPercent: DEFAULT_MIN_MAX_FILTER,
  review: DEFAULT_MIN_MAX_PERIOD_REVIEW,
  launched: '',
  sellerType: '',
  sellerRatings: DEFAULT_MIN_MAX_FILTER,
  hasContact: false,
  hasAddress: false,
  hasWebsite: false,
  hasCompanySocial: false,
};

export const getMinMaxPeriodFilter = (apiFilterName: string, value: any, isReview?: boolean) => {
  let filter = {};

  /* Check for filter type, only applicable for review */
  if (isReview && apiFilterName.includes('positive_')) {
    filter = {
      ...filter,
      type: 'positive',
    };
  } else if (isReview && apiFilterName.includes('negative_')) {
    filter = {
      ...filter,
      type: 'negative',
    };
  } else if (isReview && apiFilterName.includes('neutral_')) {
    filter = {
      ...filter,
      type: 'neutral',
    };
  } else if (isReview) {
    return null;
  }

  /* Check for filter period */
  if (apiFilterName.includes('30_days')) {
    filter = {
      ...filter,
      period: '30_days',
    };
  } else if (apiFilterName.includes('90_days')) {
    filter = {
      ...filter,
      period: '90_days',
    };
  } else if (apiFilterName.includes('12_month')) {
    filter = {
      ...filter,
      period: '12_month',
    };
  } else if (apiFilterName.includes('lifetime')) {
    filter = {
      ...filter,
      period: 'lifetime',
    };
  } else {
    return null;
  }

  /* Check for filter min/max */
  if (apiFilterName.includes('_min')) {
    filter = {
      ...filter,
      min: value,
    };
  } else if (apiFilterName.includes('_max')) {
    filter = {
      ...filter,
      max: value,
    };
  } else {
    return null;
  }

  return filter;
};

export const getGrowthFilter = (apiFilterName: string, value: any) => {
  let filter = {};

  /* Check for filter type */
  if (apiFilterName.includes('_min')) {
    filter = {
      ...filter,
      min: value,
    };
  } else if (apiFilterName.includes('_max')) {
    filter = {
      ...filter,
      max: value,
    };
  } else {
    return null;
  }

  /* Check for filter period */
  if (apiFilterName.includes('growth_month')) {
    filter = {
      ...filter,
      period: 'growth_month',
    };
  } else if (apiFilterName.includes('growth_L90D')) {
    filter = {
      ...filter,
      period: 'growth_L90D',
    };
  } else if (apiFilterName.includes('growth_L180D')) {
    filter = {
      ...filter,
      period: 'growth_L180D',
    };
  } else if (apiFilterName.includes('growth_year')) {
    filter = {
      ...filter,
      period: 'growth_year',
    };
  } else if (apiFilterName.includes('growth_month_count')) {
    filter = {
      ...filter,
      period: 'growth_month_count',
    };
  } else if (apiFilterName.includes('growth_count_L180D')) {
    filter = {
      ...filter,
      period: 'growth_count_L180D',
    };
  } else {
    return null;
  }
  return filter;
};

export const SOCIAL_LINK_COLORS: { [key: string]: any } = {
  facebook: '#3B5998',
  instagram: '',
  twitter: '#00ACEE',
  linkedin: '#0072B1',
  youtube: '#FF0000',
  pinterest: '#C8232C',
  crunchbase: '#0287d1',
  angellist: '',
  meetup: '#E51937',
  foursquare: '#FA4779',
  klout: '#E53935',
  amazon: '#000000',
};
