export const actionTypes = {
  /* Main tbale action types */
  IS_LOADING_SELLER_INVENTORY_TABLE: 'IS_LOADING_SELLER_INVENTORY_TABLE',
  SET_SELLER_INVENTORY_TABLE_RESULTS: 'SET_SELLER_INVENTORY_TABLE_RESULTS',
  SET_SELLER_INVENTORY_TABLE_PAGINATION_INFO: 'SET_SELLER_INVENTORY_TABLE_PAGINATION_INFO',
};

/* Pagination info */
export const DEFAULT_PAGES_LIST = [
  {
    text: '20',
    value: 20,
    id: '20',
  },
  {
    text: '50',
    value: 50,
    id: '50',
  },
  {
    text: '100',
    value: 100,
    id: '100',
  },
];

/* Unique key for the row in seller inventiory main table */
export const SELLER_INVENTORY_UNIQUE_KEY = 'merchant_id';

/* Seller Inventory table row height */
export const SELLER_INVENTORY_TABLE_ROW_HEIGHT = 200;
