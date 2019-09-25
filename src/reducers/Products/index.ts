import { setIn } from '../../utils/immutablity';
import { AnyAction } from 'redux';
import get from 'lodash/get';
import {
  SET_SUPPLIER_PRODUCT_DETAILS,
  SET_SUPPLIER_PRODUCT_DETAIL_CHART_RANK,
  SET_SUPPLIER_PRODUCT_DETAIL_CHART_PRICE,
  SET_SUPPLIER_PRODUCT_DETAIL_CHART_KPI,
  RESET_SUPPLIER_PRODUCT_DETAILS,
} from '../../constants/Synthesis/Products';

const initialState = {
  details: {},
  detailRank: [],
  detailPrice: [],
  detailKPI: [],
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_SUPPLIER_PRODUCT_DETAILS:
      return setIn(state, 'details', action.payload);
    case SET_SUPPLIER_PRODUCT_DETAIL_CHART_RANK:
      return setIn(state, 'detailRank', action.payload);
    case SET_SUPPLIER_PRODUCT_DETAIL_CHART_PRICE:
      return setIn(state, 'detailPrice', action.payload);
    case SET_SUPPLIER_PRODUCT_DETAIL_CHART_KPI:
      return setIn(state, 'detailKPI', action.payload);
    case RESET_SUPPLIER_PRODUCT_DETAILS:
      return initialState;
    default:
      return state;
  }
};
