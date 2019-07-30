import { Map } from 'immutable';
import {
  GET_SUBSCRIPTIONS,
  GET_SELLER_SUBSCRIPTION,
  UPDATE_SELLER_SUBSCRIBTION
} from '../constant/constant';

const initialState = Map({
  sellerSubscription: undefined,
  subscriptions: [],
  success: undefined
});

export const SubscriptionReducer = (state = initialState, action: any) => {
  let newState = null;
  let data = null;
  switch (action.type) {
    case GET_SUBSCRIPTIONS:
      data = action.data;
      newState = state.setIn(['subscriptions'], data);
      return newState;
    case GET_SELLER_SUBSCRIPTION:
      data = action.data;
      newState = state.setIn(['sellerSubscription'], data);
      return newState;
    case UPDATE_SELLER_SUBSCRIBTION:
      data = action.data;
      newState = state.setIn(['success'], data.value);
      return newState;
    default:
      return state;
  }
};

