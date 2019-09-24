import axios from 'axios';
import {
  GET_SUBSCRIPTIONS,
  GET_SELLER_SUBSCRIPTION,
  UPDATE_SELLER_SUBSCRIBTION,
} from '../constant/constant';
import { AppConfig } from '../config';

export interface Subscription {
  id: string;
  name: string;
  price: number;
  synthesis_limit: number;
  track_limit: number;
}

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('idToken')}`,
  'Content-Type': `multipart/form-data`,
});

export const getSubscriptions = () => (dispatch: any) => {
  const url = AppConfig.BASE_URL_API + 'subscriptions';
  return axios({
    method: 'GET',
    url,
    headers: getHeaders(),
  })
    .then(json => {
      dispatch(getSubscriptionsDispatch(json.data));
    })
    .catch(err => {});
};

export const getSellerSubscription = () => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  const url = AppConfig.BASE_URL_API + `sellers/${sellerID}/subscription`;
  return axios({
    method: 'GET',
    url,
    headers: getHeaders(),
  })
    .then(json => {
      dispatch(getSellerSubscriptionDispatch(json.data[0]));
    })
    .catch(err => {});
};

export const updateSellerSubscription = (subscription: Subscription, token_id: any) => (
  dispatch: any
) => {
  const sellerID = localStorage.getItem('userId');
  const formData = new FormData();
  formData.append('seller_id', JSON.stringify(sellerID));
  formData.append('subscription_id', subscription.id);
  formData.append('token_id', token_id);
  return axios({
    method: 'POST',
    url: AppConfig.BASE_URL_API + `sellers/${sellerID}/subscription`,
    data: formData,
    headers: getHeaders(),
  })
    .then(json => {
      Promise.resolve(dispatch(getSellerSubscription()))
        .then(() =>
          dispatch({
            type: UPDATE_SELLER_SUBSCRIBTION,
            data: { key: 'success', value: true },
          })
        )
        .then(() =>
          dispatch({
            type: UPDATE_SELLER_SUBSCRIBTION,
            data: { key: 'success', value: undefined },
          })
        );
    })
    .catch(error => {
      Promise.resolve(
        dispatch({
          type: UPDATE_SELLER_SUBSCRIBTION,
          data: { key: 'success', value: false },
        })
      ).then(() =>
        dispatch({
          type: UPDATE_SELLER_SUBSCRIBTION,
          data: { key: 'success', value: undefined },
        })
      );
    });
};

export const getSubscriptionsDispatch = (data: any) => ({
  type: GET_SUBSCRIPTIONS,
  data,
});

export const getSellerSubscriptionDispatch = (data: any) => ({
  type: GET_SELLER_SUBSCRIPTION,
  data,
});
