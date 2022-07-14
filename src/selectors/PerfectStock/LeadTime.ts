import get from 'lodash/get';

export const getLeadTimeProjectionId = (state: any) => {
  return get(state, 'leadTime.leadTimeProjectionId');
};

/* Selector to get status of is fetching progress for sales projection */
export const getIsFetchingProgressForLeadTimeJob = (state: any) => {
  return get(state, 'leadTime.isFetchingProgressForLeadTimeJob');
};

/* Selector to get progress for sales projection refresh */
export const getRefreshProgress = (state: any) => {
  return get(state, 'leadTime.refreshProgress');
};
