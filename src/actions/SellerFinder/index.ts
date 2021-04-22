import Axios from 'axios';
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
  SET_SELLER_TRACK_GROUPS,
} from '../../constants/SellerFinder';
import { sellerIDSelector } from '../../selectors/Seller';
import { AppConfig } from '../../config';
import { error, success } from '../../utils/notifications';
import { SET_MENU_ITEM } from '../../constants/Tracker';
export interface SellersPayload {
  enableLoader: boolean;
}
export interface SellersProductsPayload {
  enableLoader: boolean;
  merchantId: string;
}

export interface ProductSellersPayload {
  enableLoader: boolean;
  merchantId: string;
}

export const fetchSellers = (payload: SellersPayload) => async (dispatch: any) => {
  try {
    const sellerID = sellerIDSelector();
    const url = AppConfig.BASE_URL_API + `sellers/${sellerID}/merchants`;
    if (payload.enableLoader) {
      await dispatch(fetchingSellers(true));
    }
    const res = await Axios.get(url);
    if (res) {
      dispatch(setSellers(res.data));
    }
    await dispatch(fetchingSellers(false));
  } catch (err) {
    await dispatch(fetchingSellers(false));
    await dispatch(fetchingError(err));
  }
};

export const fetchInventory = (data: any) => async (dispatch: any) => {
  await dispatch(fetchingInventory(data));
};

export const fetchSellerProducts = (payload: SellersProductsPayload) => async (dispatch: any) => {
  try {
    const sellerID = sellerIDSelector();
    const url =
      AppConfig.BASE_URL_API + `sellers/${sellerID}/merchants/${payload.merchantId}/products`;
    if (payload.enableLoader) {
      await dispatch(fetchingSellerProducts(true));
    }
    const res = await Axios.get(url);
    if (res) {
      console.log(res);
      await dispatch(setSellerProducts(res.data));
    }
    await dispatch(fetchingSellerProducts(false));
  } catch (err) {
    await dispatch(setSellerProductsError(err));
  }
};

export const fetchProductSellers = (payload: ProductSellersPayload) => async (dispatch: any) => {
  try {
    const sellerID = sellerIDSelector();
    const url =
      AppConfig.BASE_URL_API + `sellers/${sellerID}/merchants/${payload.merchantId}/products`;
    if (payload.enableLoader) {
      await dispatch(fetchingProductSellers(true));
    }
    const res = await Axios.get(url);
    if (res) {
      console.log(res);
      await dispatch(setProductSellers(res.data));
    }
    await dispatch(fetchingProductSellers(false));
  } catch (err) {
    await dispatch(setProductSellersError(err));
  }
};

const fetchingSellers = (fetching: boolean) => ({
  type: FETCH_SELLERS,
  data: fetching,
});

const setSellers = (data: any[]) => ({
  type: FETCH_SELLERS_SUCCESS,
  data,
});

const fetchingError = (error: any) => ({
  type: FETCH_SELLERS_ERROR,
  data: error,
});

const fetchingInventory = (data: any) => ({
  type: FETCH_INVENTORY,
  data,
});

const fetchingSellerProducts = (loading: boolean) => ({
  type: FETCH_SELLER_PRODUCTS,
  data: loading,
});

const setSellerProducts = (data: any) => ({
  type: FETCH_SELLER_PRODUCTS_SUCCESS,
  data,
});

const setSellerProductsError = (error: any) => ({
  type: FETCH_SELLER_PRODUCTS_ERROR,
  data: error,
});

const fetchingProductSellers = (loading: boolean) => ({
  type: FETCH_PRODUCT_SELLERS,
  data: loading,
});

const setProductSellers = (data: any) => ({
  type: FETCH_PRODUCT_SELLERS_SUCCESS,
  data,
});

const setProductSellersError = (error: any) => ({
  type: FETCH_PRODUCT_SELLERS_ERROR,
  data: error,
});

/* Delet seller with merchant id */
export const handleDeleteSeller = (merchantID: number) => {
  return async (dispatch: any) => {
    try {
      const sellerID = sellerIDSelector();
      const URL = AppConfig.BASE_URL_API + `sellers/${sellerID}/merchants/${merchantID}`;

      const response = await Axios.delete(URL);

      if (response.data) {
        const { message } = response.data;
        success(message);
        dispatch(fetchSellers({ enableLoader: false }));
      }
    } catch (err) {
      console.error('Error Deleting Seller', err.response);
      error('Oops! The Seller could not be deleted');
    }
  };
};

