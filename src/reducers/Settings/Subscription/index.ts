import { SET_PRICING_SUBSCRIPTIONS, SET_SELLER_SUBSCRIPTION } from '../../../constants/Settings';
import { AnyAction } from 'redux';
import { setIn } from '../../../utils/immutablity';

const initialState = {
  sellerSubscription: undefined,
  subscriptions: [],
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_PRICING_SUBSCRIPTIONS:
      return setIn(state, 'subscriptions', action.payload);
    case SET_SELLER_SUBSCRIPTION:
      return setIn(state, 'sellerSubscription', action.payload);
    default:
      return state;
  }
};
