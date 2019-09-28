import { setIn } from '../../utils/immutablity';
import { AnyAction } from 'redux';
import get from 'lodash/get';
import {
  SET_SUPPLIER_FILTER_UNIT_PROFIT,
  SET_SUPPLIER_FILTER_MARGIN,
  SET_SUPPLIER_FILTER_UNITS_PER_MONTH,
  SET_SUPPLIER_FILTER_PROFIT_PER_MONTH,
} from '../../constants/Synthesis/Filters';

const initialState = {};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_SUPPLIER_FILTER_UNIT_PROFIT: {
      return setIn(state, 'products', action.payload);
    }
    default:
      return state;
  }
};
