import get from 'lodash/get';

/* Selector to get all filters from products database */
export const getProductsDatabaseFilters = (state: any) => {
  return get(state, 'productsDatabase.productsDatabaseFilters');
};

/* Selector to get loading state for products database */
export const getIsLoadingProductsDatabase = (state: any) => {
  return get(state, 'productsDatabase.isLoadingProductsDatabase');
};

/* Selector to get  products database results */
export const getProductsDatabaseResults = (state: any) => {
  return get(state, 'productsDatabase.productsDatabaseResult');
};

/* Selector to get  products database results */
export const getProductsDatabasePaginationInfo = (state: any) => {
  return get(state, 'productsDatabase.productsDatabasePaginationInfo');
};

/* Selector to get the empty filter messages */
export const getFilterMessage = (state: any) => {
  return get(state, 'productsDatabase.showFilterMessage');
};
