import get from 'lodash/get';

/* Selector to loading state for seller database */
export const getIsLoadingSellerDatabase = (state: any) => {
  return get(state, 'newSellerDatabase.isLoadingSellerDatabase');
};

/* Selector to get the empty filter messages */
export const getFilterMessage = (state: any) => {
  return get(state, 'newSellerDatabase.showFilterMessage');
};

/* Selector to get the empty filter messages */
export const getSellerDatabaseResults = (state: any) => {
  return get(state, 'newSellerDatabase.sellerDatabaseResults');
};
