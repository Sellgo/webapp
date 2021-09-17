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
  SET_ACTIVE_PRODUCT,
  SET_ACTIVE_PRODUCT_HEIGHT,
  SET_ACTIVE_PRODUCT_INDEX,
  SET_ACTIVE_PRODUCT_SELLER_INDEX,
  SET_ACTIVE_SELLER_INDEX,
  SET_LOADING_SELLERS,
  SET_PRODUCT_SELLERS,
  SET_SELLER_PRODUCTS_COUNT,
  SET_SELLER_PRODUCTS_PAGE_COUNT,
  SET_SELLER_PRODUCTS_PAGE_NO,
  SET_SELLER_PRODUCTS_PAGE_SIZE,
  SET_SELLER_TRACK_GROUPS,
  SET_SELLERS_COUNT,
  SET_SELLERS_FILTERS,
  SET_SELLERS_FILTERS_LOADING,
  SET_SELLERS_PAGE_COUNT,
  SET_SELLERS_PAGE_NO,
  SET_SELLERS_SINGLE_PAGE_ITEMS_COUNT,
  SET_SELLERS_SORT,
  SET_SELLERS_SORT_DIRECTION,
  SET_TRACK_PRODUCT_SELLER,
} from '../../constants/SellerFinder';
import { sellerIDSelector } from '../../selectors/Seller';
import { AppConfig } from '../../config';
import { error, info, success } from '../../utils/notifications';
import { SET_MENU_ITEM } from '../../constants/Tracker';
import {
  productSellers,
  sellerProducts,
  sellersSort,
  sellersSortDirection,
  sellers,
  activeProductHeight,
  activeProductIndex,
} from '../../selectors/SellerFinder';
import {
  updateParentHeight,
  updateProductHeight,
} from '../../containers/SellerFinder/SellerDetails/InnerTree';
import { getSellerQuota } from '../Settings';
import { showSellerInformation } from '../../containers/SellerFinder/SellerFinderTable';
export interface SellersPayload {
  enableLoader?: boolean;
  pageNo?: number;
  pageSize?: number;
  sort?: string;
  sortDirection?: string;
  query?: string;
}
export interface SellersProductsPayload {
  enableLoader: boolean;
  merchantId: string;
  pageSize: number;
  pageNo: number;
}

export interface ProductSellersPayload {
  enableLoader: boolean;
  merchantId: any;
  asin: string;
}

export interface TrackProductPayload {
  status: string;
  product_id: number;
  product_track_id?: number;
}

export const fetchSellers = (payload: SellersPayload) => async (dispatch: any, getState: any) => {
  try {
    const defaultSort = sellersSort(getState());
    const defaultSortDirection = sellersSortDirection(getState);
    const {
      pageNo = 1,
      pageSize = 50,
      sort = defaultSort,
      sortDirection = defaultSortDirection,
      query,
    } = payload;
    const pagination = `page=${pageNo}&per_page=${pageSize}`;
    const sorting = `ordering=${sortDirection === 'descending' ? `-${sort}` : sort}`;
    const sellerID = sellerIDSelector();
    const url =
      AppConfig.BASE_URL_API +
      `sellers/${sellerID}/merchants?${pagination}&${sorting}${query ? query : ''}`;
    if (payload.enableLoader) {
      await dispatch(fetchingSellers(true));
    } else {
      dispatch(setLoadingSellers(true));
    }

    const res = await Axios.get(url);
    if (res) {
      const { count, current_page, per_page, results, total_pages } = res.data;
      dispatch(setSellers(results));
      dispatch(setSellersPageNo(current_page));
      dispatch(setSellersCount(count));
      dispatch(setSellersPageSize(per_page));
      dispatch(setSellersPageCount(total_pages));
      dispatch(setSellersSortDirection(sortDirection));
      dispatch(setSellersSort(sort));
    }
    await dispatch(fetchingSellers(false));
    dispatch(setLoadingSellers(false));
  } catch (err) {
    await dispatch(fetchingSellers(false));
    await dispatch(fetchingError(err));
  }
};
export const fetchSellerFilters = (query: string) => async (dispatch: any) => {
  try {
    dispatch(fetchingSellersFilters(true));
    const sellerID = sellerIDSelector();

    const url = AppConfig.BASE_URL_API + `sellers/${sellerID}/merchants?${query}`;
    const res = await Axios.get(url);
    if (res) {
      dispatch(setSellerFilters(res.data));
      dispatch(fetchingSellersFilters(false));
    }
  } catch (err) {
    console.log('Filters Fetching Error', err);
  }
};
export const fetchInventory = (data: any) => async (dispatch: any) => {
  await dispatch(fetchingInventory(data));
};

