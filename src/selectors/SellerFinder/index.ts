import get from 'lodash/get';

export const loadingSellers = (state: {}) => get(state, 'sellerFinder.fetchingSellers');
export const sellers = (state: {}) => get(state, 'sellerFinder.sellers');
export const failed = (state: {}) => get(state, 'sellerFinder.error');
export const loadingInventory = (state: {}) => get(state, 'sellerFinder.loadingInventory');
export const sellerProducts = (state: {}) => get(state, 'sellerFinder.sellerProducts');
export const activeProduct = (state: {}) => get(state, 'sellerFinder.activeProduct');
export const loadingSellerProducts = (state: {}) =>
  get(state, 'sellerFinder.loadingSellerProducts');
export const sellerProductsError = (state: {}) =>
  get(state, 'sellerFinder.errorFetchingSellerProducts');
export const productSellers = (state: {}) => get(state, 'sellerFinder.productSellers');
export const loadingProductSellers = (state: {}) =>
  get(state, 'sellerFinder.loadingProductSellers');
export const productSellersError = (state: {}) =>
  get(state, 'sellerFinder.errorFetchingProductSellers');
export const sellerProductsCount = (state: {}) => get(state, 'sellerFinder.productsCount');
export const sellerProductsPageCount = (state: {}) => get(state, 'sellerFinder.productsPageCount');
export const sellerProductsPageNo = (state: {}) => get(state, 'sellerFinder.productsPageNo');
export const sellerProductsPageSize = (state: {}) => get(state, 'sellerFinder.productsPageSize');
export const sellerProductsSinglePageItemsCount = (state: {}) =>
  get(state, 'sellerFinder.productsSinglePageItemsCount');
export const activeProductSellerStatus = (state: {}) =>
  get(state, 'sellerFinder.activeProductSellerStatus');

/* Select seller track groups */
export const selectSellerTrackGroups = (state: {}) => get(state, 'sellerFinder.sellerTrackGroups');

/* Select active menu group */
export const selectActiveMenuGroupID = (state: {}) => get(state, 'sellerFinder.sellerMenuItem');
export const productSellerTrackStatus = (state: {}) =>
  get(state, 'sellerFinder.productSellerTrackStatus');

export const sellersCount = (state: {}) => get(state, 'sellerFinder.sellersCount');
export const sellersPageCount = (state: {}) => get(state, 'sellerFinder.sellersPageCount');
export const sellersPageNo = (state: {}) => get(state, 'sellerFinder.sellersPageNo');
export const sellersPageSize = (state: {}) => get(state, 'sellerFinder.sellersPageSize');
export const sellersSinglePageItemsCount = (state: {}) =>
  get(state, 'sellerFinder.sellersSinglePageItemsCount');
export const sellersLoading = (state: {}) => get(state, 'sellerFinder.loadingSellers');
export const sellersSort = (state: {}) => get(state, 'sellerFinder.sellersSort');
export const sellersSortDirection = (state: {}) => get(state, 'sellerFinder.sellersSortDirection');
export const loadingSellersFilters = (state: {}) =>
  get(state, 'sellerFinder.loadingSellersFilters');
export const sellersFilters = (state: {}) => get(state, 'sellerFinder.sellersFilters');

export const activeSellerIndex = (state: {}) => get(state, 'sellerFinder.activeSellerIndex');
export const activeSellerHeight = (state: {}) => get(state, 'sellerFinder.activeSellerHeight');

export const activeProductIndex = (state: {}) => get(state, 'sellerFinder.activeProductIndex');
export const activeProductHeight = (state: {}) => get(state, 'sellerFinder.activeProductHeight');

export const activeProductSellerIndex = (state: {}) =>
  get(state, 'sellerFinder.activeProductSellerIndex');
