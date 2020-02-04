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
  filterProductsByGroupId,
  findMinMaxRange,
  UPDATE_TRACKED_PRODUCT,
  REMOVE_TRACKED_PRODUCT,
} from '../../constants/Tracker';

const initialState = {
  trackerDetails: {
    count: 0,
    results: [],
  },
  filteredProducts: [],
  filterRanges: undefined,
  menuItem: null,
  productTrackerCurrentPageNo: 1,
  singlePageItemsCount: 10,
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
      let newState = setIn(state, 'filterRanges', filterRanges);
      // Also update filteredProducts in state each time filterRanges changes
      let filteredProducts = findFilterProducts(state.trackerDetails.results, filterRanges);
      return setIn(newState, 'filteredProducts', filteredProducts);
    case SET_TRACKER_SINGLE_PAGE_ITEMS_COUNT:
      return setIn(state, 'singlePageItemsCount', action.payload);
    case SET_MENU_ITEM:
      const groupId = action.payload;
      let newStateWithMenu = setIn(state, 'menuItem', groupId);
      let filteredProductsByGroupId = filterProductsByGroupId(
        state.trackerDetails['results'],
        groupId
      );
      let newFilterRanges = findMinMaxRange(filteredProductsByGroupId);
      let newStateWithFilterRanges = setIn(newStateWithMenu, 'filterRanges', newFilterRanges);
      return setIn(newStateWithFilterRanges, 'filteredProducts', filteredProductsByGroupId);
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
    case UPDATE_TRACKED_PRODUCT:
      const updatedProductDetails = action.payload;
      const trackerDetailsAfterUpdate = get(state, 'trackerDetails.results').map((product: any) =>
        product.id !== updatedProductDetails.id ? product : { ...product, ...updatedProductDetails }
      );
      let newStateWithTrackerDetails = setIn(
        state,
        'trackerDetails.results',
        trackerDetailsAfterUpdate
      );
      const filteredProductsAfterUpdate = get(newStateWithTrackerDetails, 'filteredProducts').map(
        (product: any) =>
          product.id !== updatedProductDetails.id
            ? product
            : { ...product, ...updatedProductDetails }
      );
      return setIn(newStateWithTrackerDetails, 'filteredProducts', filteredProductsAfterUpdate);
    case REMOVE_TRACKED_PRODUCT:
      const productId = action.payload;
      const trackerDetailsAfterRemove = get(state, 'trackerDetails');
      trackerDetailsAfterRemove.count = trackerDetailsAfterRemove.count - 1;
      trackerDetailsAfterRemove.results = trackerDetailsAfterRemove.results.filter(
        (product: any) => product.id !== productId
      );
      let newStateWithTrackerDetailsRemoved = setIn(
        state,
        'trackerDetails',
        trackerDetailsAfterRemove
      );
      const filteredProductsAfterRemove = get(
        newStateWithTrackerDetailsRemoved,
        'filteredProducts'
      ).filter((product: any) => product.id !== productId);
      return setIn(
        newStateWithTrackerDetailsRemoved,
        'filteredProducts',
        filteredProductsAfterRemove
      );
    default:
      return state;
  }
};