export const setActiveProductSellerStatus = (data: any) => async (dispatch: any) => {
  await dispatch(setProductData(data));
};
export const setActiveProduct = (data: any) => async (dispatch: any) => {
  await dispatch(setActiveProductData(data));
};

export const fetchSellerProducts = (payload: SellersProductsPayload) => async (dispatch: any) => {
  try {
    const { pageNo = 1, pageSize = 25 } = payload;
    const sellerID = sellerIDSelector();
    const pagination = `page=${pageNo}&per_page=${pageSize}`;
    const url =
      AppConfig.BASE_URL_API +
      `sellers/${sellerID}/merchants/${payload.merchantId}/products?${pagination}`;
    if (payload.enableLoader) {
      await dispatch(fetchingSellerProducts(true));
    }
    const res = await Axios.get(url);
    if (res) {
      const { results, count, per_page, num_pages } = res.data;
      await dispatch(setSellerProducts(results));
      await dispatch(setProductsCount(count));
      await dispatch(setProductsPageCount(num_pages));
      await dispatch(setProductsPageSize(per_page));
      await dispatch(setProductsPageNo(pageNo));
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
      AppConfig.BASE_URL_API + `sellers/${sellerID}/merchants?parent_asin=${payload.asin}`;
    if (payload.enableLoader) {
      await dispatch(fetchingProductSellers(true));
    }
    const res = await Axios.get(url);
    if (res.data) {
      const { results } = res.data;

      await dispatch(setProductSellers(results));
    }
    await dispatch(fetchingProductSellers(false));
  } catch (err) {
    await dispatch(setProductSellersError(err));
    await dispatch(fetchingProductSellers(false));
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
      console.error('Error Deleting Seller', err);
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
      console.error('Error loading track groups for seller', err);
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
    console.error('Error deleting a group', err);
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
        dispatch(setMenuItem(null));
      } else {
        success(`Tracker group successfully updated`);
      }
      dispatch(getAllSellerTrackGroups());
    }
  } catch (err) {
    console.error('Error updating group', err);
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
    console.error('Error updating group', err);
  }
};

export const trackProduct = (payload: TrackProductPayload) => async (
  dispatch: any,
  getState: any
) => {
  try {
    const { product_id, status, product_track_id = null } = payload;
    const sellerID = sellerIDSelector();
    let products = sellerProducts(getState());
    const url = `${AppConfig.BASE_URL_API}sellers/${sellerID}/track/product`;
    const data = new FormData();
    data.set('seller_id', `${sellerID}`);
    data.set('product_id', `${product_id}`);
    if (product_track_id) {
      data.set('id', `${product_track_id}`);
    }
    data.set('status', status);

    const res = !product_track_id ? await Axios.post(url, data) : await Axios.patch(url, data);
    const obj = res.data;
    info(obj.message);
    products = products.map((product: any) => {
      let prod = product;
      if (product.product_id === obj.object.product_id) {
        prod = {
          ...prod,
          tracking_status: obj.object.status,
          product_track_id: obj.object.id,
        };
      }
      return prod;
    });
    await dispatch(setSellerProducts(products));
    await dispatch(getSellerQuota());
  } catch (err) {
    console.log('Error Tracking Seller', err);
  }
};

export const trackProductSeller = (merchantId: any) => async (dispatch: any, getState: any) => {
  try {
    const sellerID = sellerIDSelector();
    const url = `${AppConfig.BASE_URL_API}sellers/${sellerID}/merchants/track`;
    let amazonSellers = productSellers(getState());
    const topLevelSellers = sellers(getState());
    const productHeight = activeProductHeight(getState());
    const productIndex = activeProductIndex(getState());
    const products = sellerProducts(getState());
    dispatch(setProductSellerTrackStatus({ seller_merchant_id: merchantId }));
    const payload = new FormData();
    payload.set('seller_merchant_id', merchantId);
    const res = await Axios.post(url, payload);
    const data = res.data;
    if (data) {
      const status = data.object.tracking_status;
      amazonSellers = amazonSellers.map((seller: any) => {
        let update = seller;
        if (seller.seller_merchant_id === data.object.id) {
          update = { ...update, tracking_status: status };
        }
        return update;
      });

      info(`Seller ${status === 'active' ? 'Tracking' : 'Untracking'}`);
      let update = topLevelSellers;
      if (status === 'active') {
        update = [data.object, ...topLevelSellers];
      } else {
        update = update.filter(
          (seller: any) => seller.seller_merchant_id !== data.object.seller_merchant_id
        );
      }
      await dispatch(
        fetchProductSellers({
          enableLoader: false,
          merchantId: data.object.seller_merchant_id,
          asin: data.object.parent_asin,
        })
      );
      await dispatch(setSellers(update));
      await dispatch(setProductSellerTrackStatus({ seller_merchant_id: null }));
      const parentHeight = amazonSellers.length * 45;
      await updateParentHeight(
        (parentHeight >= 450 ? parentHeight : 550) + (productHeight + products.length * 50),
        false
      );
      await updateProductHeight(50, amazonSellers.length, productIndex - 1);
      await updateProductHeight(productHeight, amazonSellers.length, productIndex);
      await showSellerInformation();

      const message =
        status === 'active'
          ? 'Merchant has been added to the list!'
          : 'Merchant has been removed from the list!';
      await success(message);
    }
  } catch (err) {
    console.log('Error Tracking Seller', err);
    const { response } = err as any;
    if (response) {
      const { status, data } = response;
      if (status === 400 && data && data.message && data.message.length > 0) {
        info(data.message);
        dispatch(setProductSellerTrackStatus({ seller_merchant_id: null }));
      }
    }
  }
};

