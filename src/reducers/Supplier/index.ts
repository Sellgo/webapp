import { setIn } from '../../utils/immutablity';
import { AnyAction } from 'redux';
import get from 'lodash/get';
import {
  SET_SUPPLIER_PRODUCTS_TRACK_DATA,
  SET_SUPPLIER_PRODUCTS,
  RESET_SUPPLIER_PRODUCTS,
  SET_SUPPLIER_DETAILS,
  RESET_SUPPLIER,
  UPDATE_SUPPLIER_PRODUCT,
  SET_SUPPLIER_PRODUCT_TRACKER_GROUP,
  UPDATE_FILTER_SUPPLIER_PRODUCTS,
} from '../../constants/Synthesis/Suppliers';

const initialState = {
  products: [undefined],
  filterProducts: [undefined],
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
  switch (action.type) {
    case SET_SUPPLIER_PRODUCTS: {
      const newState = setIn(state, 'products', action.payload);
      return setIn(newState, 'filterProducts', action.payload);
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
    case UPDATE_SUPPLIER_PRODUCT:
      const updateProduct = action.payload;
      const products = get(state, 'products').map((product: any) => {
        const checkProduct = product;
        if (checkProduct.product_id === updateProduct.product_id) {
          checkProduct.tracking_status = updateProduct.status;
          checkProduct.product_track_id = updateProduct.id;
        }
        return checkProduct;
      });
      return setIn(state, 'products', products);
    case SET_SUPPLIER_PRODUCTS_TRACK_DATA: {
      return setIn(state, 'trackData', action.payload);
    }
    case SET_SUPPLIER_PRODUCT_TRACKER_GROUP:
      return setIn(state, 'productTrackerGroup', action.payload);
    case RESET_SUPPLIER: {
      return initialState;
    }
    case UPDATE_FILTER_SUPPLIER_PRODUCTS:
      return setIn(state, 'filterProducts', action.payload);
    default:
      return state;
  }
};
