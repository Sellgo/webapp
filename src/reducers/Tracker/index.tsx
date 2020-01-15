import { setIn } from '../../utils/immutablity';
import { AnyAction } from 'redux';
import get from 'lodash/get';
import { IS_LOADING_TRACKER_PRODUCTS, SET_TRACKER_PRODUCTS } from '../../constants/Tracker';

const initialState = {
  products: null,
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case IS_LOADING_TRACKER_PRODUCTS: {
      return setIn(state, 'isLoadingTrackerProducts', action.payload);
    }
    case SET_TRACKER_PRODUCTS: {
      return setIn(state, 'products', action.payload);
    }
    default:
      return state;
  }
};
