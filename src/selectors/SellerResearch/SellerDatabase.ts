import get from 'lodash/get';

/* Selector to loading state for seller database */
export const getIsLoadingSellerDatabase = (state: any) => {
  return get(state, 'newSellerDatabase.isLoadingSellerDatabase');
};

/* Selector to get the empty filter messages */
export const getIsFilterEmptyMessage = (state: any) => {
  return get(state, 'newSellerDatabase.showEmptyFilterMessage');
};

/* Selector to get the empty filter messages */
export const getSellerDatabaseResults = (state: any) => {
  return get(state, 'newSellerDatabase.sellerDatabaseResults');
};
