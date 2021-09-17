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
  return get(state, 'sellerInventoryTablePaginationInfo.sellerInventoryTableExpandedRow');
};
