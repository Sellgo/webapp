import { setIn } from '../../utils/immutablity';
import { AnyAction } from 'redux';
import { SET_TOS, SET_PP, SET_NOTIFY_ID, actionTypes } from '../../constants/UserOnboarding';

const initialState = {
  termsOfService: '',
  privacyPolicy: '',
  notifyId: 0,

  /* New user onboarding */
  setUserOnboarding: false,
  userOnboardingResources: [],
  perfectStockGetStartedStatus: {
    connectAmazonStore: true,
    createLeadTime: false,
    salesProjectionTour: false,
    orderPlanningTour: false,
  },
  perfectStockGetStartedJoyRideStatus: {
    isSalesProjectionTourRunning: false,
    isOrderPlanningTourRunning: false,
  },
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_TOS:
      return setIn(state, 'termsOfService', action.payload);
    case SET_PP:
      return setIn(state, 'privacyPolicy', action.payload);
    case SET_NOTIFY_ID:
      return setIn(state, 'notifyId', action.payload);

    case actionTypes.SET_USER_ONBOARDING: {
      return setIn(state, 'setUserOnboarding', action.payload);
    }

    case actionTypes.SET_USER_ONBOARDING_RESOURCES: {
      return setIn(state, 'userOnboardingResources', action.payload);
    }

    case actionTypes.SET_PERFECT_STOCK_GET_STARTED_STATUS: {
      return setIn(state, 'perfectStockGetStartedStatus', action.payload);
    }

    case actionTypes.SET_PERFECT_STOCK_GET_STARTED_JOY_RIDE_STATUS: {
      return setIn(state, 'perfectStockGetStartedJoyRideStatus', action.payload);
    }
    default:
      return state;
  }
};
