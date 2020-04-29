import Axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppConfig } from '../../config';
import { sellerIDSelector } from '../../selectors/Seller';
import { ProductTrackerDetails } from '../../interfaces/Product';
import {
  SET_PRODUCT_TRACKER_DETAILS,
  IS_LOADING_TRACKER_PRODUCTS,
  SET_TRACKER_SINGLE_PAGE_ITEMS_COUNT,
  SET_PRODUCT_TRACKER_PAGE_NUMBER,
  SET_RETRIEVE_PRODUCT_TRACK_GROUP,
  ADD_PRODUCT_TRACK_GROUP,
  UPDATE_PRODUCT_TRACK_GROUP,
  REMOVE_PRODUCT_TRACK_GROUP,
  UPDATE_TRACKED_PRODUCT,
  REMOVE_TRACKED_PRODUCT,
  SET_MENU_ITEM,
  REMOVE_PRODUCTS_IN_GROUP,
  FILTER_TRACKED_PRODUCTS,
  SET_FILTER_SEARCH,
  IS_PRODUCT_TRACKED,
  VERIFYING_PRODUCT,
} from '../../constants/Tracker';
import { error, success } from '../../utils/notifications';
import { getSellerQuota } from '../Settings';

export const isLoadingTrackerProducts = (value: boolean) => ({
  type: IS_LOADING_TRACKER_PRODUCTS,
  payload: value,
});

export const verifyingProduct = (value: boolean) => ({
  type: VERIFYING_PRODUCT,
  payload: value,
});
export const isProductTracked = (value: boolean, productExist: boolean) => ({
  type: IS_PRODUCT_TRACKED,
  payload: {
    value: value,
    productExist: productExist,
  },
});

export const setSupplierProductTrackerDetails = (product: ProductTrackerDetails) => ({
  type: SET_PRODUCT_TRACKER_DETAILS,
  payload: product,
});

export const setTrackerSinglePageItemsCount = (itemsCount: number) => ({
  type: SET_TRACKER_SINGLE_PAGE_ITEMS_COUNT,
  payload: itemsCount,
});

export const setMenuItem = (menuItem: any) => ({
  type: SET_MENU_ITEM,
  payload: menuItem,
});

export const setProductTrackerPageNumber = (pageNo: number) => ({
  type: SET_PRODUCT_TRACKER_PAGE_NUMBER,
  payload: pageNo,
});

export const setRetrieveProductTrackGroup = (data: any) => ({
  type: SET_RETRIEVE_PRODUCT_TRACK_GROUP,
  payload: data,
});

export const addProductTrackGroup = (data: any) => ({
  type: ADD_PRODUCT_TRACK_GROUP,
  payload: data,
});

export const updateProductTrackGroup = (data: any) => ({
  type: UPDATE_PRODUCT_TRACK_GROUP,
  payload: data,
});

export const removeProductTrackGroup = (data: any) => ({
  type: REMOVE_PRODUCT_TRACK_GROUP,
  payload: data,
});

export const removeProductsInGroup = (data: any) => ({
  type: REMOVE_PRODUCTS_IN_GROUP,
  payload: data,
});

export const updateTrackedProduct = (newProduct: any) => ({
  type: UPDATE_TRACKED_PRODUCT,
  payload: newProduct,
});

export const removeTrackedProduct = (productId: any) => ({
  type: REMOVE_TRACKED_PRODUCT,
  payload: productId,
});

export const fetchAllSupplierProductTrackerDetails = (period: any) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  // table component is tightly coupled to pagination, temporarily using paginated API with a hardcoded value
  const perPage = 999;
  dispatch(isLoadingTrackerProducts(true));
  const sellerID = sellerIDSelector();
  const response = await Axios.get(
    AppConfig.BASE_URL_API +
      // eslint-disable-next-line max-len
      `sellers/${sellerID}/product-track-data-paginated?per_page=${perPage}&period=${period}&sort=${'avg_price'}&sort_direction=${'desc'}&min_max=avg_price,avg_rank,customer_reviews,avg_margin,avg_daily_sales,avg_roi,avg_profit`
  );
  if (response.data) {
    dispatch(setSupplierProductTrackerDetails(response.data));
    dispatch(isLoadingTrackerProducts(false));
  } else {
    dispatch(isLoadingTrackerProducts(false));
    error('Data not found');
  }
};

