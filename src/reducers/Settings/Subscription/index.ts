import { SET_PRICING_SUBSCRIPTIONS, SET_SELLER_SUBSCRIPTION } from '../../../constants/Settings';
import { AnyAction } from 'redux';
import { setIn } from '../../../utils/immutablity';

const initialState = {
  sellerSubscription: undefined,
  subscriptionType: '',
  plan: '',
  subscriptions: [],
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_PRICING_SUBSCRIPTIONS:
      return setIn(state, 'subscriptions', action.payload);
    case SET_SELLER_SUBSCRIPTION: {
      const sellerSubscriptionData = action.payload;
      const plan =
        sellerSubscriptionData.subscription_id === 1
          ? 'Basic Plan'
          : sellerSubscriptionData.subscription_id === 2
          ? 'Pro Plan'
          : sellerSubscriptionData.subscription_id === 3
          ? 'Enterprise'
          : sellerSubscriptionData.subscription_id === 4
          ? 'Free Trial'
          : sellerSubscriptionData.subscription_id === 5
          ? 'Free Account'
          : '';
      const type =
        sellerSubscriptionData.subscription_id <= 3
          ? 'paid'
          : sellerSubscriptionData.subscription_id === 4
          ? 'trial'
          : sellerSubscriptionData.subscription_id === 5
          ? 'free'
          : '';
      const newStateWithPlan = setIn(state, 'plan', plan);
      const newState = setIn(newStateWithPlan, 'subscriptionType', type);
      return setIn(newState, 'sellerSubscription', sellerSubscriptionData);
    }
    default:
      return state;
  }
};
