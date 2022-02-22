import { AnyAction } from 'redux';
import { setIn } from '../../utils/immutablity';

import { actionTypes } from '../../constants/PerfectStock/SalesProjection';

const INITIAL_STATE = {
  salesProjectionUpdateDate: '',
  isLoadingSalesProjection: false,
  salesProjectionResult: [],
  refreshSalesProjectionId: -1,
  isFetchingProgressForRefresh: false,
  refreshProgress: 0,
};

const salesProjectionReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.IS_LOADING_SALES_PROJECTION_RESULTS: {
      return setIn(state, 'isLoadingSalesProjection', action.payload);
    }

    case actionTypes.SET_SALES_PROJECTION_RESULTS: {
      return setIn(state, 'salesProjectionResult', action.payload);
    }

    case actionTypes.SET_SALES_PROJECTION_UPDATE_DATE: {
      return setIn(state, 'salesProjectionUpdateDate', action.payload);
    }

    case actionTypes.SET_REFRESH_SALES_PROJECTION_ID: {
      return setIn(state, 'refreshSalesProjectionId', action.payload);
    }

    case actionTypes.SET_IS_FETCHING_PROGRESS_FOR_REFRESH: {
      return setIn(state, 'isFetchingProgressForRefresh', action.payload);
    }

    case actionTypes.SET_REFRESH_PROGRESS: {
      return setIn(state, 'refreshProgress', action.payload);
    }

    default: {
      return state;
    }
  }
};

export default salesProjectionReducer;
