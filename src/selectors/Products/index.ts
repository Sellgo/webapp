import get from 'lodash/get';

export const isFetchingRankSelector = (state: {}) => get(state, 'product.isFetchingRank');
export const isFetchingPriceSelector = (state: {}) => get(state, 'product.isFetchingPrice');
export const isFetchingInventorySelector = (state: {}) => get(state, 'product.isFetchingInventory');
export const isFetchingRatingSelector = (state: {}) => get(state, 'product.isFetchingRating');
export const isFetchingReviewSelector = (state: {}) => get(state, 'product.isFetchingReview');
export const isFetchingSellerInventorySelector = (state: {}) =>
  get(state, 'product.isFetchingSellerInventory');
export const isFetchingKPISelector = (state: {}) => get(state, 'product.isFetchingKPI');
export const activeExportFiles = (state: {}) => get(state, 'product.activeExportFiles');
export const isFetchingActiveExports = (state: {}) => get(state, 'product.fetchingActiveExports');
