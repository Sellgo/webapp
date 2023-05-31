import Axios from 'axios';
import {
  SET_PRICING_SUBSCRIPTIONS,
  SET_SELLER_SUBSCRIPTION,
  SET_SUCCESS_PAYMENT,
  SET_STRIPE_ERROR,
  SET_STRIPE_LOADING,
  SET_COUPON_APPLIED,
  SET_PROMO_CODE,
  SET_PROMO_LOADING,
  SET_PROMO_ERROR_MESSAGE,
} from '../../../constants/Settings';
import { AppConfig } from '../../../config';
import { error, success, warn } from '../../../utils/notifications';
import { auth } from '../../../containers/App/App';
import _ from 'lodash';
import moment from 'moment';
import stripe from '../../../stripe';

export const fetchSubscriptions = () => (dispatch: any) => {
  return Axios.get(AppConfig.BASE_URL_API + 'subscriptions')
    .then(json => {
      dispatch(setSubscriptions(json.data));
    })
    .catch(() => {
      //display error
    });
};

export const setPromoLoading = (isPromoLoading: boolean) => ({
  type: SET_PROMO_LOADING,
  payload: isPromoLoading,
});

export const setPromoError = (error: string) => ({
  type: SET_PROMO_ERROR_MESSAGE,
  payload: error,
});

export const setPromoCode = (promoCode: any) => ({
  type: SET_PROMO_CODE,
  payload: promoCode,
});

export const checkPromoCode = (promoCode: string, subscriptionId: number, paymentMode: string) => (
  dispatch: any
) => {
  dispatch(setPromoLoading(true));
  const sellerID = localStorage.getItem('userId');
  const fetchPromoCode = async () => {
    try {
      const url = sellerID
        ? `${AppConfig.BASE_URL_API}sellers/${sellerID}/promo-code/${promoCode}/${subscriptionId}/${paymentMode}`
        : `${AppConfig.BASE_URL_API}sellers/promo-code/${promoCode}/${subscriptionId}/${paymentMode}`;
      const res = await Axios.get(url);
      dispatch(setPromoCode({ ...res.data, code: promoCode }));
      dispatch(setPromoError(''));
      dispatch(setPromoLoading(false));
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        dispatch(setPromoError(err.response.data.message));
      } else {
        dispatch(setPromoError('Failed to retrieve promo code.'));
      }
      dispatch(setPromoCode({ code: promoCode }));
      dispatch(setPromoLoading(false));
    }
  };
  fetchPromoCode();
};

