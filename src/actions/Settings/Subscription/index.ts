import Axios from 'axios';
import { SET_PRICING_SUBSCRIPTIONS, SET_SELLER_SUBSCRIPTION } from '../../../constants/Settings';
import { AppConfig } from '../../../config';
import { error } from '../../../utils/notifications';

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
      if (subscription === false) {
        error("You don't have active subscription or your subscription has expired");
      }
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
