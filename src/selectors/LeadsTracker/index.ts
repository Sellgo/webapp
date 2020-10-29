import get from 'lodash/get';

export const loadingLeads = (state: {}) => get(state, 'leads.isFetchingLeadsKPI');
export const leads = (state: {}) => get(state, 'leads.trackerKPI');
export const filters = (state: {}) => get(state, 'leads.filters');
export const loadingFilters = (state: {}) => get(state, 'leads.fetchingFilters');
export const getPageSize = (state: {}) => get(state, 'leads.pageSize');
