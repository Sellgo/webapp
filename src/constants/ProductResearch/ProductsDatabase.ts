/* All action types */
export const actionTypes = {
  UPDATE_PRODUCTS_DATABASE_FILTER: 'UPDATE_PRODUCTS_DATABASE_FILTER',
  IS_LOADING_PRODUCTS_DATABASE: 'IS_LOADING_PRODUCTS_DATABASE',
  SET_PRODUCTS_DATABASE: 'SET_PRODUCTS_DATABASE',
  SET_PRODUCTS_DATABASE_PAGINATION_INFO: 'SET_PRODUCTS_DATABASE_PAGINATION_INFO',
  FETCH_PRODUCTS_DATABASE: 'FETCH_PRODUCTS_DATABASE',
  SET_PRODUCTS_DATABASE_FILTERS: 'SET_PRODUCTS_DATABASE_FILTERS',
};

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

export const DEFAULT_INCLUDE_EXCLUDE_ERROR = {
  include: false,
  exclude: false,
};

export const DEFAULT_CHECKBOX_FILTER = {};

export const F_TYPES = {
  TEXT: 'TEXT',
  INPUT_INCLUDE_EXCLUDE: 'INPUT_INCLUDE_EXCLUDE',
  MIN_MAX: 'MIN_MAX',
  CHECK_BOX: 'CHECK_BOX',
};

/* Map the payload keys to query keys for API */
export const FILTER_QUERY_KEY_MAPPER: { [key: string]: { keyName: string; type: string } } = {
  // simple
  category: { keyName: 'category', type: F_TYPES.TEXT },
  monthlyRevenue: { keyName: 'monthly_revenue', type: F_TYPES.MIN_MAX },
  monthlySales: { keyName: 'monthly_sales', type: F_TYPES.MIN_MAX },
  price: { keyName: 'price', type: F_TYPES.MIN_MAX },
  reviewCount: { keyName: 'review_count', type: F_TYPES.MIN_MAX },
  reviewRating: { keyName: 'rating', type: F_TYPES.MIN_MAX },

  // Advanced
  sellerCount: { keyName: 'seller_count', type: F_TYPES.MIN_MAX },
  weight: { keyName: 'weight_lbs', type: F_TYPES.MIN_MAX },
  titleKeywords: { keyName: 'title_keywords', type: F_TYPES.INPUT_INCLUDE_EXCLUDE },
  brands: { keyName: 'brands', type: F_TYPES.INPUT_INCLUDE_EXCLUDE },
  bsr: { keyName: 'bsr', type: F_TYPES.MIN_MAX },
  sizeTier: { keyName: 'size_tier', type: F_TYPES.TEXT },
  imageCount: { keyName: 'image_count', type: F_TYPES.MIN_MAX },
  variationCount: { keyName: 'variation_count', type: F_TYPES.MIN_MAX },
  fulfillment: { keyName: 'fulfillment', type: F_TYPES.CHECK_BOX },
};

export const PRODUCTS_DATABASE_SIZE_TIERS = [
  { key: 'Small standard-size', value: 'Small standard-size', text: 'Small standard-size' },
  { key: 'Small oversize', value: 'Small oversize', text: 'Small oversize' },
  { key: 'Medium oversize', value: 'Medium oversize', text: 'Medium oversize' },
  { key: 'Large standard-size', value: 'Large standard-size', text: 'Large standard-size' },
  { key: 'large oversize', value: 'large oversize', text: 'large oversize' },
  { key: 'Special oversize', value: 'Special oversize', text: 'Special oversize' },
];

export const FULFILMENT_TYPES = [
  { key: 'is_fba', value: 'is_fba', text: 'FBA' },
  { key: 'is_fbm', value: 'is_fbm', text: 'FBM' },
  { key: 'is_amazon', value: 'is_amazon', text: 'Amazon' },
];

export const DEFAULT_FULFILMENT_FILTER = { is_fba: false, is_fbm: false, is_amazon: false };

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
