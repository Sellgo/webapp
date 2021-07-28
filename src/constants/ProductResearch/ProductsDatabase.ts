import { ProductsDatabaseFilters } from '../../interfaces/ProductResearch/ProductsDatabase';

/* All action types */
export const actionTypes = {
  UPDATE_PRODUCTS_DATABASE_FILTER: 'UPDATE_PRODUCTS_DATABASE_FILTER',
};

/* All filters for products database */
export const PRODUCTS_DATABASE_FILTER = {
  CATEGORIES: 'category',
  MONTHLY_REVENUE: 'monthly_revenue',
  PRICE: 'price',
  REVIEW_COUNT: 'review_count',
  REVIEW_RATING: 'review_rating',

  // advanced
  SELLER_COUNT: 'seller_count',
  WEIGHT_LBS: 'weight_lbs',
  INCLUDE_KEYWORDS: 'include_title_keywords',
  EXCLUDE_KEYWORDS: 'exclude_title_keywords',
  INCLUDE_BRANDS: 'include_brands',
  EXCLUDE_BRANDS: 'exclude_brands',
};

/* Default basic filters */
export const DEFAULT_BASIC_FILTERS: ProductsDatabaseFilters[] = [
  {
    type: 'text',
    name: PRODUCTS_DATABASE_FILTER.CATEGORIES,
    value: '',
    active: false,
  },
  {
    type: 'min_max',
    name: PRODUCTS_DATABASE_FILTER.MONTHLY_REVENUE,
    min: '',
    max: '',
    active: false,
  },
  {
    type: 'min_max',
    name: PRODUCTS_DATABASE_FILTER.PRICE,
    min: '',
    max: '',
    active: false,
  },
  {
    type: 'min_max',
    name: PRODUCTS_DATABASE_FILTER.REVIEW_COUNT,
    min: '',
    max: '',
    active: false,
  },
  {
    type: 'min_max',
    name: PRODUCTS_DATABASE_FILTER.REVIEW_RATING,
    min: '',
    max: '',
    active: false,
  },
];

export const DEFAULT_ADVANCED_FILTERS = [
  {
    type: 'min_max',
    name: PRODUCTS_DATABASE_FILTER.SELLER_COUNT,
    min: '',
    max: '',
    active: false,
  },
  {
    type: 'min_max',
    name: PRODUCTS_DATABASE_FILTER.WEIGHT_LBS,
    min: '',
    max: '',
    active: false,
  },
  {
    type: 'input',
    name: PRODUCTS_DATABASE_FILTER.INCLUDE_KEYWORDS,
    value: '',
    active: false,
  },
  {
    type: 'input',
    name: PRODUCTS_DATABASE_FILTER.EXCLUDE_KEYWORDS,
    value: '',
    active: false,
  },
  {
    type: 'input',
    name: PRODUCTS_DATABASE_FILTER.INCLUDE_BRANDS,
    value: '',
    active: false,
  },
  {
    type: 'input',
    name: PRODUCTS_DATABASE_FILTER.EXCLUDE_BRANDS,
    value: '',
    active: false,
  },
];

export const DEFAULT_PRODUCTS_DATABASE_FILTERS = [
  ...DEFAULT_BASIC_FILTERS,
  ...DEFAULT_ADVANCED_FILTERS,
];
