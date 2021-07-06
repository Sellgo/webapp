export const FETCH_SELLERS = 'FETCH_SELLERS';
export const FETCH_SELLERS_SUCCESS = 'FETCH_SELLERS_SUCCESS';
export const FETCH_SELLERS_ERROR = 'FETCH_SELLERS_ERROR';
export const FETCH_INVENTORY = 'FETCH_INVENTORY';
export const SET_LOADING_SELLERS = 'SET_LOADING_SELLERS';
export const SET_SELLERS_SORT = 'SET_SELLER_SORT';
export const SET_SELLERS_SORT_DIRECTION = 'SET_SELLER_SORT_DIRECTION';
export const SET_SELLERS_FILTERS = 'SET_SELLERS_FILTERS';
export const SET_SELLERS_FILTERS_LOADING = 'SET_SELLERS_FILTERS_LOADING';

export const FETCH_SELLER_PRODUCTS = 'FETCH_SELLER_PRODUCTS';
export const FETCH_SELLER_PRODUCTS_SUCCESS = 'FETCH_SELLER_PRODUCTS_SUCCESS';
export const FETCH_SELLER_PRODUCTS_ERROR = 'FETCH_SELLER_PRODUCTS_ERROR';
export const SET_ACTIVE_PRODUCT = 'SET_ACTIVE_PRODUCT';

export const SET_SELLER_PRODUCTS_PAGE_NO = 'SET_SELLER_PRODUCTS_PAGE_NO';
export const SET_SELLER_PRODUCTS_PAGE_SIZE = 'SET_SELLER_PRODUCTS_PAGE_SIZE';
export const SET_SELLER_PRODUCTS_PAGE_COUNT = 'SET_SELLER_PRODUCTS_PAGE_COUNT';
export const SET_SELLER_PRODUCTS_COUNT = 'SET_SELLER_PRODUCTS_COUNT';
export const SET_SELLER_PRODUCTS_SINGLE_PAGE_ITEMS_COUNT =
  'SET_SELLER_PRODUCTS_SINGLE_PAGE_ITEMS_COUNT';

export const FETCH_PRODUCT_SELLERS = 'FETCH_PRODUCT_SELLERS';
export const FETCH_PRODUCT_SELLERS_SUCCESS = 'FETCH_PRODUCT_SELLERS_SUCCESS';
export const FETCH_PRODUCT_SELLERS_ERROR = 'FETCH_PRODUCT_SELLERS_ERROR';
export const SET_PRODUCT_SELLERS = 'SET_FETCH_SELLERS';

export const SET_SELLER_TRACK_GROUPS = 'SET_SELLER_TRACK_GROUPS';
export const SET_MENU_ITEM = 'SET_MENU_ITEM';
export const SET_TRACK_PRODUCT_SELLER = 'SET_TRACK_PRODUCT_SELLER';

export const SET_SELLERS_PAGE_NO = 'SET_SELLERS_PAGE_NO';
export const SET_SELLERS_PAGE_SIZE = 'SET_SELLERS_PAGE_SIZE';
export const SET_SELLERS_PAGE_COUNT = 'SET_SELLERS_PAGE_COUNT';
export const SET_SELLERS_COUNT = 'SET_SELLERS_COUNT';
export const SET_SELLERS_SINGLE_PAGE_ITEMS_COUNT = 'SET_SELLERS_SINGLE_PAGE_ITEMS_COUNT';

export const SET_ACTIVE_PRODUCT_INDEX = 'SET_ACTIVE_PRODUCT_INDEX';
export const SET_ACTIVE_PRODUCT_SELLER_INDEX = 'SET_ACTIVE_PRODUCT_SELLER_INDEX';
export const SET_ACTIVE_SELLER_INDEX = 'SET_ACTIVE_SELLER_INDEX';
export const SET_ACTIVE_PRODUCT_HEIGHT = 'SET_ACTIVE_PRODUCT_HEIGHT';

export const SELLER_DETAILS_URL =
  'https://www.amazon.com/sp?_encoding=UTF8&asin=&isAmazonFulfilled=&ref_=olp_merch_name_3';

export const SEARCH_STATUS = {
  PENDING: 'pending',
  DONE: 'done',
  SUCCESS: 'success',
  ERROR: 'error',
  FAILED: 'failed',
};

export const SELLER_LIMIT_MESSAGE = 'Seller limit exceeded';

export const selectItemsCountList = [
  {
    key: '25',
    text: '25',
    value: '25',
  },
  {
    key: '50',
    text: '50',
    value: '50',
  },
  {
    key: '100',
    text: '100',
    value: '100',
  },
];

export const generateSellerAmazonLink = (sellerID: string) => {
  const BASE_URL = `https://www.amazon.com/sp?_encoding=UTF8&asin=&isAmazonFulfilled=&ref_=olp_merch_name_3`;
  return `${BASE_URL}&seller=${sellerID}`;
};

export const generateProductAmazonLink = (asin: string) => {
  const BASE_URL = `https://www.amazon.com/dp`;
  return `${BASE_URL}/${asin}`;
};
