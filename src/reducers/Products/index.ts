import { setIn } from '../../utils/immutablity';
import { AnyAction } from 'redux';
import {
  SET_SUPPLIER_PRODUCT_DETAILS,
  SET_SUPPLIER_PRODUCT_DETAIL_CHART_RANK,
  SET_SUPPLIER_PRODUCT_DETAIL_CHART_PRICE,
  SET_SUPPLIER_PRODUCT_DETAIL_CHART_INVENTORY,
  SET_SUPPLIER_PRODUCT_DETAIL_CHART_RATING,
  SET_SUPPLIER_PRODUCT_DETAIL_CHART_REVIEW,
  SET_PRODUCT_DETAIL_KPI,
  SET_SUPPLIER_PRODUCT_DETAIL_CHART_KPI,
  RESET_SUPPLIER_PRODUCT_DETAILS,
  SET_FETCHING_RANK,
  SET_FETCHING_INVENTORY,
  SET_FETCHING_RATING,
  SET_FETCHING_KPI,
  SET_FETCHING_PRICE,
  SET_FETCHING_REVIEW,
  SET_FETCHING_SELLER_INVENTORY,
  SET_SUPPLIER_PRODUCT_DETAIL_CHART_SELLER_INVENTORY,
} from '../../constants/Products';

const initialState = {
  details: undefined,
  detailRank: [],
  detailPrice: [],
  detailInventory: [],
  detailRating: [],
  detailReview: [],
  detailSellerInventory: [],
  detailKPI: [],
  trackerKPI: [],
  isFetchingRank: false,
  isFetchingPrice: false,
  isFetchingInventory: false,
  isFetchingRating: false,
  isFetchingReview: false,
  isFetchingKPI: false,
  isFetchingSellerInventory: false,
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_SUPPLIER_PRODUCT_DETAILS:
      return setIn(state, 'details', action.payload);
    case SET_SUPPLIER_PRODUCT_DETAIL_CHART_RANK:
      return setIn(state, 'detailRank', action.payload);
    case SET_SUPPLIER_PRODUCT_DETAIL_CHART_PRICE:
      return setIn(state, 'detailPrice', action.payload);
    case SET_SUPPLIER_PRODUCT_DETAIL_CHART_INVENTORY:
      return setIn(state, 'detailInventory', action.payload);
    case SET_SUPPLIER_PRODUCT_DETAIL_CHART_RATING:
      return setIn(state, 'detailRating', action.payload);
    case SET_SUPPLIER_PRODUCT_DETAIL_CHART_REVIEW:
      return setIn(state, 'detailReview', action.payload);
    case SET_SUPPLIER_PRODUCT_DETAIL_CHART_SELLER_INVENTORY:
      return setIn(state, 'detailSellerInventory', action.payload);
    case SET_PRODUCT_DETAIL_KPI:
      return setIn(state, 'trackerKPI', action.payload);
    case SET_SUPPLIER_PRODUCT_DETAIL_CHART_KPI:
      return setIn(state, 'detailKPI', action.payload);
    case SET_FETCHING_RANK:
      return setIn(state, 'isFetchingRank', action.payload);
    case SET_FETCHING_PRICE:
      return setIn(state, 'isFetchingPrice', action.payload);
    case SET_FETCHING_INVENTORY:
      return setIn(state, 'isFetchingInventory', action.payload);
    case SET_FETCHING_RATING:
      return setIn(state, 'isFetchingRating', action.payload);
    case SET_FETCHING_REVIEW:
      return setIn(state, 'isFetchingReview', action.payload);
    case SET_FETCHING_SELLER_INVENTORY:
      return setIn(state, 'isFetchingSellerInventory', action.payload);
    case SET_FETCHING_KPI:
      return setIn(state, 'isFetchingKPI', action.payload);
    case RESET_SUPPLIER_PRODUCT_DETAILS:
      return initialState;
    default:
      return state;
  }
};
