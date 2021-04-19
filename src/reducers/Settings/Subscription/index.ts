import {
  SET_PRICING_SUBSCRIPTIONS,
  SET_SELLER_SUBSCRIPTION,
  SET_SUCCESS_PAYMENT,
  SET_STRIPE_ERROR,
  SET_STRIPE_LOADING,
  SET_COUPON_APPLIED,
} from '../../../constants/Settings';
import { AnyAction } from 'redux';
import { setIn } from '../../../utils/immutablity';

const initialState = {
  sellerSubscription: undefined,
  subscriptionType: '',
  plan: '',
  subscriptions: [],
  stripeErrorMessage: undefined,
  stripeLoading: false,
  isCouponApplied: false,
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_PRICING_SUBSCRIPTIONS:
      return setIn(state, 'subscriptions', action.payload);
    case SET_SELLER_SUBSCRIPTION: {
      const sellerSubscriptionData = action.payload;
      const plan =
        sellerSubscriptionData.subscription_id === 1
          ? 'Suite Plan' // Suite Plan
          : sellerSubscriptionData.subscription_id === 2
          ? 'Professional Plan' // Professional Plan
          : sellerSubscriptionData.subscription_id === 3
          ? 'Enterprise'
          : sellerSubscriptionData.subscription_id === 4
          ? 'Free Trial'
          : sellerSubscriptionData.subscription_id === 5
          ? 'Free Account'
          : sellerSubscriptionData.subscription_id === 6
          ? 'Starter Plan' // Starter Plan
          : '';
      const type =
        sellerSubscriptionData.subscription_id <= 3
          ? 'paid'
          : sellerSubscriptionData.subscription_id === 4
          ? 'trial'
          : sellerSubscriptionData.subscription_id === 5
          ? 'free'
          : sellerSubscriptionData.subscription_id === 6
          ? 'paid'
          : '';
      const newStateWithPlan = setIn(state, 'plan', plan);
      const newState = setIn(newStateWithPlan, 'subscriptionType', type);
      return setIn(newState, 'sellerSubscription', sellerSubscriptionData);
    }
    case SET_SUCCESS_PAYMENT: {
      return setIn(state, 'successPayment', action.payload);
    }
    case SET_STRIPE_LOADING: {
      return setIn(state, 'stripeLoading', action.payload);
    }
    case SET_STRIPE_ERROR: {
      return setIn(state, 'stripeErrorMessage', action.payload);
    }
    case SET_COUPON_APPLIED: {
      return setIn(state, 'isCouponApplied', action.payload);
    }
    default:
      return state;
  }
};
