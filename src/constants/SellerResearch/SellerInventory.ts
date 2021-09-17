export const actionTypes = {
  /* Seller Inventory Main Table types*/
  IS_LOADING_SELLER_INVENTORY_TABLE: 'IS_LOADING_SELLER_INVENTORY_TABLE',
  SET_SELLER_INVENTORY_TABLE_RESULTS: 'SET_SELLER_INVENTORY_TABLE_RESULTS',
  SET_SELLER_INVENTORY_TABLE_PAGINATION_INFO: 'SET_SELLER_INVENTORY_TABLE_PAGINATION_INFO',
  SET_SELLER_INVENTORY_TABLE_EXPANDED_ROW: 'SET_SELLER_INVENTORY_TABLE_EXPANDED_ROW',

  /* Seller Inventory Products Table Action Types  */
  IS_LOADING_SELLER_INVENTORY_PRODUCTS_TABLE: 'IS_LOADING_SELLER_INVENTORY_PRODUCTS_TABLE',
  SET_SELLER_INVENTORY_PRODUCTS_TABLE_RESULTS: 'SET_SELLER_INVENTORY_PRODUCTS_TABLE_RESULTS',
  SET_SELLER_INVENTORY_PRODUCTS_TABLE_PAGINATION_INFO:
    'SET_SELLER_INVENTORY_PRODUCTS_TABLE_PAGINATION_INFO',
  SET_SELLER_INVENTORY_PRODUCTS_TABLE_EXPANDED_ROW:
    'SET_SELLER_INVENTORY_PRODUCTS_TABLE_EXPANDED_ROW',
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
export const SELLER_INVENTORY_UNIQUE_KEY = 'id';

/* Unique key for the Seller Inventory Products Table */
export const SELLER_INVENTORY_PRODUCTS_TABLE_UNIQUE_KEY = 'id';

/* Seller Inventory table row height */
export const SELLER_INVENTORY_TABLE_ROW_HEIGHT = 200;

/* Seller Inventory Products Table Row hight */
export const SELLER_INVENTORY_PRODUCTS_TABLE_ROW_HEIGHT = 50;

export const calculateSellerInventoryTableHeight = (
  numOfProducts: number,
  numOfSellers: number
) => {
  console.log(numOfProducts, numOfSellers);

  const productsTableHeight = (numOfProducts || 10) * SELLER_INVENTORY_PRODUCTS_TABLE_ROW_HEIGHT;

  return productsTableHeight;
};
