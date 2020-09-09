import get from 'lodash/get';

export const isFetchingLeadsKPISelector = (state: {}) => get(state, 'leads.isFetchingLeadsKPI');
export const leads = (state: {}) => get(state, 'leads.trackerKPI');
export const fileSearch = (state: {}) => get(state, 'leads.fileSearch');
