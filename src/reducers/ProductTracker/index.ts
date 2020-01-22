import { setIn } from '../../utils/immutablity';
import { AnyAction } from 'redux';
import {
  SET_PRODUCT_TRACKER_DETAILS,
  IS_LOADING_TRACKER_PRODUCTS,
  UPDATE_TRACKER_FILTER_RANGES,
  SET_TRACKER_SINGLE_PAGE_ITEMS_COUNT,
  SET_RETRIEVE_PRODUCT_TRACK_GROUP,
  UPDATE_TRACKER_PRODUCT,
  findFilterProducts,
} from '../../constants/Tracker';

const initialState = {
  trackerDetails: [],
  filteredProducts: [],
  filterRanges: undefined,
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
    case SET_RETRIEVE_PRODUCT_TRACK_GROUP:
      return setIn(state, 'trackerGroup', action.payload);
    case UPDATE_TRACKER_PRODUCT:
      return setIn(state, 'trackerDetails', action.payload);
    default:
      return state;
  }
};
