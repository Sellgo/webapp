import get from 'lodash/get';

export const trackerProductDetails = (state: {}) => get(state, 'productTracker.trackerDetails');
export const loadingOOS90 = (state: {}) => get(state, 'productTracker.loadingOOS90');
export const getOOS90 = (state: {}) => get(state, 'productTracker.OOS90');
