import { Map } from 'immutable';
import {
  SET_PRODUCT_ATTRIBUTES,
  SET_PRODUCTS,
  SET_SELLERS,
  SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION
} from '../constant/constant';

const initialState = Map({
  suppliers: [],
  products: [],
  new_supplier: null
});

export const SYNReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SELLERS:
      const { data } = action;
      const newState = state.setIn(['suppliers'], data);
      return newState;
    case SET_PRODUCTS:
      const newStateData = state.setIn(['products'], action.data);
      return newStateData;
    case SET_PRODUCT_ATTRIBUTES:
      const set_Product_Attribute = state.setIn(['products'], action.data);
      return state;
    case SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION:
      console.log("action: ", action);
      const data_NAME_DESC = action;
      const new_supplier = state.setIn(['new_supplier'], action.data.id);
      return new_supplier;
    // state.setIn(['suppliers'], action.data);
    // return state;
    // return newStateData;
    default:
      return state;
  }
};
