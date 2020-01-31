import { setIn } from '../../utils/immutablity';
import get from 'lodash/get';
import { AnyAction } from 'redux';
import {
  SET_PRODUCT_TRACKER_DETAILS,
  IS_LOADING_TRACKER_PRODUCTS,
  UPDATE_TRACKER_FILTER_RANGES,
  SET_TRACKER_SINGLE_PAGE_ITEMS_COUNT,
  SET_MENU_ITEM,
  SET_PRODUCT_TRACKER_PAGE_NUMBER,
  SET_RETRIEVE_PRODUCT_TRACK_GROUP,
  ADD_PRODUCT_TRACK_GROUP,
  UPDATE_PRODUCT_TRACK_GROUP,
  REMOVE_PRODUCT_TRACK_GROUP,
  findFilterProducts,
} from '../../constants/Tracker';

const initialState = {
  trackerDetails: [],
  filteredProducts: [],
  filterRanges: undefined,
  productTrackerCurrentPageNo: 1,
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
      return setIn(state, 'productTrackerCurrentPageNo', action.payload);
    case SET_RETRIEVE_PRODUCT_TRACK_GROUP:
      return setIn(state, 'trackerGroup', action.payload);
    case ADD_PRODUCT_TRACK_GROUP:
      const newGroup = action.payload;
      const groupsAfterAdd = get(state, 'trackerGroup').slice();
      groupsAfterAdd.splice(groupsAfterAdd.length, 0, newGroup);
      return setIn(state, 'trackerGroup', groupsAfterAdd);
    case UPDATE_PRODUCT_TRACK_GROUP:
      const updatedGroup = action.payload;
      const groupsAfterUpdate = get(state, 'trackerGroup').map((group: any) =>
        group.id !== updatedGroup.id ? group : updatedGroup
      );
      return setIn(state, 'trackerGroup', groupsAfterUpdate);
    case REMOVE_PRODUCT_TRACK_GROUP:
      const deletedGroupId = action.payload;
      const groupsAfterDelete = get(state, 'trackerGroup').filter(
        (group: any, index: any) => group.id !== deletedGroupId
      );
      return setIn(state, 'trackerGroup', groupsAfterDelete);
    default:
      return state;
  }
};
