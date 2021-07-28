import { ProductsDatabaseFilters } from '../../interfaces/ProductResearch/ProductsDatabase';

/* All action types */
export const actionTypes = {
  UPDATE_PRODUCTS_DATABASE_FILTER: 'UPDATE_PRODUCTS_DATABASE_FILTER',
  IS_LOADING_PRODUCTS_DATABASE: 'IS_LOADING_PRODUCTS_DATABASE',
  SET_PRODUCTS_DATABASE: 'SET_PRODUCTS_DATABASE',
  SET_PRODUCTS_DATABASE_PAGINATION_INFO: 'SET_PRODUCTS_DATABASE_PAGINATION_INFO',
  FETCH_PRODUCTS_DATABASE: 'FETCH_PRODUCTS_DATABASE',
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

/* Default advanced filters */
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

/* Products Database Filters */
export const DEFAULT_PRODUCTS_DATABASE_FILTERS = [
  ...DEFAULT_BASIC_FILTERS,
  ...DEFAULT_ADVANCED_FILTERS,
];

/* Categories dropdown values for filter */
export const PRODUCTS_DATABASE_CATEGORIES = [
  { key: 'Books', value: 'Books', text: 'Books' },
  {
    key: 'Tools & Home Improvement',
    value: 'Tools & Home Improvement',
    text: 'Tools & Home Improvement',
  },
  {
    key: 'Collectibles & Fine Art',
    value: 'Collectibles & Fine Art',
    text: 'Collectibles & Fine Art',
  },
  {
    key: 'Everything Else',
    value: 'Everything Else',
    text: 'Everything Else',
  },
  {
    key: 'Clothing, Shoes & Jewelry',
    value: 'Clothing, Shoes & Jewelry',
    text: 'Clothing, Shoes & Jewelry',
  },
  { key: 'Video Games', value: 'Video Games', text: 'Video Games' },
  {
    key: 'Baby Products',
    value: 'Baby Products',
    text: 'Baby Products',
  },
  { key: 'Apps & Games', value: 'Apps & Games', text: 'Apps & Games' },
  { key: 'Movies & TV', value: 'Movies & TV', text: 'Movies & TV' },
  { key: 'Pet Supplies', value: 'Pet Supplies', text: 'Pet Supplies' },
  { key: 'Vehicles', value: 'Vehicles', text: 'Vehicles' },
  {
    key: 'Arts, Crafts & Sewing',
    value: 'Arts, Crafts & Sewing',
    text: 'Arts, Crafts & Sewing',
  },
  {
    key: 'Musical Instruments',
    value: 'Musical Instruments',
    text: 'Musical Instruments',
  },
  {
    key: 'Cell Phones & Accessories',
    value: 'Cell Phones & Accessories',
    text: 'Cell Phones & Accessories',
  },
  {
    key: 'Handmade Products',
    value: 'Handmade Products',
    text: 'Handmade Products',
  },
  {
    key: 'Home & Kitchen',
    value: 'Home & Kitchen',
    text: 'Home & Kitchen',
  },
  { key: 'CDs & Vinyl', value: 'CDs & Vinyl', text: 'CDs & Vinyl' },
  {
    key: 'Health & Household',
    value: 'Health & Household',
    text: 'Health & Household',
  },
  { key: 'Automotive', value: 'Automotive', text: 'Automotive' },
  {
    key: 'Office Products',
    value: 'Office Products',
    text: 'Office Products',
  },
  { key: 'Toys & Games', value: 'Toys & Games', text: 'Toys & Games' },
  { key: 'Software', value: 'Software', text: 'Software' },
  {
    key: 'Magazine Subscriptions',
    value: 'Magazine Subscriptions',
    text: 'Magazine Subscriptions',
  },
  { key: 'Electronics', value: 'Electronics', text: 'Electronics' },
  {
    key: 'Grocery & Gourmet Food',
    value: 'Grocery & Gourmet Food',
    text: 'Grocery & Gourmet Food',
  },
  {
    key: 'Beauty & Personal Care',
    value: 'Beauty & Personal Care',
    text: 'Beauty & Personal Care',
  },
  {
    key: 'Sports & Outdoors',
    value: 'Sports & Outdoors',
    text: 'Sports & Outdoors',
  },
  { key: 'Appliances', value: 'Appliances', text: 'Appliances' },
  {
    key: 'Patio, Lawn & Garden',
    value: 'Patio, Lawn & Garden',
    text: 'Patio, Lawn & Garden',
  },
  {
    key: 'Industrial & Scientific',
    value: 'Industrial & Scientific',
    text: 'Industrial & Scientific',
  },
];
