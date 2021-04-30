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
  SET_ACTIVE_PRODUCT,
  SET_PRODUCT_SELLERS,
  SET_SELLER_PRODUCTS_COUNT,
  SET_SELLER_PRODUCTS_PAGE_COUNT,
  SET_SELLER_PRODUCTS_PAGE_NO,
  SET_SELLER_PRODUCTS_PAGE_SIZE,
  SET_MENU_ITEM,
  SET_SELLER_TRACK_GROUPS,
  SET_TRACK_PRODUCT_SELLER,
  SET_SELLERS_PAGE_COUNT,
  SET_SELLERS_PAGE_NO,
  SET_SELLERS_PAGE_SIZE,
  SET_SELLERS_COUNT,
  SET_SELLERS_SINGLE_PAGE_ITEMS_COUNT,
  SET_LOADING_SELLERS,
  SET_SELLERS_SORT,
  SET_SELLERS_SORT_DIRECTION,
  SET_SELLERS_FILTERS,
  SET_SELLERS_FILTERS_LOADING,
} from '../../constants/SellerFinder';

const initialState = {
  sellers: [],
  fetchingSellers: false,
  loadingSellers: false,
  error: null,
  loadingInventory: {},
  sellerProducts: [],
  loadingSellerProducts: false,
  errorFetchingSellerProducts: null,
  productSellers: [],
  loadingProductSellers: false,
  errorFetchingProductSellers: null,
  sellerMenuItem: null,
  sellerTrackGroups: [],
  productsPageSize: 25,
  productsPageNo: 1,
  productsSinglePageItemsCount: 25,
  productsCount: 0,
  productsPageCount: 0,
  activeProductSellerStatus: {},
  activeProduct: {},
  productSellerTrackStatus: 'inactive',
  sellersPageSize: 50,
  sellersPageNo: 1,
  sellersSinglePageItemsCount: 50,
  sellersCount: 0,
  sellersPageCount: 0,
  sellersSort: 'udate',
  sellersSortDirection: 'descending',
  loadingSellersFilters: false,
  sellersFilters: [],
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

    case SET_SELLER_TRACK_GROUPS:
      return setIn(state, 'sellerTrackGroups', action.data);

    case SET_MENU_ITEM:
      return setIn(state, 'sellerMenuItem', action.data);

    case SET_SELLER_PRODUCTS_PAGE_NO:
      return setIn(state, 'productsPageNo', action.data);

    case SET_SELLER_PRODUCTS_PAGE_SIZE:
      return setIn(state, 'productsPageSize', action.data);

    case SET_SELLER_PRODUCTS_COUNT:
      return setIn(state, 'productsCount', action.data);

    case SET_SELLER_PRODUCTS_PAGE_COUNT:
      return setIn(state, 'productsPageCount', action.data);

    case SET_PRODUCT_SELLERS:
      return setIn(state, 'activeProductSellerStatus', action.data);

    case SET_ACTIVE_PRODUCT:
      return setIn(state, 'activeProduct', action.data);

    case SET_TRACK_PRODUCT_SELLER:
      return setIn(state, 'productSellerTrackStatus', action.data);

    case SET_SELLERS_PAGE_NO:
      return setIn(state, 'sellersPageNo', action.data);

    case SET_SELLERS_PAGE_SIZE:
      return setIn(state, 'sellersPageSize', action.data);

    case SET_SELLERS_COUNT:
      return setIn(state, 'sellersCount', action.data);

    case SET_SELLERS_PAGE_COUNT:
      return setIn(state, 'sellersPageCount', action.data);

    case SET_SELLERS_SINGLE_PAGE_ITEMS_COUNT:
      return setIn(state, 'sellersSinglePageItemsCount', action.data);

    case SET_LOADING_SELLERS:
      return setIn(state, 'loadingSellers', action.data);

    case SET_SELLERS_SORT:
      return setIn(state, 'sellersSort', action.data);

    case SET_SELLERS_SORT_DIRECTION:
      return setIn(state, 'sellersSortDirection', action.data);

    case SET_SELLERS_FILTERS_LOADING:
      return setIn(state, 'loadingSellersFilters', action.data);

    case SET_SELLERS_FILTERS:
      return setIn(state, 'sellersFilters', action.data);

    default:
      return state;
  }
};
