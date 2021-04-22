import get from 'lodash/get';

export const loadingSellers = (state: {}) => get(state, 'sellerFinder.fetchingSellers');
export const sellers = (state: {}) => get(state, 'sellerFinder.sellers');
export const failed = (state: {}) => get(state, 'sellerFinder.error');
export const loadingInventory = (state: {}) => get(state, 'sellerFinder.loadingInventory');
export const sellerProducts = (state: {}) => get(state, 'sellerFinder.sellerProducts');
export const loadingSellerProducts = (state: {}) =>
  get(state, 'sellerFinder.loadingSellerProducts');
export const sellerProductsError = (state: {}) =>
  get(state, 'sellerFinder.errorFetchingSellerProducts');
export const productSellers = (state: {}) => get(state, 'sellerFinder.productSellers');
export const loadingProductSellers = (state: {}) =>
  get(state, 'sellerFinder.loadingProductSellers');
export const productSellersError = (state: {}) =>
  get(state, 'sellerFinder.errorFetchingProductSellers');

/* Select seller track groups */
export const selectSellerTrackGroups = (state: {}) => get(state, 'sellerFinder.sellerTrackGroups');

/* Select active menu group */
export const selectActiveMenuGroupID = (state: {}) => get(state, 'sellerFinder.menuItem');
