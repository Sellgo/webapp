import {
  GET_SUBSCRIPTIONS,
  GET_SELLER_SUBSCRIPTION,
  UPDATE_SELLER_SUBSCRIBTION,
} from '../../../constants/Settings';

const initialState = {
  sellerSubscription: undefined,
  subscriptions: [],
  success: undefined,
};

export default (state = initialState, action: any) => {
  const newState = { ...state };
  let data = null;
  switch (action.type) {
    case GET_SUBSCRIPTIONS:
      data = action.data;
      newState.subscriptions = data;
      return newState;
    case GET_SELLER_SUBSCRIPTION:
      data = action.data;
      newState.sellerSubscription = data;
      return newState;
    case UPDATE_SELLER_SUBSCRIBTION:
      data = action.data;
      newState.success = data.value;
      return newState;
    default:
      return state;
  }
};
