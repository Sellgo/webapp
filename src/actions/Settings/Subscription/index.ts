import Axios from 'axios';
import { SET_PRICING_SUBSCRIPTIONS, SET_SELLER_SUBSCRIPTION } from '../../../constants/Settings';
import { AppConfig } from '../../../config';

export const fetchSubscriptions = () => (dispatch: any) => {
  return Axios.get(AppConfig.BASE_URL_API + 'subscriptions')
    .then(json => {
      dispatch(setSubscriptions(json.data));
    })
    .catch(err => {});
};

export const fetchSellerSubscription = () => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  return Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}/subscription`)
    .then(json => {
      const subscription = json.data || false;
      dispatch(setSellerSubscription(subscription));
    })
    .catch(err => {});
};

export const setSubscriptions = (data: any) => ({
  type: SET_PRICING_SUBSCRIPTIONS,
  payload: data,
});

export const setSellerSubscription = (data: any) => ({
  type: SET_SELLER_SUBSCRIPTION,
  payload: data,
});
