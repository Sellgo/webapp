import { AnyAction } from 'redux';
import { setIn } from '../../utils/immutablity';

import { actionTypes } from '../../constants/PerfectStock/TeamLead';

const INITIAL_STATE = {
  teamLeadProjectionId: -1,
  isFetchingProgressForTeamLeadJob: false,
  refreshProgress: 0,
};

const TeamLeadReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.SET_TEAM_LEAD_JOB_PROJECTION_ID: {
      return setIn(state, 'teamLeadProjectionId', action.payload);
    }

    case actionTypes.SET_IS_FETCHING_PROGRESS_FOR_TEAM_LEAD_JOB: {
      return setIn(state, 'isFetchingProgressForTeamLeadJob', action.payload);
    }

    case actionTypes.SET_REFRESH_PROGRESS: {
      return setIn(state, 'refreshProgress', action.payload);
    }

    default: {
      return state;
    }
  }
};

export default TeamLeadReducer;
