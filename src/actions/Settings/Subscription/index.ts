import Axios from 'axios';
import { SET_PRICING_SUBSCRIPTIONS, SET_SELLER_SUBSCRIPTION } from '../../../constants/Settings';
import { AppConfig } from '../../../config';
import { Subscription } from '../../../interfaces/Seller';
import { success, error } from '../../../utils/notifications';

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
      dispatch(setSellerSubscription(json.data));
    })
    .catch(err => {});
};

export const updateSellerSubscription = (subscription: Subscription, tokenID: any) => (
  dispatch: any
) => {
  const sellerID = localStorage.getItem('userId');
  const bodyFormData = new FormData();
  bodyFormData.append('seller_id', JSON.stringify(sellerID));
  bodyFormData.append('subscription_id', subscription.id);
  bodyFormData.append('token_id', tokenID);
  return Axios.post(AppConfig.BASE_URL_API + `sellers/${sellerID}/subscription`, bodyFormData)
    .then(json => {
      dispatch(setSellerSubscription(json.data));
      success('Payment Successful!');
    })
    .catch(err => {
      error(err.response.data.message || 'Payment Unsuccesful. Please try again!');
    });
};

export const setSubscriptions = (data: any) => ({
  type: SET_PRICING_SUBSCRIPTIONS,
  payload: data,
});

export const setSellerSubscription = (data: any) => ({
  type: SET_SELLER_SUBSCRIPTION,
  payload: data || false,
});
