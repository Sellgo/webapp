import get from 'lodash/get';

export const isFetchingRankSelector = (state: {}) => get(state, 'product.isFetchingRank');
export const isFetchingPriceSelector = (state: {}) => get(state, 'product.isFetchingPrice');
export const isFetchingInventorySelector = (state: {}) => get(state, 'product.isFetchingInventory');
export const isFetchingRatingSelector = (state: {}) => get(state, 'product.isFetchingRating');
export const isFetchingReviewSelector = (state: {}) => get(state, 'product.isFetchingReview');
export const isFetchingSellerInventorySelector = (state: {}) =>
  get(state, 'product.isFetchingSellerInventorySelector');
export const isFetchingKPISelector = (state: {}) => get(state, 'product.isFetchingKPI');
