import { Map } from 'immutable';
import {
  SET_PRODUCTS,
  SET_SELLERS,
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
    case SET_PRODUCTS:
      const { actiondata } = action;
      return state.setIn(['products'], actiondata);
    default:
      return state;
  }
};