export const fetchSellerSubscription = () => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  return Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}/subscription`)
    .then(json => {
      const subscription = json.data || false;

      dispatch(setSellerSubscription(subscription));
      if (subscription) {
        if (subscription.is_first_time_logged_in) {
          localStorage.setItem('isFirstTimeLoggedIn', 'true');
        } else {
          localStorage.setItem('isFirstTimeLoggedIn', 'false');
        }

        if (navigator.userAgent.indexOf('Chrome') !== -1) {
          if (chrome && chrome.runtime) {
            chrome.runtime.sendMessage(AppConfig.CHROME_EXT_ID, {
              status: 'subscription',
              payload: subscription,
            });
          }
        }
      }
      if (subscription === false) {
        warn("You don't have active subscription or your subscription has expired");
      } else if (subscription.subscription_id === 4) {
        dispatch(fetchSellerSubscriptionTrial(subscription));
      }
    })
    .catch(err => {
      if (err?.response?.status === 403) {
        auth.logout();
      }
    });
};

/* Create subscription for freemium checkout flow */
export const createSubscription = (data: any) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  const bodyFormData = new FormData();
  bodyFormData.set('subscription_id', data.subscription_id);
  bodyFormData.set('payment_method_id', data.payment_method_id);
  bodyFormData.set('payment_mode', data.payment_mode);
  bodyFormData.set('promo_code', data.promo_code);
  bodyFormData.set('free_trial', data.free_trial);
  bodyFormData.set('payment_first_name', data.first_name);
  bodyFormData.set('payment_last_name', data.last_name);
  bodyFormData.set('address_line_1', data.address_line_1);
  bodyFormData.set('city', data.city);
  bodyFormData.set('country', data.country);
  bodyFormData.set('postal_code', data.postal_code);
  bodyFormData.set('state', data.state);

  return Axios.post(
    AppConfig.BASE_URL_API + `sellers/${sellerID}/subscription/create`,
    bodyFormData
  )
    .then((response: any) => {
      return {
        invoice: response.data.stripe_subscription,
        payment_method_id: data.payment_method_id,
        price_id: data.payment_method_id,
        isRetry: true,
        subscription: response.data.stripe_subscription,
      };
    })
    .then(handlePaymentThatRequiresCustomerAction)
    .then(handleRequiresPaymentMethod)
    .then((data: any) => {
      if (
        (data.subscription && data.subscription.status === 'active') ||
        data.payment_intent.status === 'succeeded'
      ) {
        dispatch(setSuccessPayment(true));
        localStorage.removeItem('planType');
        dispatch(setStripeLoading(false));
      } else if (data.message) {
        dispatch(setStripeError(data));
        dispatch(setStripeLoading(false));
      }
    })
    .catch(err => {
      dispatch(setStripeError({ message: err.response.data.message }));
      dispatch(setStripeLoading(false));
    });
};

const handlePaymentThatRequiresCustomerAction = (data: any) => {
  if (data.subscription && data.subscription.status === 'active') {
    // Subscription is active, no customer actions required.
    return data;
  }

  // If it's a first payment attempt, the payment intent is on the subscription latest invoice.
  // If it's a retry, the payment intent will be on the invoice itself.
  const paymentIntent = data.invoice
    ? data.invoice.latest_invoice.payment_intent
    : data.subscription.latest_invoice.payment_intent;
  if (
    paymentIntent.status === 'requires_action' ||
    (data.isRetry === true && paymentIntent.status === 'requires_payment_method')
  ) {
    return stripe
      .confirmCardPayment(paymentIntent.client_secret, {
        payment_method: data.payment_method_id,
      })
      .then((result: any) => {
        if (result.error) {
          // Start code flow to handle updating the payment details.
          // Display error message in your UI.
          // The card was declined (i.e. insufficient funds, card has expired, etc).

          throw result.error;
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer.
            // There's a risk of the customer closing the window before the callback.
            // We recommend setting up webhook endpoints later in this guide.
            return {
              price_id: data.payment_method_id,
              subscription: data.subscription,
              invoice: data.invoice,
              payment_method_id: data.payment_method_id,
              payment_intent: result.paymentIntent,
            };
          }
        }
      })
      .catch((error: any) => {
        return error;
      });
  } else {
    // No customer action needed.
    return {
      subscription: data.subscription,
      price_id: data.payment_method_id,
      payment_method_id: data.payment_method_id,
    };
  }
};

const handleRequiresPaymentMethod = (data: any) => {
  if (data.subscription && data.subscription.status === 'active') {
    // subscription is active, no customer actions required.
    return {
      subscription: data.subscription,
      price_id: data.payment_method_id,
      payment_method_id: data.payment_method_id,
    };
  } else if (
    data.subscription &&
    data.subscription.latest_invoice.payment_intent.status === 'requires_payment_method'
  ) {
    // Using localStorage to manage the state of the retry here,
    // feel free to replace with what you prefer.
    // Store the latest invoice ID and status.
    localStorage.setItem('latestInvoiceId', data.subscription.latest_invoice.id);
    localStorage.setItem(
      'latestInvoicePaymentIntentStatus',
      data.subscription.latest_invoice.payment_intent.status
    );
    throw data.message;
  } else {
    return data;
  }
};

export const retryInvoiceWithNewPaymentMethod = (data: any) => {
  const sellerID = localStorage.getItem('userId');
  const bodyFormData = new FormData();
  bodyFormData.set('payment_method_id', data.payment_method_id);
  bodyFormData.set('invoice_id', data.invoice_id);
  return Axios.post(
    AppConfig.BASE_URL_API + `sellers/${sellerID}/subscription/retry-invoice`,
    bodyFormData
  )
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
        data.trial_left = expireDate;
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

export const updateSeller = (payload: any) => async (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');

  try {
    const url = AppConfig.BASE_URL_API + `sellers/${sellerID}`;
    const { status } = await Axios.patch(url, payload);
    if (status === 200) {
      if (!payload.doNotRefresh) {
        dispatch(fetchSellerSubscription());
      }
    }
  } catch (err) {
    console.log('error: ', err);
  }
};

export const setSubscriptions = (data: any) => ({
  type: SET_PRICING_SUBSCRIPTIONS,
  payload: data,
});

export const setStripeLoading = (data: any) => ({
  type: SET_STRIPE_LOADING,
  payload: data,
});
export const setSuccessPayment = (data: any) => ({
  type: SET_SUCCESS_PAYMENT,
  payload: data,
});

export const setStripeError = (data: any) => ({
  type: SET_STRIPE_ERROR,
  payload: data,
});

export const setSellerSubscription = (data: any) => ({
  type: SET_SELLER_SUBSCRIPTION,
  payload: data,
});

export const setCouponApplied = (data: boolean) => ({
  type: SET_COUPON_APPLIED,
  payload: data,
});

export const redeemCoupon = (coupon: any, id: any) => (dispatch: any) => {
  const bodyFormData = new FormData();

  if (coupon) bodyFormData.append('coupon', coupon);
  else {
    error('Coupon field is empty');
    return;
  }

  Axios.post(AppConfig.BASE_URL_API + `sellers/${id}/subscription/redeem-coupon`, bodyFormData)
    .then(response => {
      success(`${response.data.message}`);
      dispatch(setCouponApplied(true));
    })
    .catch((err: any) => {
      error(`${err.response.data.message}`);
      dispatch(setCouponApplied(false));
    });
};
