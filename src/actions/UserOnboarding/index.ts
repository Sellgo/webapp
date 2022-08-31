import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { AppConfig } from '../../config';
import { SET_TOS, SET_PP, SET_NOTIFY_ID, actionTypes } from '../../constants/UserOnboarding/index';
import { isSellgoSession } from '../../utils/session';

import { sellerIDSelector } from '../../selectors/Seller';

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
  const response = await axios.get(AppConfig.BASE_URL_API + `content?type=` + tos_type);
  if (response.data.length) {
    dispatch(setTOS(response.data));
  }
};

const pp_type = isSellgoSession() ? 'privacy_policy' : 'aistock_privacy_policy';
export const fetchPP = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const response = await axios.get(AppConfig.BASE_URL_API + `content?type=` + pp_type);
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
  dispatch: any
) => {
  const sellerID = sellerIDSelector();
  // const perfectStockGetStartedStatus = getState().userOnboarding.perfectStockGetStartedStatus;
  let payloadKey: any;
  if (key === 'connectAmazonStore') {
    payloadKey = 'connect_amazon_store';
  } else if (key === 'createLeadTime') {
    payloadKey = 'setup_lead_time';
  } else if (key === 'orderPlanningTour') {
    payloadKey = 'tour_order_planning';
  } else if (key === 'salesProjectionTour') {
    payloadKey = 'tour_sales_projection';
  } else if (key === 'changeRestockLimits') {
    payloadKey = 'restock_limit';
  }
  const payload = {
    [payloadKey]: status,
  };
  try {
    const { data } = await axios.patch(
      `${AppConfig.BASE_URL_API}sellers/${sellerID}/perfect-stock/onboarding`,
      payload
    );
    const perfectStockGetStartedStatus = {
      connectAmazonStore: data?.connect_amazon_store,
      createLeadTime: data?.setup_lead_time,
      orderPlanningTour: data?.tour_order_planning,
      salesProjectionTour: data?.tour_sales_projection,
      changeRestockLimits: data?.restock_limit,
    };

    dispatch(setPerfectStockGetStartedStatus(perfectStockGetStartedStatus));
  } catch (err) {
    console.log(err);
  }
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

export const fetchPerfectStockGetStartedStatus = () => async (dispatch: any) => {
  const sellerID = sellerIDSelector();
  try {
    const { data } = await axios.get(
      `${AppConfig.BASE_URL_API}sellers/${sellerID}/perfect-stock/onboarding`
    );
    const perfectStockGetStartedStatus = {
      connectAmazonStore: data?.connect_amazon_store,
      createLeadTime: data?.setup_lead_time,
      orderPlanningTour: data?.tour_order_planning,
      salesProjectionTour: data?.tour_sales_projection,
      changeRestockLimits: data?.restock_limit,
    };

    dispatch(setPerfectStockGetStartedStatus(perfectStockGetStartedStatus));
  } catch (err) {
    console.log(err);
  }
};

export const setShowGetStarted = (showGetStarted: boolean) => ({
  type: actionTypes.SET_SHOW_GET_STARTED,
  payload: showGetStarted,
});