/* Action to set active track groups for seller */
export const setSellerTrackGroups = (data: any) => {
  return {
    type: SET_SELLER_TRACK_GROUPS,
    data,
  };
};

/* Action to get all tracked groups */
export const getAllSellerTrackGroups = () => {
  return async (dispatch: any) => {
    try {
      const sellerID = sellerIDSelector();
      const URL = AppConfig.BASE_URL_API + `sellers/${sellerID}/merchants/group`;
      const response = await Axios.get(URL);
      if (response.data) {
        dispatch(setSellerTrackGroups(response.data));
      }
    } catch (err) {
      console.error('Error loading track groups for seller', err.response);
    }
  };
};

/* Action to set menu items */
export const setMenuItem = (menuItem: any) => ({
  type: SET_MENU_ITEM,
  data: menuItem,
});

/* Action to create a new group with name */
export const postCreateSellerTrackGroup = (name: string) => async (dispatch: any) => {
  const sellerID = sellerIDSelector();
  const bodyFormData = new FormData();
  bodyFormData.set('name', name);

  try {
    const response = await Axios.post(
      AppConfig.BASE_URL_API + `sellers/${sellerID}/merchants/group`,
      bodyFormData
    );

    const { data, status } = response;

    if (status === 201) {
      const newGroup = data;
      dispatch(getAllSellerTrackGroups());
      dispatch(setMenuItem(newGroup.id));
      success(`Tracker group successfully created!`);
    }
  } catch (err) {
    error('Failed to create a new group');
  }
};

/* Action to delete seller track group */
export const deleteSellerTrackGroup = (groupID: number) => async (dispatch: any) => {
  const sellerID = sellerIDSelector();

  try {
    const URL = AppConfig.BASE_URL_API + `sellers/${sellerID}/merchants/group?id=${groupID}`;

    // axios doesn't accept form data in delete requests
    const response = await Axios.delete(URL);

    const { status } = response;

    if (status === 200) {
      dispatch(getAllSellerTrackGroups());
      dispatch(fetchSellers({ enableLoader: false }));
      dispatch(setMenuItem(null));
      success(`Tracker group successfully deleted!`);
    }
  } catch (err) {
    console.error('Error deleting a group', err.response);
    error(`Failed to delete tracker group`);
  }
};

/* Action to update a tracker group */
export const updateSellerTrackerGroup = (group: any) => async (dispatch: any) => {
  const sellerID = sellerIDSelector();

  const formData = new FormData();
  formData.set('name', group.name);
  formData.set('status', group.status);

  try {
    const URL = AppConfig.BASE_URL_API + `sellers/${sellerID}/merchants/group?id=${group.id}`;
    const response = await Axios.patch(URL, formData);

    const { status } = response;
    if (status === 200) {
      // when we want to keep tracking merchants in group but delete the group
      if (group.status === 'inactive') {
        dispatch(fetchSellers({ enableLoader: false }));
        success(`Tracker group successfully deleted!`);
      } else {
        success(`Tracker group successfully updated`);
      }
      dispatch(getAllSellerTrackGroups());
    }
  } catch (err) {
    console.error('Error updating group', err.response);
  }
};

/* Action to move a merchant another tracker group */
export const moveMerchantToSellerTrackGroup = (merchantId: number, groupID: number) => async (
  dispatch: any
) => {
  const sellerID = sellerIDSelector();

  try {
    const URL =
      AppConfig.BASE_URL_API +
      `sellers/${sellerID}/merchants/group?id=${groupID}&merchant_ids=${merchantId}`;
    const response = await Axios.patch(URL);
    const { status } = response;
    if (status === 200) {
      dispatch(getAllSellerTrackGroups());
      dispatch(fetchSellers({ enableLoader: false }));
      dispatch(setMenuItem(groupID));
      success(`Merchant successfully moved to group`);
    }
  } catch (err) {
    console.error('Error updating group', err.response);
  }
};
