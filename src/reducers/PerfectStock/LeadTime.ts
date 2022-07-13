import { AnyAction } from 'redux';
import { setIn } from '../../utils/immutablity';

import { actionTypes } from '../../constants/PerfectStock/LeadTime';

const INITIAL_STATE = {
  leadTimeProjectionId: -1,
  isFetchingProgressForLeadTimeJob: false,
  refreshProgress: 0,
};

const LeadTimeReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.SET_LEAD_TIME_JOB_PROJECTION_ID: {
      return setIn(state, 'leadTimeProjectionId', action.payload);
    }

    case actionTypes.SET_IS_FETCHING_PROGRESS_FOR_LEAD_TIME_JOB: {
      return setIn(state, 'isFetchingProgressForLeadTimeJob', action.payload);
    }

    case actionTypes.SET_REFRESH_PROGRESS: {
      return setIn(state, 'refreshProgress', action.payload);
    }

    default: {
      return state;
    }
  }
};

export default LeadTimeReducer;
