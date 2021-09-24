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
/* ====== SELLER INVENTORY  TABLE GROUPS ========= */
/* ============================================ */

/* Selector to get all seller inventory table groups*/
export const getSellerInventoryTableGroups = (state: any) => {
  return get(state, 'sellerInventory.sellerInventoryTableGroups');
};

/* Selector to get the active seller inventory table group id */
export const getSellerInventoryTableActiveGroupId = (state: any) => {
  return get(state, 'sellerInventory.sellerInventoryTableActiveGroupId');
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

/* ======================================================== */
/* ====== SELLER INVENTORY PRODUCTS TABLE SELLERS ========= */
/* ========================================================= */

/* Selector to get the loading state for products sellers table */
export const getIsLoadingSellerInventoryProductsTableSellers = (state: any) => {
  return get(state, 'sellerInventory.isLoadingSellerInventoryProductsTableSellers');
};

/* Selector to get the results state for products sellers table */
export const getSellerInventoryProductsTableSellersResults = (state: any) => {
  return get(state, 'sellerInventory.sellerInventoryProductsTableSellersResults');
};

/* Selector to get the pagination state for products sellers table */
export const getSellerInventoryProductsTableSellersPaginationInfo = (state: any) => {
  return get(state, 'sellerInventory.sellerInventoryProductsTableSellersPaginationInfo');
};
