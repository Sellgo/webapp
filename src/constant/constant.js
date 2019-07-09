export const FETCH_AUTH_BEGIN = 'LogInPage/FETCH_AUTH_BEGIN';
export const SET_BASIC_INFO_SELLER = '/Dash/SETTING/SET_BASIC_INFO_SELLER';
export const UPDATE_BASIC_INFO_SELLER = '/Dash/SETTING/UPDATE_BASIC_INFO_SELLER';
export const GET_BASIC_INFO_SELLER = '/Dash/SETTING/GET_BASIC_INFO_SELLER';
export const SET_AMAZON_MWS = '/Dash/SETTING/AMAZON_MWS';
export const SET_TIME_EFFICIENCY = '/SYN/GET_TIME_EFFICIENCY';
export const SET_SELLERS = '/SYN/SET_SELLERS';
export const UPDATE_PRODUCT = '/SYN/UPDATE_PRODUCT';
export const SET_PRODUCTS = '/SYN/SET_PRODUCTS';
export const SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION = '/SYN/SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION';
export const SET_PRODUCT_TRACK_DATA = '/SYN/SET_PRODUCT_TRACK_DATA';
export const SET_CHART_VALUES_1 = '/SYN/SET_CHART_VALUES_1';
export const SET_CHART_VALUES_2 = '/SYN/SET_CHART_VALUES_2';
export const SET_Product_Detail = '/SYN/SET_Product_Detail';
export const SET_Product_Detail_Chart_Values = '/SYN/SET_Product_Detail_Chart_Values';
export const SET_Product_Detail_Chart_Values_2 = '/SYN/SET_Product_Detail_Chart_Values_2';


export const marketPlace = [
  { name: 'Brazil', id: 'A2Q3Y263D00KWC', code: 'BR', link: 'amazon.com' },
  { name: 'Canada', id: 'A2EUQ1WTGCTBG2', code: 'CA', link: 'amazon.ca' },
  { name: 'Mexico', id: 'A1AM78C64UM0Y8', code: 'MX', link: 'amazon.com.mx' },
  { name: 'US', id: 'ATVPDKIKX0DER', code: 'US', link: 'amazon.com' },
  { name: 'United Arab Emirates', id: 'A2VIGQ35RCS4UG', code: 'AE', link: 'amazon.ae' },
  { name: 'Germany', id: 'A1PA6795UKMFR9', code: 'DE', link: 'amazon.de' },
  { name: 'Spain', id: 'A1RKKUPIHCS9HS', code: 'ES', link: 'amazon.com' },
  { name: 'France', id: 'A13V1IB3VIYZZH', code: 'FR', link: 'amazon.com' },
  { name: 'UK', id: 'A1F83G8C2ARO7P', code: 'GB', link: 'amazon.com' },
  { name: 'India', id: 'A21TJRUUN4KGV', code: 'IN', link: 'amazon.in' },
  { name: 'Italy', id: 'APJ6JRA9NG5V4', code: 'IT', link: 'amazon.com' },
  { name: 'Turkey', id: 'APJ6JRA9NG5V4', code: 'TR', link: 'amazon.com' },
];


/**
 * NOTE: setting to 0 will default to minimum of the current products in list
 *
 */
export const ProductFiltersPreset = [
  {
    key: 'Max Margin',
    text: 'Max Margin',
    data: {
      marginFilter: {
        min: 0,
        max: 1000,
      },
      profitPerMonthFilter: {
        min: 400,
        max: 380000,
      },
      unitProfitFilter: {
        min: 0,
        max: 13140,
      },
      unitsPerMonthFilter: {
        min: 4200,
        max: 100000000,
      },
    },
  },
  {
    key: 'Max Profit Per Month',
    text: 'Max Profit Per Month',
    data: {
      marginFilter: {
        min: 0,
        max: 1000,
      },
      profitPerMonthFilter: {
        min: 0,
        max: 400000,
      },
      unitProfitFilter: {
        min: 0,
        max: 1000,
      },
      unitsPerMonthFilter: {
        min: 0,
        max: 6000,
      },
    },
  },
  {
    key: 'Max Unit Profit',
    text: 'Max Unit Profit',
    data: {
      marginFilter: {
        min: 0,
        max: 1000,
      },
      profitPerMonthFilter: {
        min: 0,
        max: 1000,
      },
      unitProfitFilter: {
        min: 0,
        max: 1000,
      },
      unitsPerMonthFilter: {
        min: 0,
        max: 400000,
      },
    },
  },
  {
    key: 'Max Units Per Month',
    text: 'Max Units Per Month',
    data: {
      marginFilter: {
        min: 30,
        max: 1000,
      },
      profitPerMonthFilter: {
        min: 370,
        max: 250000,
      },
      unitProfitFilter: {
        min: 12,
        max: 5000,
      },
      unitsPerMonthFilter: {
        min: 4099,
        max: 400000,
      },
    },
  },
];

