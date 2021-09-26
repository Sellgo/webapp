export const actionTypes = {
  /* Seller Inventory Main Table types*/
  IS_LOADING_SELLER_INVENTORY_TABLE: 'IS_LOADING_SELLER_INVENTORY_TABLE',
  SET_SELLER_INVENTORY_TABLE_RESULTS: 'SET_SELLER_INVENTORY_TABLE_RESULTS',
  SET_SELLER_INVENTORY_TABLE_PAGINATION_INFO: 'SET_SELLER_INVENTORY_TABLE_PAGINATION_INFO',
  SET_SELLER_INVENTORY_TABLE_EXPANDED_ROW: 'SET_SELLER_INVENTORY_TABLE_EXPANDED_ROW',
  SET_SELLER_INVENTORY_TABLE_EXPORT: 'SET_SELLER_INVENTORY_TABLE_EXPORT',

  /* Seller Inventory table groups */
  SET_SELLER_INVENTORY_TABLE_GROUPS: 'SET_SELLER_INVENTORY_TABLE_GROUPS',
  SET_SELLER_INVENTORY_TABLE_ACTIVE_GROUP_ID: 'SET_SELLER_INVENTORY_TABLE_ACTIVE_GROUP_ID',

  /* Seller Inventory Products Table Action Types  */
  IS_LOADING_SELLER_INVENTORY_PRODUCTS_TABLE: 'IS_LOADING_SELLER_INVENTORY_PRODUCTS_TABLE',
  SET_SELLER_INVENTORY_PRODUCTS_TABLE_RESULTS: 'SET_SELLER_INVENTORY_PRODUCTS_TABLE_RESULTS',
  SET_SELLER_INVENTORY_PRODUCTS_TABLE_PAGINATION_INFO:
    'SET_SELLER_INVENTORY_PRODUCTS_TABLE_PAGINATION_INFO',
  SET_SELLER_INVENTORY_PRODUCTS_TABLE_EXPANDED_ROW:
    'SET_SELLER_INVENTORY_PRODUCTS_TABLE_EXPANDED_ROW',

  /* Seller Inventory products seller tabl;e */
  IS_LOADING_SELLER_INVENTORY_PRODUCTS_TABLE_SELLERS:
    'IS_LOADING_SELLER_INVENTORY_PRODUCTS_TABLE_SELLERS',
  SET_SELLER_INVENTORY_PRODUCTS_TABLE_SELLERS_RESULTS:
    'SET_SELLER_INVENTORY_PRODUCTS_TABLE_SELLERS_RESULTS',
  SET_SELLER_INVENTORY_PRODUCTS_TABLE_SELLERS_PAGINATION_INFO:
    'SET_SELLER_INVENTORY_PRODUCTS_TABLE_SELLERS_PAGINATION_INFO',
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

/* Unique key for the seller inventory products seller table */
export const SELLER_INVENTORY_PRODUCTS_SELLERS_TABLE_UNIQUE_KEY = 'id';

/* Seller Inventory table row height */
export const SELLER_INVENTORY_TABLE_ROW_HEIGHT = 200;

/* Seller Inventory Products Table Row hight */
export const SELLER_INVENTORY_PRODUCTS_TABLE_ROW_HEIGHT = 50;

/* Seller Inventory Products Sellers Table Row Height */
export const SELLER_INVENTORY_PRODUCTS_TABLE_SELLER_ROW_HEIGHT = 40;

/* Calculate seller inventory expanded height  */
export const calculateSellerInventoryTableExpandedHeight = (
  numOfProducts: number,
  numofSellers: number
) => {
  /* When no products and no sellers */
  if (numOfProducts <= 0 && numofSellers <= 0) {
    return 250;
  }

  /* When sellers have products */
  if (numOfProducts > 0 && numofSellers <= 0) {
    // const PRODUCTS_ROWS_OFFSET = 8;

    // const sellerInventoryTableExpandedHeight =
    //   (numOfProducts + PRODUCTS_ROWS_OFFSET) * SELLER_INVENTORY_PRODUCTS_TABLE_ROW_HEIGHT;

    // console.log(sellerInventoryTableExpandedHeight);
    // 820
    return 600;
  }

  /* When seller has both products and product has sellers */
  if (numOfProducts > 0 && numofSellers > 0) {
    return 1300;
  }
};

/* Calculate products table height */
export const calculateProductsTableHeight = (numOfProducts: number, numOfSellers: number) => {
  /* When no products and no sellers */
  if (numOfProducts <= 0 && numOfSellers <= 0) {
    return 190;
  }

  /* When products exists */
  if (numOfProducts > 0 && numOfSellers <= 0) {
    return 550;
  }

  /* When seller has both products and product has sellers */
  if (numOfProducts > 0 && numOfSellers > 0) {
    return 1200;
  }
};

/* Calculate products table expanded hieght */
export const calculateProductsTableExpandedHeight = (numOfSellers: number) => {
  if (numOfSellers <= 0) {
    return 200;
  }

  /* If products has sellers */
  if (numOfSellers > 0) {
    return 400;
  }
};

/* Calculate sellers table height */
export const calculateSellerInventorySellersTableHeight = (numOfSellers: number) => {
  // if there are no sellers for products
  if (numOfSellers <= 0) {
    return 120;
  }

  // if there are sellers for products
  if (numOfSellers > 0) {
    return 350;
  }
};

/* Default details for All groups and Ungrouped */
export const DEFAULT_ALLGROUPS_ID = null;
export const DEFAULT_UNGROUPED_ID = -1;

/* Default State for seller inventory table export */
export const SELLER_INVENTORY_EXPORT_SOCKET_STATUS = {
  SUCCESS: 'success',
  PENDING: 'pending',
  FAILED: 'failed',
};

/* Possible Export types */
export const SELLER_INVENTORY_EXPORT_FILE_TYPES = {
  CSV: 'csv',
  XLSX: 'xlsx',
};
