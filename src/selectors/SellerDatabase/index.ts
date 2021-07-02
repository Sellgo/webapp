import get from 'lodash/get';

export const loadingSellerDatabase = (state: {}) =>
  get(state, 'sellerDatabase.loadingSellerDatabase');
export const loadingDatabase = (state: {}) => get(state, 'sellerDatabase.loadingDatabase');
export const sellerDatabase = (state: {}) => get(state, 'sellerDatabase.database');
export const pageSize = (state: {}) => get(state, 'sellerDatabase.pageSize');
export const pageNo = (state: {}) => get(state, 'sellerDatabase.pageNo');
export const pageCount = (state: {}) => get(state, 'sellerDatabase.pageCount');
export const databaseCount = (state: {}) => get(state, 'sellerDatabase.databaseCount');
export const error = (state: {}) => get(state, 'sellerDatabase.error');
export const singlePageItemsCount = (state: {}) =>
  get(state, 'sellerDatabase.singlePageItemsCount');
export const databaseSort = (state: {}) => get(state, 'sellerDatabase.databaseSort');
export const databaseSortDirection = (state: {}) =>
  get(state, 'sellerDatabase.databaseSortDirection');
export const sellerDatabaseFilters = (state: {}) => get(state, 'sellerDatabase.filters');
export const sellerDatabaseMarket = (state: {}) => get(state, 'sellerDatabase.market');
