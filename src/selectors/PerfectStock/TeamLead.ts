import get from 'lodash/get';

export const getTeamLeadProjectionId = (state: any) => {
  return get(state, 'teamLead.teamLeadProjectionId');
};

/* Selector to get status of is fetching progress for sales projection */
export const getIsFetchingProgressForTeamLeadJob = (state: any) => {
  return get(state, 'teamLead.isFetchingProgressForTeamLeadJob');
};

/* Selector to get progress for sales projection refresh */
export const getRefreshProgress = (state: any) => {
  return get(state, 'teamLead.refreshProgress');
};
