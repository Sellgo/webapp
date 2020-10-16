import Axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppConfig } from '../../config';
import { sellerIDSelector } from '../../selectors/Seller';
import { ProductTrackerDetails } from '../../interfaces/Product';
import {
  SET_PRODUCT_TRACKER_DETAILS,
  IS_LOADING_TRACKER_PRODUCTS,
  IS_TRACKER_FILTER_LOADING,
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
  CHECKED_PRODUCTS_DATA,
  VERIFYING_PRODUCT,
  RESET_FILTER,
  SET_COST_DETAILS,
} from '../../constants/Tracker';
import { error, success } from '../../utils/notifications';
import { getSellerQuota, handleUnauthorizedMwsAuth } from '../Settings';
import { trackerProductDetails } from '../../selectors/ProductTracker';

export const isLoadingTrackerProducts = (value: boolean) => ({
  type: IS_LOADING_TRACKER_PRODUCTS,
  payload: value,
});

export const isTrackerFilterLoading = (value: boolean) => ({
  type: IS_TRACKER_FILTER_LOADING,
  payload: value,
});

export const verifyingProduct = (value: boolean) => ({
  type: VERIFYING_PRODUCT,
  payload: value,
});

export const checkedProductsData = (value: any) => ({
  type: CHECKED_PRODUCTS_DATA,
  payload: value,
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

export const resetFilter = (data: any) => ({
  type: RESET_FILTER,
  payload: data,
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
        dispatch(addProductTrackGroup(newGroup));
        dispatch(setMenuItem(newGroup.id));
        success(`Tracker group successfully created!`);
      }
    })
    .catch(() => {
      error(`Failed to create new group`);
    });
};

export const checkTrackProduct = (asin: string) => (dispatch: any) => {
  dispatch(verifyingProduct(true));
  const sellerID = sellerIDSelector();
  const bodyFormData = new FormData();
  bodyFormData.set('asin', asin);
  return Axios.post(AppConfig.BASE_URL_API + `sellers/${sellerID}/track/search/check`, bodyFormData)
    .then(json => {
      if (json.status === 200) {
        dispatch(checkedProductsData(json.data));
        dispatch(verifyingProduct(false));
      }
    })
    .catch(err => {
      if (err.response.status === 401) {
        dispatch(handleUnauthorizedMwsAuth());
      } else {
        dispatch(verifyingProduct(false));
        error(err.response.data.message);
      }
    });
};

export const confirmTrackProduct = (
  asin: string,
  marketPlace: string,
  period: number,
  groupID?: number
) => (dispatch: any) => {
  dispatch(isLoadingTrackerProducts(true));
  const sellerID = sellerIDSelector();
  const bodyFormData = new FormData();
  if (groupID) {
    bodyFormData.set('product_track_group_id', groupID.toString());
  }
  bodyFormData.set('asin', asin);
  bodyFormData.set('marketplace', marketPlace.toString());
  return Axios.post(
    AppConfig.BASE_URL_API + `sellers/${sellerID}/track/search/confirm`,
    bodyFormData
  )
    .then(json => {
      if (json.status === 200) {
        const asinList = asin.replace(',', ', ').toUpperCase();
        success(`Product${json.data.length > 1 ? 's' : ''} ${asinList} Successfully Tracked`);
        setTimeout(() => {
          dispatch(fetchAllSupplierProductTrackerDetails(period));
          dispatch(setMenuItem(null));
          dispatch(getSellerQuota());
          dispatch(resetFilter(true));
        }, 300);
      }
    })
    .catch(err => {
      if (err.response.status === 401) {
        dispatch(handleUnauthorizedMwsAuth());
      } else {
        error('Unable to Add Product');
        dispatch(isLoadingTrackerProducts(false));
      }
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

export const setCostDetails = (payload: any) => ({
  type: SET_COST_DETAILS,
  payload: payload,
});

export const setProductDetails = (payload: any) => (dispatch: any) => {
  try {
    dispatch(setCostDetails(payload));
  } catch (e) {
    //display error
  }
};

export const updateProductCost = (payload: any) => async (dispatch: any, getState: () => any) => {
  const { supplier_id, product_id, product_cost, id, period, avg_price } = payload;
  const sellerID = sellerIDSelector();
  const products = trackerProductDetails(getState());
  const bodyFormData = new FormData();
  if (supplier_id) {
    bodyFormData.set('supplier_id', supplier_id);
  }
  bodyFormData.set('product_id', product_id);
  bodyFormData.set('product_cost', product_cost);
  bodyFormData.set('id', id);
  bodyFormData.set('period', period);
  bodyFormData.set('avg_price', avg_price);

  return Axios.post(AppConfig.BASE_URL_API + `sellers/${sellerID}/track/product/cost`, bodyFormData)
    .then(({ data }) => {
      success(`Product cost successfully updated!`);
      const updated = products.results.map((p: any) => {
        if (p.id === id) {
          p = { ...p, ...data };
        }
        return p;
      });
      dispatch(setSupplierProductTrackerDetails({ ...products, results: updated }));
    })
    .catch(() => {
      error(`Failed to update product cost`);
    });
};
