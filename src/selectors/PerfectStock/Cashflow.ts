import get from 'lodash/get';

export const getIsLoadingMainChart = (state: any) => {
  return get(state, 'home.isLoadingMainChart');
};

export const getMainChart = (state: any) => {
  return get(state, 'home.mainChart');
};

export const getIsLoadingSubCharts = (state: any) => {
  return get(state, 'home.isLoadingSubCharts');
};

export const getSubCharts = (state: any) => {
  return get(state, 'home.subCharts');
};

export const getSubChartSettings = (state: any) => {
  return get(state, 'home.subChartSettings');
};

export const getCashflowOnboardingStatus = (state: any) => {
  return get(state, 'home.cashflowOnboardingSettings');
};
