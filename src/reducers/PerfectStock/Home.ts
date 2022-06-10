import { AnyAction } from 'redux';
import { setIn } from '../../utils/immutablity';

import { actionTypes, DEFAULT_SUB_CHART_SETTINGS } from '../../constants/PerfectStock/Cashflow';

const INITIAL_STATE = {
  isLoadingMainChart: false,
  mainChart: {
    total: '',
    results: [],
  },
  isLoadingSubCharts: false,
  subCharts: [],
  subChartSettings: DEFAULT_SUB_CHART_SETTINGS,
  cashflowOnboardingSettings: [],
};

const tplReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.IS_LOADING_MAIN_CHART: {
      return setIn(state, 'isLoadingMainChart', action.payload);
    }

    case actionTypes.SET_CASHFLOW_ONBOARDING_STATUS: {
      return setIn(state, 'cashflowOnboardingSettings', action.payload);
    }

    case actionTypes.SET_MAIN_CHART: {
      return setIn(state, 'mainChart', action.payload);
    }

    case actionTypes.IS_LOADING_SUB_CHARTS: {
      return setIn(state, 'isLoadingSubCharts', action.payload);
    }

    case actionTypes.SET_SUB_CHART: {
      return setIn(state, 'subCharts', action.payload);
    }

    case actionTypes.SET_SUB_CHART_SETTINGS: {
      return setIn(state, 'subChartSettings', action.payload);
    }

    default: {
      return state;
    }
  }
};

export default tplReducer;
