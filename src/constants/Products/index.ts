export const SET_SUPPLIER_PRODUCT_DETAILS = 'SET_SUPPLIER_PRODUCT_DETAILS';
export const SET_SUPPLIER_PRODUCT_DETAIL_CHART_RANK = 'SET_SUPPLIER_PRODUCT_DETAIL_CHART_RANK';
export const SET_SUPPLIER_PRODUCT_DETAIL_CHART_PRICE = 'SET_SUPPLIER_PRODUCT_DETAIL_CHART_PRICE';
export const SET_SUPPLIER_PRODUCT_DETAIL_CHART_INVENTORY =
  'SET_SUPPLIER_PRODUCT_DETAIL_CHART_INVENTORY';
export const SET_SUPPLIER_PRODUCT_DETAIL_CHART_RATING = 'SET_SUPPLIER_PRODUCT_DETAIL_CHART_RATING';
export const SET_SUPPLIER_PRODUCT_DETAIL_CHART_REVIEW = 'SET_SUPPLIER_PRODUCT_DETAIL_CHART_REVIEW';
export const SET_SUPPLIER_PRODUCT_DETAIL_CHART_SELLER_INVENTORY =
  'SET_SUPPLIER_PRODUCT_DETAIL_CHART_SELLER_INVENTORY';
export const SET_PRODUCT_DETAIL_KPI = 'SET_PRODUCT_DETAIL_KPI';
export const SET_SUPPLIER_PRODUCT_DETAIL_CHART_KPI = 'SET_SUPPLIER_PRODUCT_DETAIL_CHART_KPI';
export const RESET_SUPPLIER_PRODUCT_DETAILS = 'RESET_SUPPLIER_PRODUCT_DETAILS';
export const SET_BUY_BOX_STATISTICS = 'SET_BUY_BOX_STATISTICS';
export const SET_FETCHING_RANK = 'SET_FETCHING_RANK';
export const SET_FETCHING_PRICE = 'SET_FETCHING_PRICE';
export const SET_FETCHING_INVENTORY = 'SET_FETCHING_INVENTORY';
export const SET_FETCHING_RATING = 'SET_FETCHING_RATING';
export const SET_FETCHING_REVIEW = 'SET_FETCHING_REVIEW';
export const SET_FETCHING_SELLER_INVENTORY = 'SET_FETCHING_SELLER_INVENTORY';
export const SET_FETCHING_KPI = 'SET_FETCHING_KPI';
export const SET_ACTIVE_EXPORT_FILES = 'SET_ACTIVE_EXPORT_FILES';
export const FETCHING_ACTIVE_EXPORTS = 'FETCHING_ACTIVE_EXPORTS';
export const SET_FETCHING_BUY_BOX_STATISTICS = 'SET_FETCHING_BUY_BOX_STATISTICS';

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
    key: 'ASIN',
    dataKey: 'asin',
    visible: true,
  },
  {
    value: true,
    key: 'Price',
    dataKey: 'price',
    visible: true,
  },
  {
    value: true,
    key: 'Cost',
    dataKey: 'product_cost',
    visible: true,
  },
  {
    value: true,
    key: 'Total Fees',
    dataKey: 'fees',
    visible: true,
  },
  {
    value: true,
    key: 'Profit',
    dataKey: 'multipack_profit',
    visible: true,
  },
  {
    value: true,
    key: 'Margin',
    dataKey: 'multipack_margin',
    visible: true,
  },
  {
    value: true,
    key: 'ROI',
    dataKey: 'multipack_roi',
    visible: true,
  },
  {
    value: true,
    key: 'Rank',
    dataKey: 'rank',
    visible: true,
  },
  {
    value: true,
    key: 'Monthly Sales Est',
    dataKey: 'sales_monthly',
    visible: true,
  },
  {
    value: true,
    key: 'Monthly Revenue',
    dataKey: 'monthly_revenue',
    visible: true,
  },
  {
    value: true,
    key: 'FBA Fee',
    dataKey: 'fba_fee',
    visible: true,
  },
  {
    value: true,
    key: 'Referral Fee',
    dataKey: 'referral_fee',
    visible: true,
  },
  {
    value: true,
    key: 'Variable Closing Fee',
    dataKey: 'variable_closing_fee',
    visible: true,
  },
  {
    value: true,
    key: 'Other UPC',
    dataKey: 'upcs',
    visible: true,
  },
  {
    value: true,
    key: 'Is Amazon Selling',
    dataKey: 'is_amazon_selling',
    visible: true,
  },
  {
    value: true,
    dataKey: 'amazon_price',
    key: 'Amazon Price',
    visible: true,
  },
  {
    value: true,
    key: 'Reviews',
    dataKey: 'customer_reviews',
    visible: true,
  },
  {
    value: true,
    key: 'Rating',
    dataKey: 'rating',
    visible: true,
  },
  {
    value: true,
    key: 'Best Seller',
    dataKey: 'best_seller',
    visible: true,
  },
  {
    value: true,
    key: 'Subscribe & Save',
    dataKey: 'subscribe_save',
    visible: true,
  },
  {
    value: true,
    key: 'Number Of Seller',
    dataKey: 'number_of_sellers',
    visible: true,
  },
  {
    value: true,
    key: 'Num New FBA Offers',
    dataKey: 'num_fba_new_offers',
    visible: true,
  },
  {
    value: true,
    key: 'Num New FBM Offers',
    dataKey: 'num_fbm_new_offers',
    visible: true,
  },
  {
    value: true,
    key: 'Low New FBA Price',
    dataKey: 'low_new_fba_price',
    visible: true,
  },
  {
    value: true,
    key: 'Low New FBM Price',
    dataKey: 'low_new_fbm_price',
    visible: true,
  },
  {
    value: true,
    key: 'Multipack Qty',
    dataKey: 'multipack_quantity',
    visible: true,
  },
  {
    value: true,
    key: 'Category',
    dataKey: 'amazon_category_name',
    visible: true,
  },
  {
    value: true,
    key: 'Size Tier',
    dataKey: 'size_tier',
    visible: true,
  },
  {
    value: true,
    key: 'UPC',
    dataKey: 'upc',
    visible: true,
  },
  {
    value: true,
    key: 'Last Run',
    dataKey: 'last_run',
    visible: true,
  },
  {
    value: true,
    key: '',
    dataKey: 'actions',
    visible: false,
  },
];

export const EXPORT_FORMATS = [
  { key: 'csv', value: 'csv', text: '.CSV' },
  { key: 'xlsx', value: 'xlsx', text: '.XLSX' },
];

export const EXPORT_DATA = [
  { key: 'all', value: 'all', text: 'All Results' },
  { key: 'filtered', value: 'filtered', text: 'Filtered Results' },
];

export const removeProfitFinderFilters = () => {
  columnFilter.forEach(column => {
    localStorage.removeItem(`products:${column.dataKey}`);
  });
};
