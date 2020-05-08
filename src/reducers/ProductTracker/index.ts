import { setIn } from '../../utils/immutablity';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import { AnyAction } from 'redux';
import {
  SET_PRODUCT_TRACKER_DETAILS,
  IS_LOADING_TRACKER_PRODUCTS,
  SET_TRACKER_SINGLE_PAGE_ITEMS_COUNT,
  SET_MENU_ITEM,
  SET_PRODUCT_TRACKER_PAGE_NUMBER,
  SET_RETRIEVE_PRODUCT_TRACK_GROUP,
  ADD_PRODUCT_TRACK_GROUP,
  UPDATE_PRODUCT_TRACK_GROUP,
  REMOVE_PRODUCT_TRACK_GROUP,
  filterProductsByGroupId,
  UPDATE_TRACKED_PRODUCT,
  REMOVE_TRACKED_PRODUCT,
  REMOVE_PRODUCTS_IN_GROUP,
  FILTER_TRACKED_PRODUCTS,
  SET_FILTER_SEARCH,
  findFilteredProducts,
  searchFilteredProduct,
  findMinMax,
  IS_PRODUCT_TRACKED,
  VERIFYING_PRODUCT,
} from '../../constants/Tracker';
import _ from 'lodash';

const initialState = {
  filterData: undefined,
  filterSearch: '',
  trackerDetails: {
    count: 0,
    results: [],
  },
  verifyingProductTracked: {},
  filteredProducts: [],
  filterRanges: undefined,
  menuItem: null,
  productTrackerCurrentPageNo: 1,
  singlePageItemsCount: 10,
  verifyingProduct: false,
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case IS_LOADING_TRACKER_PRODUCTS: {
      return setIn(state, 'isLoadingTrackerProducts', action.payload);
    }
    case VERIFYING_PRODUCT: {
      return setIn(state, 'verifyingProduct', action.payload);
    }
    case IS_PRODUCT_TRACKED: {
      return setIn(state, 'verifyingProductTracked', action.payload);
    }
    case SET_PRODUCT_TRACKER_DETAILS: {
      const data = action.payload;
      const newState = setIn(state, 'trackerDetails', data);
      return setIn(newState, 'filteredProducts', data.results);
    }
    case SET_TRACKER_SINGLE_PAGE_ITEMS_COUNT:
      return setIn(state, 'singlePageItemsCount', action.payload);
    case SET_MENU_ITEM: {
      const groupId = action.payload;
      const newStateWithMenu = setIn(state, 'menuItem', groupId);
      const filteredProductsByGroupId = filterProductsByGroupId(
        state.trackerDetails.results,
        groupId
      );
      const newFilterRanges = findMinMax(filteredProductsByGroupId);
      const newStateWithFilterRanges = setIn(newStateWithMenu, 'filterRanges', newFilterRanges);
      return setIn(newStateWithFilterRanges, 'filteredProducts', filteredProductsByGroupId);
    }
    case SET_PRODUCT_TRACKER_PAGE_NUMBER:
      return setIn(state, 'productTrackerCurrentPageNo', action.payload);
    case SET_RETRIEVE_PRODUCT_TRACK_GROUP:
      return setIn(state, 'trackerGroup', action.payload);
    case ADD_PRODUCT_TRACK_GROUP: {
      const newGroup = action.payload;
      const groupsAfterAdd = get(state, 'trackerGroup').slice();
      groupsAfterAdd.splice(groupsAfterAdd.length, 0, newGroup);
      return setIn(state, 'trackerGroup', groupsAfterAdd);
    }
    case UPDATE_PRODUCT_TRACK_GROUP: {
      const updatedGroup = action.payload;
      const groupsAfterUpdate = get(state, 'trackerGroup').map((group: any) =>
        group.id !== updatedGroup.id ? group : updatedGroup
      );
      return setIn(state, 'trackerGroup', groupsAfterUpdate);
    }
    case REMOVE_PRODUCT_TRACK_GROUP: {
      const deletedGroupId = action.payload;
      const groupsAfterDelete = get(state, 'trackerGroup').filter(
        (group: any) => group.id !== deletedGroupId
      );
      const newStateRemove = setIn(state, 'menuItem', null);
      return setIn(newStateRemove, 'trackerGroup', groupsAfterDelete);
    }
    case REMOVE_PRODUCTS_IN_GROUP: {
      const groupIdForRemove = action.payload;

      //update trackerDetails
      const trackerDetailsRemoved = cloneDeep(get(state, 'trackerDetails'));
      trackerDetailsRemoved.results = trackerDetailsRemoved.results.filter(
        (product: any) => product.product_track_group_id !== groupIdForRemove
      );
      trackerDetailsRemoved.count = trackerDetailsRemoved.results.length;
      let newStateRemoveProducts = setIn(state, 'trackerDetails', trackerDetailsRemoved);

      //update filteredProducts & range
      const filterProducts = get(newStateRemoveProducts, 'filteredProducts').filter(
        (product: any) => product.product_track_group_id !== groupIdForRemove
      );
      newStateRemoveProducts = setIn(newStateRemoveProducts, 'filteredProducts', filterProducts);
      const ranges = findMinMax(filterProducts);
      newStateRemoveProducts = setIn(newStateRemoveProducts, 'filterRanges', ranges);

      return newStateRemoveProducts;
    }
    case UPDATE_TRACKED_PRODUCT: {
      const updatedProductDetails = action.payload;
      const trackerDetailsAfterUpdate = get(state, 'trackerDetails.results').map((product: any) =>
        product.id !== updatedProductDetails.id ? product : { ...product, ...updatedProductDetails }
      );
      const newStateWithTrackerDetails = setIn(
        state,
        'trackerDetails.results',
        trackerDetailsAfterUpdate
      );
      const filteredProductsAfterUpdate = get(
        newStateWithTrackerDetails,
        'filteredProducts'
      ).map((product: any) =>
        product.id !== updatedProductDetails.id ? product : { ...product, ...updatedProductDetails }
      );
      return setIn(newStateWithTrackerDetails, 'filteredProducts', filteredProductsAfterUpdate);
    }
    case REMOVE_TRACKED_PRODUCT: {
      const productId = action.payload;
      const trackerDetailsAfterRemove = get(state, 'trackerDetails');
      trackerDetailsAfterRemove.count = trackerDetailsAfterRemove.count - 1;
      trackerDetailsAfterRemove.results = trackerDetailsAfterRemove.results.filter(
        (product: any) => product.id !== productId
      );
      const newStateWithTrackerDetailsRemoved = setIn(
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
    }
    case FILTER_TRACKED_PRODUCTS: {
      const { filterData, groupId } = action.payload;
      const data = _.cloneDeep(filterData);
      const newState = setIn(state, 'filterData', data);
      const filteredProductsByGroupId = filterProductsByGroupId(
        state.trackerDetails.results,
        groupId
      );
      const filteredProducts = findFilteredProducts(filteredProductsByGroupId, data);
      const searchProducts = searchFilteredProduct(filteredProducts, state.filterSearch);
      return setIn(newState, 'filteredProducts', searchProducts);
    }
    case SET_FILTER_SEARCH: {
      return setIn(state, 'filterSearch', action.payload);
    }
    default:
      return state;
  }
};
