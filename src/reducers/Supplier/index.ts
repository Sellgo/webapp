import { setIn } from '../../utils/immutablity';
import { AnyAction } from 'redux';
import get from 'lodash/get';
import {
  SET_SUPPLIER_PRODUCTS_TRACK_DATA,
  SET_SUPPLIER_PRODUCTS,
  RESET_SUPPLIER_PRODUCTS,
  SET_SUPPLIER_DETAILS,
  RESET_SUPPLIER,
} from '../../constants/Synthesis/Suppliers';

const initialState = {
  products: [undefined],
  details: {},
  trackData: {
    avg_price: '',
    daily_rank: 0,
    daily_sales: '',
    date_range: 0,
    fees: '',
    id: 0,
    monthly_sales: '',
    product_track_group_id: 0,
    profit: '',
    rating: '',
    review: 0,
    roi: '',
    size_tier: '',
    weight: '',
  },
};

export default (state = initialState, action: AnyAction) => {
  console.log(state, action);
  switch (action.type) {
    case SET_SUPPLIER_PRODUCTS: {
      return setIn(state, 'products', action.payload);
    }
    case RESET_SUPPLIER_PRODUCTS: {
      return initialState;
    }
    case SET_SUPPLIER_DETAILS: {
      const supplier = action.payload;
      const hit = {
        rate: supplier.rate,
        p2l_ratio: supplier.p2l_ratio,
      };
      return setIn(state, 'details', hit);
    }
    case SET_SUPPLIER_PRODUCTS_TRACK_DATA: {
      return setIn(state, 'trackData', action.payload);
    }
    case RESET_SUPPLIER: {
      return initialState;
    }
    default:
      return state;
  }
};
