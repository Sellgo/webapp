import Axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppConfig } from '../../config';
import { SET_TOS, SET_PP, SET_NOTIFY_ID, actionTypes } from '../../constants/UserOnboarding/index';

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

export const fetchTOS = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const response = await Axios.get(AppConfig.BASE_URL_API + `content?type=terms_of_service`);
  if (response.data.length) {
    dispatch(setTOS(response.data));
  }
};

export const fetchPP = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const response = await Axios.get(AppConfig.BASE_URL_API + `content?type=privacy_policy`);
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
