import Axios from 'axios';
import { SET_PRICING_SUBSCRIPTIONS, SET_SELLER_SUBSCRIPTION } from '../../../constants/Settings';
import { AppConfig } from '../../../config';
import { warn } from '../../../utils/notifications';
import { auth } from '../../../containers/App/App';
import _ from 'lodash';

export const fetchSubscriptions = () => (dispatch: any) => {
  return Axios.get(AppConfig.BASE_URL_API + 'subscriptions')
    .then(json => {
      dispatch(setSubscriptions(json.data));
    })
    .catch(() => {
      //display error
    });
};

export const fetchSellerSubscription = () => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');

  const type =
    localStorage.getItem('accountType') !== undefined &&
    !_.isEmpty(localStorage.getItem('accountType'))
      ? `?type=${localStorage.getItem('accountType')}`
      : '';
  return Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}/subscription${type}`)
    .then(json => {
      console.log('subscription: ', json.data);
      const subscription = json.data || false;
      dispatch(setSellerSubscription(subscription));
      if (subscription === false) {
        warn("You don't have active subscription or your subscription has expired");
      }
    })
    .catch(err => {
      if (err.response.status === 403) {
        auth.logout();
      }
    });
};

export const setSubscriptions = (data: any) => ({
  type: SET_PRICING_SUBSCRIPTIONS,
  payload: data,
});

export const setSellerSubscription = (data: any) => ({
  type: SET_SELLER_SUBSCRIPTION,
  payload: data,
});
