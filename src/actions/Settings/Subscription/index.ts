import Axios from 'axios';
import {
  GET_SUBSCRIPTIONS,
  GET_SELLER_SUBSCRIPTION,
  UPDATE_SELLER_SUBSCRIBTION,
} from '../../../constants/Settings';
import { AppConfig } from '../../../config';
import { Subscription } from '../../../interfaces/Seller';

export const getSubscriptions = () => (dispatch: any) => {
  return Axios.get(AppConfig.BASE_URL_API + 'subscriptions')
    .then(json => {
      dispatch(getSubscriptionsDispatch(json.data));
    })
    .catch(err => {});
};

export const getSellerSubscription = () => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  return Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}/subscription`)
    .then(json => {
      dispatch(getSellerSubscriptionDispatch(json.data[0]));
    })
    .catch(err => {});
};

export const updateSellerSubscription = (subscription: Subscription, token_id: any) => (
  dispatch: any
) => {
  const sellerID = localStorage.getItem('userId');
  const bodyFormData = new FormData();
  bodyFormData.append('seller_id', JSON.stringify(sellerID));
  bodyFormData.append('subscription_id', subscription.id);
  bodyFormData.append('token_id', token_id);
  return Axios.post(AppConfig.BASE_URL_API + `sellers/${sellerID}/subscription`, bodyFormData)
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
