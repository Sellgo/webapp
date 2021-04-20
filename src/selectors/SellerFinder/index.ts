import get from 'lodash/get';

export const loadingSellers = (state: {}) => get(state, 'sellerFinder.fetchingSellers');
export const sellers = (state: {}) => get(state, 'sellerFinder.sellers');
export const failed = (state: {}) => get(state, 'sellerFinder.error');
export const loadingInventory = (state: {}) => get(state, 'sellerFinder.loadingInventory');