export const postCreateProductTrackGroup = (name: string) => (dispatch: any) => {
  const sellerID = sellerIDSelector();
  const bodyFormData = new FormData();
  bodyFormData.set('name', name);
  bodyFormData.set('marketplace_id', 'US');
  return Axios.post(AppConfig.BASE_URL_API + `sellers/${sellerID}/track/group`, bodyFormData)
    .then(json => {
      if (json.status === 201) {
        const newGroup = json.data;
        success(`Tracker group successfully created!`);
        dispatch(addProductTrackGroup(newGroup));
        dispatch(setMenuItem(newGroup.id));
      }
    })
    .catch(() => {
      error(`Failed to create new group`);
    });
};

export const checkMWSProduct = (asin: string) => (dispatch: any) => {
  dispatch(verifyingProduct(true));
  const sellerID = sellerIDSelector();
  const bodyFormData = new FormData();
  bodyFormData.set('asin', asin);
  return Axios.post(AppConfig.BASE_URL_API + `sellers/${sellerID}/track/search/check`, bodyFormData)
    .then(json => {
      console.log('json: ', json);
      if (json.status === 200) {
        console.log('response 200: ', json.data.is_tracked);
        dispatch(isProductTracked(json.data.is_tracked, true));
        dispatch(verifyingProduct(false));
      }
    })
    .catch((e: any) => {
      console.log('catch: ', JSON.stringify(e.message));
      dispatch(isProductTracked(true, false));
      dispatch(verifyingProduct(false));
    });
};

export const confirmTrackProduct = (asin: string, marketPlace: string, groupID: number) => (
  dispatch: any
) => {
  console.log('confirmTrackProduct: ', asin, marketPlace, groupID.toString());
  const sellerID = sellerIDSelector();
  const bodyFormData = new FormData();
  bodyFormData.set('product_track_group_id', groupID.toString());
  bodyFormData.set('asin', asin);
  bodyFormData.set('marketplace', marketPlace.toString());
  return Axios.post(
    AppConfig.BASE_URL_API + `sellers/${sellerID}/track/search/confirm`,
    bodyFormData
  )
    .then(json => {
      console.log('confirmTrackProduct json: ', json);
      if (json.status === 200) {
        dispatch(verifyingProduct(false));
        console.log('response 200: ', json.data);
      }
    })
    .catch((e: any) => {
      console.log('catch: ', JSON.stringify(e.message));
    });
};

export const patchProductTrackGroup = (group: any) => (dispatch: any) => {
  const bodyFormData = new FormData();
  bodyFormData.set('id', group.id);
  bodyFormData.set('name', group.name);
  const sellerID = sellerIDSelector();
  return Axios.patch(AppConfig.BASE_URL_API + `sellers/${sellerID}/track/group`, bodyFormData)
    .then(json => {
      if (json.status === 200) {
        success(`Tracker group successfully updated!`);
        dispatch(updateProductTrackGroup(group));
      }
    })
    .catch(() => {
      error(`Failed to update tracker group name`);
    });
};

export const deleteProductTrackGroup = (groupId: any) => (dispatch: any) => {
  const bodyFormData = new FormData();
  bodyFormData.set('id', groupId);
  bodyFormData.set('status', 'inactive');
  const sellerID = sellerIDSelector();
  return Axios.patch(AppConfig.BASE_URL_API + `sellers/${sellerID}/track/group`, bodyFormData)
    .then(json => {
      if (json.status === 200) {
        success(`Tracker group successfully deleted!`);
        dispatch(removeProductTrackGroup(groupId));
        dispatch(getSellerQuota());
        dispatch(setMenuItem(null));
        dispatch(removeProductsInGroup(groupId));
      }
    })
    .catch(() => {
      error(`Failed to delete tracker group`);
    });
};

export const filterTrackedProducts = (filterData: any, groupId: any) => ({
  type: FILTER_TRACKED_PRODUCTS,
  payload: {
    filterData: filterData,
    groupId: groupId,
  },
});

export const setProductFilterSearch = (value: string) => ({
  type: SET_FILTER_SEARCH,
  payload: value,
});

export const retrieveProductTrackGroup = () => (dispatch: any) => {
  const sellerID = sellerIDSelector();
  return Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}/track/group`)
    .then(json => {
      dispatch(setRetrieveProductTrackGroup(json.data));
    })
    .catch(() => {
      //display error
    });
};
