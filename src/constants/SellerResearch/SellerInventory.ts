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

export const calculateSellerInventoryTableExpandedHeight = (
  numOfProducts: number,
  numofSellers: number
) => {
  /* When no products and no sellers */
  if (numOfProducts <= 0 && numofSellers <= 0) {
    return 230;
  }

  /* When sellers have products */
  if (numOfProducts > 0 && numofSellers <= 0) {
    const PRODUCTS_ROWS_OFFSET = 8;

    const sellerInventoryTableExpandedHeight =
      (numOfProducts + PRODUCTS_ROWS_OFFSET) * SELLER_INVENTORY_PRODUCTS_TABLE_ROW_HEIGHT;

    return sellerInventoryTableExpandedHeight;
  }

  /* When seller has both products and product has sellers */
  if (numOfProducts > 0 && numofSellers > 0) {
    const OFFSET_SPACING = 100;
    const sellerInventoryProductsTable = numOfProducts * SELLER_INVENTORY_PRODUCTS_TABLE_ROW_HEIGHT;

    const sellerInventorySellersTable =
      numOfProducts * SELLER_INVENTORY_PRODUCTS_TABLE_SELLER_ROW_HEIGHT;

    const totalHeight = sellerInventoryProductsTable + sellerInventorySellersTable + OFFSET_SPACING;

    console.log({
      name: 'Seller Inventorty Expanded Height',
      numOfProducts,
      numofSellers: 0,
      value: totalHeight,
    });

    return totalHeight;
  }
};

export const calculateProductsTableHeight = (numOfProducts: number, numOfSellers: number) => {
  /* When no products and no sellers */
  if (numOfProducts <= 0 && numOfSellers <= 0) {
    return 150;
  }

  /* When products exists */
  if (numOfProducts > 0 && numOfSellers <= 0) {
    const EMPTY_SPACE_OFFSET = 320;

    const productsTableHeight =
      numOfProducts * SELLER_INVENTORY_PRODUCTS_TABLE_ROW_HEIGHT + EMPTY_SPACE_OFFSET;

    return productsTableHeight;
  }

  /* When seller has both products and product has sellers */
  if (numOfProducts > 0 && numOfSellers > 0) {
    const sellerInventoryProductsTable = numOfProducts * SELLER_INVENTORY_PRODUCTS_TABLE_ROW_HEIGHT;

    const sellerInventorySellersTable =
      numOfSellers * SELLER_INVENTORY_PRODUCTS_TABLE_SELLER_ROW_HEIGHT;

    const totalHeight = sellerInventoryProductsTable + sellerInventorySellersTable;

    console.log({
      name: 'Products Table Height',
      numOfProducts,
      numofSellers: 0,
      value: totalHeight,
    });

    return totalHeight;
  }
};

/* Calculate products table expanded hieght */
export const calculateProductsTableExpandedHeight = (numOfSellers: number) => {
  if (numOfSellers <= 0) {
    return 200;
  }

  /* If products has sellers */
  if (numOfSellers > 0) {
    const OFFSET_ROWS = 4;
    const value = (numOfSellers + OFFSET_ROWS) * SELLER_INVENTORY_PRODUCTS_TABLE_SELLER_ROW_HEIGHT;
    console.log({
      name: 'Products Expanded Height',
      numOfSellers,
      value,
    });

    return value;
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
    const OFFSET_ROWS = 2;
    const height = (numOfSellers + OFFSET_ROWS) * SELLER_INVENTORY_PRODUCTS_TABLE_SELLER_ROW_HEIGHT;

    console.log({
      name: 'Sellers Table Height',
      value: height,
    });

    return height;
  }
};
