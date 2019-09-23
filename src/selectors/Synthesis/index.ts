import get from 'lodash/get';

export const newSupplierIdSelector = (state: {}) => get(state, 'synthesis.new_supplier');

export const supplierMetricsSelector = (state: {}) => get(state, 'synthesis.time_efficiency_data');
