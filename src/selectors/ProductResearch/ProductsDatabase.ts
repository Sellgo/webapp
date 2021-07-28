import get from 'lodash/get';

/* Selector to get all filters from products database */
export const getProductsDatabaseFilters = (state: any) => {
  return get(state, 'productsDatabase.productsDatabaseFilters');
};
