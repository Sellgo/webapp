export const SET_SUPPLIER_PRODUCT_DETAILS = 'SET_SUPPLIER_PRODUCT_DETAILS';
export const SET_SUPPLIER_PRODUCT_DETAIL_CHART_RANK = 'SET_SUPPLIER_PRODUCT_DETAIL_CHART_RANK';
export const SET_SUPPLIER_PRODUCT_DETAIL_CHART_PRICE = 'SET_SUPPLIER_PRODUCT_DETAIL_CHART_PRICE';
export const SET_SUPPLIER_PRODUCT_DETAIL_CHART_INVENTORY =
  'SET_SUPPLIER_PRODUCT_DETAIL_CHART_INVENTORY';
export const SET_SUPPLIER_PRODUCT_DETAIL_CHART_RATING = 'SET_SUPPLIER_PRODUCT_DETAIL_CHART_RATING';
export const SET_SUPPLIER_PRODUCT_DETAIL_CHART_REVIEW = 'SET_SUPPLIER_PRODUCT_DETAIL_CHART_REVIEW';
export const SET_PRODUCT_DETAIL_KPI = 'SET_PRODUCT_DETAIL_KPI';
export const SET_SUPPLIER_PRODUCT_DETAIL_CHART_KPI = 'SET_SUPPLIER_PRODUCT_DETAIL_CHART_KPI';
export const RESET_SUPPLIER_PRODUCT_DETAILS = 'RESET_SUPPLIER_PRODUCT_DETAILS';

export const SET_FETCHING_RANK = 'SET_FETCHING_RANK';
export const SET_FETCHING_PRICE = 'SET_FETCHING_PRICE';
export const SET_FETCHING_INVENTORY = 'SET_FETCHING_INVENTORY';
export const SET_FETCHING_RATING = 'SET_FETCHING_RATING';
export const SET_FETCHING_REVIEW = 'SET_FETCHING_REVIEW';
export const SET_FETCHING_KPI = 'SET_FETCHING_KPI';

export const columnFilter = [
  {
    value: true,
    key: 'Select All',
    visible: true,
  },
  {
    value: true,
    key: '',
    dataKey: 'checkboxes',
    visible: false,
  },
  {
    value: true,
    key: 'Price',
    dataKey: 'price',
    visible: true,
  },
  {
    value: true,
    key: 'Profit',
    dataKey: 'profit',
    visible: true,
  },
  {
    value: true,
    key: 'Margin',
    dataKey: 'margin',
    visible: true,
  },
  {
    value: true,
    key: 'Fees',
    dataKey: 'fees',
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
    key: 'ROI',
    dataKey: 'roi',
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
    key: 'Sales EsT',
    dataKey: 'sales_monthly',
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
    key: '',
    visible: false,
  },
];
