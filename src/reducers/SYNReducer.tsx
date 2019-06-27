import { Map } from 'immutable';
import {
  SET_SELLERS
} from '../constant/constant';

const initialState = Map({
  suppliers: [],
  products: [],
});

export const SYNReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SELLERS:
      const { data } = action;
      const newState = state.setIn(['suppliers'], data);
      return newState;
    default:
      return state;
  }
};

export const SYNProductsReducer = (state = initialState, action: any) => {
  console.log("json.data: ", action)
  switch (action.type) {
    case SET_SELLERS:
      const { data } = action;
      const newState = state.setIn(['products'], data);
      return newState;
    default:
      return state;
  }
};
