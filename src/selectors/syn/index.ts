import get from 'lodash/get';

export const newSupplierIdSelector = (state: {}) => get(state, 'synReducer.new_supplier');
