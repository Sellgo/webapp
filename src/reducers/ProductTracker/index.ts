import { setIn } from '../../utils/immutablity';
import { AnyAction } from 'redux';
import get from 'lodash/get';
import {
  SET_PRODUCT_TRACKER_DETAILS,
  IS_LOADING_TRACKER_PRODUCTS,
  UPDATE_TRACKER_FILTER_RANGES,
  SET_TRACKER_SINGLE_PAGE_ITEMS_COUNT,
  SET_MENU_ITEM,
  SET_PRODUCT_TRACKER_PAGE_NUMBER,
  SET_RETRIEVE_PRODUCT_TRACK_GROUP,
  findFilterProducts,
} from '../../constants/Tracker';

const initialState = {
  trackerDetails: [],
  filteredProducts: [],
  filterRanges: undefined,
  productTrackerPageNo: 1,
  singlePageItemsCount: 5,
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case IS_LOADING_TRACKER_PRODUCTS: {
      return setIn(state, 'isLoadingTrackerProducts', action.payload);
    }
    case SET_PRODUCT_TRACKER_DETAILS:
      return setIn(state, 'trackerDetails', action.payload);
    case UPDATE_TRACKER_FILTER_RANGES:
      const filterRanges = action.payload;
      const newState = setIn(state, 'filterRanges', filterRanges);
      // Also update filteredProducts in state each time filterRanges changes
      const filteredProducts = findFilterProducts(state.trackerDetails, filterRanges);
      return setIn(newState, 'filteredProducts', filteredProducts);
    case SET_TRACKER_SINGLE_PAGE_ITEMS_COUNT:
      return setIn(state, 'singlePageItemsCount', action.payload);
    case SET_MENU_ITEM:
      return setIn(state, 'menuItem', action.payload);
    case SET_PRODUCT_TRACKER_PAGE_NUMBER:
      return setIn(state, 'productTrackerPageNo', action.payload);
    case SET_RETRIEVE_PRODUCT_TRACK_GROUP:
      return setIn(state, 'trackerGroup', action.payload);
    default:
      return state;
  }
};
