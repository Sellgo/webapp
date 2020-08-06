import Axios from 'axios';
import {
  SET_PRICING_SUBSCRIPTIONS,
  SET_SELLER_SUBSCRIPTION,
  SET_SUCCESS_PAYMENT,
} from '../../../constants/Settings';
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

export const createSubscription = (data: any) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  const bodyFormData = new FormData();
  bodyFormData.set('subscription_id', data.subscription_id);
  bodyFormData.set('payment_method_id', data.payment_method_id);
  return Axios.post(
    AppConfig.BASE_URL_API + `sellers/${sellerID}/subscription/create`,
    bodyFormData
  )
    .then((response: any) => {
      return {
        payment_method_id: data.payment_method_id,
        price_id: data.payment_method_id,
        subscription: response.data.stripe_subscription,
      };
    })
    .then(handleRequiresPaymentMethod)
    .then((data: any) => {
      if (data.subscription.status === 'active') {
        dispatch(setSuccessPayment(true));
        localStorage.removeItem('planType');
      }
    })
    .catch(err => {
      console.log('error: ', err);
    });
};

const handleRequiresPaymentMethod = (data: any) => {
  if (data.subscription.latest_invoice.payment_intent.status === 'requires_payment_method') {
    // Using localStorage to manage the state of the retry here,
    // feel free to replace with what you prefer.
    // Store the latest invoice ID and status.
    localStorage.setItem('latestInvoiceId', data.subscription.latest_invoice.id);
    localStorage.setItem(
      'latestInvoicePaymentIntentStatus',
      data.subscription.latest_invoice.payment_intent.status
    );
    throw { error: { message: 'Your card was declined.' } };
  } else {
    return data;
  }
};

export const retryInvoiceWithNewPaymentMethod = (data: any) => {
  const sellerID = localStorage.getItem('userId');
  const bodyFormData = new FormData();
  bodyFormData.set('payment_method_id', data.payment_method_id);
  bodyFormData.set('invoice_id', data.invoice_id);
  return Axios.post(AppConfig.BASE_URL_API + `sellers/${sellerID}/retry-invoice`, bodyFormData)
    .then(response => {
      console.log('response: ', response);
    })
    .catch(err => {
      console.log('error: ', err);
    });
};

export const fetchSellerSubscriptionTrial = (subscription: any) => (dispatch: any) => {
  const data = _.cloneDeep(subscription);
  const sellerID = localStorage.getItem('userId');
  return Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}/subscription/trial`)
    .then(json => {
      const prevSubscriptionData = json.data[0] || false;
      const todayDate = new Date();
      const expireDate = moment(new Date(prevSubscriptionData.expiry_date)).diff(todayDate, 'days');
      if (prevSubscriptionData && prevSubscriptionData.expiry_date !== null && expireDate >= 0) {
        data.expiry_date = prevSubscriptionData.expiry_date;
        dispatch(setSellerSubscription(data));
      } else {
        dispatch(fetchSellerSubscriptionPaid(data));
      }
    })
    .catch(err => {
      console.log('console error: ', err);
    });
};

export const fetchSellerSubscriptionPaid = (subscription: any) => (dispatch: any) => {
  const data = _.cloneDeep(subscription);
  const sellerID = localStorage.getItem('userId');
  return Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}/subscription/paid`)
    .then(json => {
      const prevSubscriptionData = json.data[0] || false;
      if (prevSubscriptionData && prevSubscriptionData.status !== null) {
        data.expiry_date = -1;
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

export const setSuccessPayment = (data: any) => ({
  type: SET_SUCCESS_PAYMENT,
  payload: data,
});

export const setSellerSubscription = (data: any) => ({
  type: SET_SELLER_SUBSCRIPTION,
  payload: data,
});
