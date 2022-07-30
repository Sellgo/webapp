import Axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppConfig } from '../../config';
import { SET_TOS, SET_PP, SET_NOTIFY_ID, actionTypes } from '../../constants/UserOnboarding/index';
import { isSellgoSession } from '../../utils/session';

export const setNotifyId = (notifyId: number) => ({
  type: SET_NOTIFY_ID,
  payload: notifyId,
});

export const setTOS = (termsOfService: string) => ({
  type: SET_TOS,
  payload: termsOfService,
});

export const setPP = (privacyPolicy: string) => ({
  type: SET_PP,
  payload: privacyPolicy,
});

const tos_type = isSellgoSession() ? 'terms_of_service' : 'aistock_terms_of_service';
export const fetchTOS = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const response = await Axios.get(AppConfig.BASE_URL_API + `content?type=` + tos_type);
  if (response.data.length) {
    dispatch(setTOS(response.data));
  }
};

const pp_type = isSellgoSession() ? 'privacy_policy' : 'aistock_privacy_policy';
export const fetchPP = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const response = await Axios.get(AppConfig.BASE_URL_API + `content?type=` + pp_type);
  if (response.data.length) {
    dispatch(setPP(response.data));
  }
};

/* Action to to toggle user onboarding */
export const setUserOnboarding = (payload: boolean) => {
  return {
    type: actionTypes.SET_USER_ONBOARDING,
    payload,
  };
};

/* Action to set user onboarding resources */
export const setUserOnboardingResources = (payload: any) => {
  return {
    type: actionTypes.SET_USER_ONBOARDING_RESOURCES,
    payload,
  };
};

export const setPerfectStockGetStartedStatus = (perfectStockGetStartedStatus: any) => ({
  type: actionTypes.SET_PERFECT_STOCK_GET_STARTED_STATUS,
  payload: perfectStockGetStartedStatus,
});

export const updatePerfectStockGetStartedStatus = (key: string, status: boolean) => async (
  dispatch: any,
  getState: any
) => {
  const perfectStockGetStartedStatus = getState().userOnboarding.perfectStockGetStartedStatus;
  const updatedPerfectStockGetStartedStatus = {
    ...perfectStockGetStartedStatus,
    [key]: status,
  };
  dispatch(setPerfectStockGetStartedStatus(updatedPerfectStockGetStartedStatus));
};

export const setPerfectStockGetStartedJoyRideStatus = (
  perfectStockGetStartedJoyRideStatus: any
) => ({
  type: actionTypes.SET_PERFECT_STOCK_GET_STARTED_JOY_RIDE_STATUS,
  payload: perfectStockGetStartedJoyRideStatus,
});

export const updatePerfectStockGetStartedJoyRideStatus = (key: string, status: boolean) => async (
  dispatch: any,
  getState: any
) => {
  const perfectStockGetStartedJoyRideStatus = getState().userOnboarding
    .perfectStockGetStartedJoyRideStatus;
  const updatedPerfectStockGetStartedJoyRideStatus = {
    ...perfectStockGetStartedJoyRideStatus,
    [key]: status,
  };
  dispatch(setPerfectStockGetStartedJoyRideStatus(updatedPerfectStockGetStartedJoyRideStatus));
};
