import get from 'lodash/get';

/* ============================================ */
/* ====== SELLER INVENTORY MAIN TABLE ========= */
/* ============================================ */

/* Selector to get the loading state for the table */
export const getIsLoadingSellerInventoryTable = (state: any) => {
  return get(state, 'sellerInventory.isLoadingSellerInventoryTable');
};

/* Selector to get the seller inventory table results */
export const getSellerInventoryTableResults = (state: any) => {
  return get(state, 'sellerInventory.sellerInventoryTableResults');
};

/* Selector to get seller inventory table pagination info */
export const getSellerInventoryTablePaginationInfo = (state: any) => {
  return get(state, 'sellerInventory.sellerInventoryTablePaginationInfo');
};

/* Selector to get seller inventory table expanded row */
export const getSellerInventoryTableExpandedRow = (state: any) => {
  return get(state, 'sellerInventory.sellerInventoryTableExpandedRow');
};

/* ============================================ */
/* ====== SELLER INVENTORY PRODUCTS TABLE ========= */
/* ============================================ */

/* Selector to get the loading state for seller inventory products table */
export const getIsLoadingSellerInventoryProductsTable = (state: any) => {
  return get(state, 'sellerInventory.isLoadingSellerInventoryProductsTable');
};

/* Selector to get the seller inventory table results */
export const getSellerInventoryProductsTableResults = (state: any) => {
  return get(state, 'sellerInventory.sellerInventoryProductsTableResults');
};

/* Selector to get seller inventory table pagination info */
export const getSellerInventoryProductsTablePaginationInfo = (state: any) => {
  return get(state, 'sellerInventory.sellerInventoryProductsTablePaginationInfo');
};

/* Selector to get seller inventory table expanded row */
export const getSellerInventoryProductsTableExpandedRow = (state: any) => {
  return get(state, 'sellerInventory.sellerInventoryProductsTableExpandedRow');
};
