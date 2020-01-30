import Axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppConfig } from '../../config';
import { sellerIDSelector } from '../../selectors/Seller';
import { ProductTrackerDetails } from '../../interfaces/Product';
import {
  SET_PRODUCT_TRACKER_DETAILS,
  IS_LOADING_TRACKER_PRODUCTS,
  findMinMaxRange,
  UPDATE_TRACKER_FILTER_RANGES,
  SET_TRACKER_SINGLE_PAGE_ITEMS_COUNT,
  SET_PRODUCT_TRACKER_PAGE_NUMBER,
  SET_RETRIEVE_PRODUCT_TRACK_GROUP,
  SET_MENU_ITEM,
} from '../../constants/Tracker';
import { error } from '../../utils/notifications';

export const isLoadingTrackerProducts = (value: boolean) => ({
  type: IS_LOADING_TRACKER_PRODUCTS,
  payload: value,
});

export const setSupplierProductTrackerDetails = (product: ProductTrackerDetails) => ({
  type: SET_PRODUCT_TRACKER_DETAILS,
  payload: product,
});
export const updateTrackerFilterRanges = (filterRanges: any) => ({
  type: UPDATE_TRACKER_FILTER_RANGES,
  payload: filterRanges,
});

export const setTrackerSinglePageItemsCount = (itemsCount: number) => ({
  type: SET_TRACKER_SINGLE_PAGE_ITEMS_COUNT,
  payload: itemsCount,
});
export const setMenuItem = (menuItem: number) => ({
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

export const fetchSupplierProductTrackerDetails = (
  period: any,
  product_track_group_id: any,
  perPage: any,
  pageNo: any
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch(isLoadingTrackerProducts(true));
  const sellerID = sellerIDSelector();
  const response = product_track_group_id
    ? product_track_group_id === -1
      ? await Axios.get(
          // AppConfig.BASE_URL_API + `sellers/${sellerID}/product-track-data?per_page=15&page=1&period=90`
          AppConfig.BASE_URL_API +
            `sellers/${sellerID}/product-track-data-paginated?per_page=${perPage}&page=${pageNo}&period=${period}&sort=${'avg_price'}&sort_direction=${'desc'}&min_max=avg_margin,avg_daily_sales,avg_roi,avg_profit&product_track_group_id=`
        )
      : await Axios.get(
          // AppConfig.BASE_URL_API + `sellers/${sellerID}/product-track-data?per_page=15&page=1&period=90`
          AppConfig.BASE_URL_API +
            `sellers/${sellerID}/product-track-data-paginated?per_page=${perPage}&page=${pageNo}&period=${period}&sort=${'avg_price'}&sort_direction=${'desc'}&min_max=avg_margin,avg_daily_sales,avg_roi,avg_profit&product_track_group_id=${product_track_group_id}`
        )
    : await Axios.get(
        // AppConfig.BASE_URL_API + `sellers/${sellerID}/product-track-data?per_page=15&page=1&period=90`
        AppConfig.BASE_URL_API +
          `sellers/${sellerID}/product-track-data-paginated?per_page=${perPage}&page=${pageNo}&period=${period}&sort=${'avg_price'}&sort_direction=${'desc'}&min_max=avg_margin,avg_daily_sales,avg_roi,avg_profit`
      );
  if (response.data) {
    dispatch(isLoadingTrackerProducts(false));
    const products = response.data;
    dispatch(setSupplierProductTrackerDetails(products));
    dispatch(updateTrackerFilterRanges(findMinMaxRange(products.results)));
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
      if (json.status === 201 && json.statusText === 'Created') {
        dispatch(retrieveProductTrackGroup());
      }
    })
    .catch(error => {});
};

export const updateProductTrackGroup = (group: any) => (dispatch: any) => {
  const bodyFormData = new FormData();
  bodyFormData.set('id', group.id);
  bodyFormData.set('name', group.name);
  const sellerID = sellerIDSelector();
  return Axios.patch(AppConfig.BASE_URL_API + `sellers/${sellerID}/track/group`, bodyFormData)
    .then(json => {
      if (json.status === 200) {
        dispatch(retrieveProductTrackGroup());
      }
    })
    .catch(error => {});
};

export const deleteProductTrackGroup = (groupId: any) => (dispatch: any) => {
  const bodyFormData = new FormData();
  bodyFormData.set('id', groupId);
  bodyFormData.set('status', 'inactive');
  const sellerID = sellerIDSelector();
  return Axios.patch(AppConfig.BASE_URL_API + `sellers/${sellerID}/track/group`, bodyFormData)
    .then(json => {
      if (json.status === 200) {
        dispatch(retrieveProductTrackGroup());
      }
    })
    .catch(error => {});
};

export const retrieveProductTrackGroup = () => (dispatch: any) => {
  const sellerID = sellerIDSelector();
  return Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}/track/group`)
    .then(json => {
      dispatch(setRetrieveProductTrackGroup(json.data));
    })
    .catch(error => {});
};
