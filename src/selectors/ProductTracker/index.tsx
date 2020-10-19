import get from 'lodash/get';

export const trackerProductDetails = (state: {}) => get(state, 'productTracker.trackerDetails');
