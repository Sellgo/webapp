import get from 'lodash/get';

/* Selector to loading state for seller database */
export const getIsLoadingSellerDatabase = (state: any) => {
  return get(state, 'sellerDatabase.isLoadingSellerDatabase');
};

/* Selector to get the empty filter messages */
export const getFilterMessage = (state: any) => {
  return get(state, 'sellerDatabase.showFilterMessage');
};

/* Selector to get the empty filter messages */
export const getSellerDatabaseResults = (state: any) => {
  return get(state, 'sellerDatabase.sellerDatabaseResults');
};

/* Selector to get seller database pagination info */
export const getSellerDatabasePaginationInfo = (state: any) => {
  return get(state, 'sellerDatabase.sellerDatabasePaginationInfo');
};

/* Selector to get seller database marketplace info */
export const getSellerDatabaseMarketplaceInfo = (state: any) => {
  return get(state, 'sellerDatabase.sellerMarketplace');
};
