import { setIn } from '../../utils/immutablity';
import { AnyAction } from 'redux';
import {
  FETCH_INVENTORY,
  FETCH_PRODUCT_SELLERS,
  FETCH_PRODUCT_SELLERS_ERROR,
  FETCH_PRODUCT_SELLERS_SUCCESS,
  FETCH_SELLER_PRODUCTS,
  FETCH_SELLER_PRODUCTS_ERROR,
  FETCH_SELLER_PRODUCTS_SUCCESS,
  FETCH_SELLERS,
  FETCH_SELLERS_ERROR,
  FETCH_SELLERS_SUCCESS,
} from '../../constants/SellerFinder';

const initialState = {
  sellers: [],
  fetchingSellers: false,
  error: null,
  loadingInventory: {},
  sellerProducts: [],
  loadingSellerProducts: false,
  errorFetchingSellerProducts: null,
  productSellers: [],
  loadingProductSellers: false,
  errorFetchingProductSellers: null,
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_SELLERS:
      return setIn(state, 'fetchingSellers', action.data);
    case FETCH_SELLERS_SUCCESS:
      return setIn(state, 'sellers', action.data);
    case FETCH_SELLERS_ERROR:
      return setIn(state, 'error', action.data);
    case FETCH_INVENTORY:
      return setIn(state, 'loadingInventory', action.data);
    case FETCH_SELLER_PRODUCTS:
      return setIn(state, 'loadingSellerProducts', action.data);
    case FETCH_SELLER_PRODUCTS_SUCCESS:
      return setIn(state, 'sellerProducts', action.data);
    case FETCH_SELLER_PRODUCTS_ERROR:
      return setIn(state, 'errorFetchingSellerProducts', action.data);
    case FETCH_PRODUCT_SELLERS:
      return setIn(state, 'loadingProductSellers', action.data);
    case FETCH_PRODUCT_SELLERS_SUCCESS:
      return setIn(state, 'productSellers', action.data);
    case FETCH_PRODUCT_SELLERS_ERROR:
      return setIn(state, 'errorFetchingProductSellers', action.data);
    default:
      return state;
  }
};
