import get from 'lodash/get';

export const newSupplierIdSelector = (state: {}) => get(state, 'synReducer.new_supplier');

export const supplierMetricsSelector = (state: {}) => get(state, 'synReducer.time_efficiency_data');
