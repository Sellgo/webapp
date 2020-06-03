import Axios from 'axios';
import { SET_PRICING_SUBSCRIPTIONS, SET_SELLER_SUBSCRIPTION } from '../../../constants/Settings';
import { AppConfig } from '../../../config';
import { warn } from '../../../utils/notifications';
import { auth } from '../../../containers/App/App';
import _ from 'lodash';
import moment from 'moment';

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
  return Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}/subscription`)
    .then(json => {
      const subscription = json.data || false;
      dispatch(setSellerSubscription(subscription));
      if (subscription === false) {
        warn("You don't have active subscription or your subscription has expired");
      } else if (subscription.subscription_id === 5) {
        dispatch(fetchSellerSubscriptionTrial(subscription));
      }
    })
    .catch(err => {
      if (err.response.status === 403) {
        auth.logout();
      }
    });
};

export const fetchSellerSubscriptionTrial = (subscription: any) => (dispatch: any) => {
  const data = _.cloneDeep(subscription);
  const sellerID = localStorage.getItem('userId');
  return Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}/subscription/trial`)
    .then(json => {
      const prevSubscriptionData = json.data[0] || false;
      const todayDate = moment();
      const expireDate = moment(prevSubscriptionData.expiry_date).diff(todayDate, 'days');
      if (prevSubscriptionData && prevSubscriptionData.expiry_date !== null && expireDate >= 0) {
        data.expiry_date = prevSubscriptionData.expiry_date;
        dispatch(setSellerSubscription(data));
      }
    })
    .catch(err => {
      console.log('console error: ', err);
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
