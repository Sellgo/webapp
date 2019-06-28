import { Map } from 'immutable';
import {
  SET_PRODUCT_ATTRIBUTES,
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
      // console.log('ActionData');
      // console.log(action.data);
      const newStateData = state.setIn(['products'], action.data);
      // console.log('STATE UPDATED');
      // console.log(newStateData);
      return newStateData;
    case SET_PRODUCT_ATTRIBUTES:
      const set_Product_Attribute = state.setIn(['products'], action.data);
      // console.log('STATE UPDATED');
      // console.log(set_Product_Attribute);
      return state;
    default:
      return state;
  }
};
