export const actionTypes = {
  /* Unified central export progress */
  SET_CENTRAL_EXPORT_PROGRESS: 'SET_CENTRAL_EXPORT_PROGRESS',

  /* Central Scraping progress */
  SET_SHOW_CENTRAL_SCRAPING_PROGRESS: 'SET_SHOW_CENTRAL_SCRAPING_PROGRESS',
  SET_CENTRAL_SCRAPING_PROGRESS: 'SET_CENTRAL_SCRAPING_PROGRESS',
  SET_ALLOW_LIVE_SCRAPING: 'SET_ALLOW_LIVE_SCRAPING',

  /* Seller Inventory Main Table types*/
  IS_LOADING_SELLER_INVENTORY_TABLE: 'IS_LOADING_SELLER_INVENTORY_TABLE',
  SET_SELLER_INVENTORY_TABLE_RESULTS: 'SET_SELLER_INVENTORY_TABLE_RESULTS',
  SET_SELLER_INVENTORY_TABLE_PAGINATION_INFO: 'SET_SELLER_INVENTORY_TABLE_PAGINATION_INFO',
  SET_SELLER_INVENTORY_TABLE_EXPANDED_ROW: 'SET_SELLER_INVENTORY_TABLE_EXPANDED_ROW',

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

/* Max live scraping allowed */
export const MAX_LIVE_SCRAPING_ALLOWED = 10;

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
  /* No sellers and no products */
  if (numOfProducts <= 0 && numofSellers <= 0) {
    return 250;
  }

  /* No sellers, little products */
  if (numOfProducts <= 5 && numofSellers <= 0) {
    return 400;
  }

  /* No sellers, many products */
  if (numOfProducts > 5 && numofSellers <= 0) {
    return 600;
  }

  /* Sellers present, little products exists */
  if (numOfProducts <= 5 && numofSellers > 0) {
    return 600;
  }

  /* Sellers present, many products exists */
  if (numOfProducts > 5 && numofSellers > 0) {
    return 1100;
  }
};

/* Calculate products table height */
export const calculateProductsTableHeight = (numOfProducts: number, numOfSellers: number) => {
  /* No sellers and no products */
  if (numOfProducts <= 0 && numOfSellers <= 0) {
    return 190;
  }

  /* No sellers, little products */
  if (numOfProducts <= 5 && numOfSellers <= 0) {
    return 400;
  }

  /* No sellers, many products */
  if (numOfProducts > 5 && numOfSellers <= 0) {
    return 500;
  }

  /* Sellers prsent, little products exist */
  if (numOfProducts <= 5 && numOfSellers > 0) {
    return 600;
  }

  /* Sellers present, many products exist */
  if (numOfProducts > 5 && numOfSellers > 0) {
    return 1000;
  }
};

/* Calculate products table expanded hieght */
export const calculateProductsTableExpandedHeight = (numOfSellers: number) => {
  if (numOfSellers <= 0) {
    return 200;
  }

  /* If products has little sellers */
  if (numOfSellers <= 5) {
    return 300;
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

  /* If products has little sellers */
  if (numOfSellers <= 5) {
    return 250;
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
  DONE: 'done',
  SUCCESS: 'success',
  PENDING: 'pending',
  FAILED: 'failed',
};

/* Possible Export types */
export const SELLER_INVENTORY_EXPORT_FILE_TYPES = {
  CSV: 'csv',
  XLSX: 'xlsx',
};

/* Seller Finder Live Scrapping Process type mapper */
export const FINDER_PROCESS_TYPE_MAPPER: { [key: string]: string } = {
  cluster_inventory: 'Check Inventories',
  cluster_merchant: 'Find Seller',
  cluster_asin: 'Check Sellers',
};
