import { Map } from 'immutable';
import {
  SET_SELLERS
} from '../constant/constant';

const initialState = Map({
  suppliers: []
});

export const SYNReducer = (state = initialState, action: any) => {
  console.log("json.data: ", action)
  switch (action.type) {
    case SET_SELLERS:
      console.log("test : ", action);
      const { data } = action;
      // const { key, value } = data;
      // const newState = state.setIn(['profile', key], value);
      const newState = data;
      return newState;
    default:
      return state;
  }
};

export default SYNReducer;