export const setSellersSinglePageItemsCount = (count: number) => async (dispatch: any) => {
  dispatch(updateSellersSinglePageItemsCount(count));
};

export const setProductIndex = (index: number) => async (dispatch: any) =>
  dispatch(setActiveProductIndex(index));

export const setProductSellerIndex = (index: number) => async (dispatch: any) =>
  dispatch(setActiveProductSellerIndex(index));

export const setSellerIndex = (index: number) => async (dispatch: any) =>
  dispatch(setActiveSellerIndex(index));

export const setProductHeight = (height: number) => async (dispatch: any) =>
  dispatch(setActiveProductHeight(height));

export const setSellerHeight = (height: number) => async (dispatch: any) =>
  dispatch(setSellerHeight(height));

export const updateSellers = (sellerInfo: any) => async (dispatch: any, getState: any) => {
  let data = sellers(getState());
  data = data.map((seller: any) => {
    if (seller.merchant_id === sellerInfo.sellerId) {
      seller = { ...seller, last_check_inventory: sellerInfo.last_check_inventory };
    }
    return seller;
  });

  dispatch(setSellers(data));
};

const setProductsCount = (count: number) => ({
  type: SET_SELLER_PRODUCTS_COUNT,
  data: count,
});

const setProductsPageCount = (count: number) => ({
  type: SET_SELLER_PRODUCTS_PAGE_COUNT,
  data: count,
});

const setProductsPageSize = (size: number) => ({
  type: SET_SELLER_PRODUCTS_PAGE_SIZE,
  data: size,
});

const setProductsPageNo = (page: number) => ({
  type: SET_SELLER_PRODUCTS_PAGE_NO,
  data: page,
});

const setProductData = (data: any) => ({
  type: SET_PRODUCT_SELLERS,
  data: data,
});
const setActiveProductData = (data: any) => ({
  type: SET_ACTIVE_PRODUCT,
  data: data,
});

const setSellersCount = (count: number) => ({
  type: SET_SELLERS_COUNT,
  data: count,
});

const setSellersPageCount = (count: number) => ({
  type: SET_SELLERS_PAGE_COUNT,
  data: count,
});

const setSellersPageSize = (size: number) => ({
  type: SET_SELLERS_PAGE_COUNT,
  data: size,
});

const setSellersPageNo = (page: number) => ({
  type: SET_SELLERS_PAGE_NO,
  data: page,
});

const updateSellersSinglePageItemsCount = (count: number) => ({
  type: SET_SELLERS_SINGLE_PAGE_ITEMS_COUNT,
  data: count,
});

const setLoadingSellers = (loading: boolean) => ({
  type: SET_LOADING_SELLERS,
  data: loading,
});

const setSellersSort = (sort: string) => ({
  type: SET_SELLERS_SORT,
  data: sort,
});
const setSellersSortDirection = (sortDirection: string) => ({
  type: SET_SELLERS_SORT_DIRECTION,
  data: sortDirection,
});

const fetchingSellersFilters = (loading: boolean) => ({
  type: SET_SELLERS_FILTERS_LOADING,
  data: loading,
});
const setSellerFilters = (filters: []) => ({
  type: SET_SELLERS_FILTERS,
  data: filters,
});

const setActiveProductIndex = (index: number) => ({
  type: SET_ACTIVE_PRODUCT_INDEX,
  data: index,
});

const setActiveProductSellerIndex = (index: number) => ({
  type: SET_ACTIVE_PRODUCT_SELLER_INDEX,
  data: index,
});

const setActiveSellerIndex = (index: number) => ({
  type: SET_ACTIVE_SELLER_INDEX,
  data: index,
});

const setActiveProductHeight = (height: number) => ({
  type: SET_ACTIVE_PRODUCT_HEIGHT,
  data: height,
});

const setProductSellerTrackStatus = (data: any) => ({
  type: SET_TRACK_PRODUCT_SELLER,
  data,
});
