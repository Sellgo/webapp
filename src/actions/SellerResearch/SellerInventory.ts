import axios from 'axios';

/* Config */
import { AppConfig } from '../../config';

/* Action Types */
import { actionTypes } from '../../constants/SellerResearch/SellerInventory';

/* Selectors */
import { sellerIDSelector } from '../../selectors/Seller';
import {
  getSellerInventoryProductsTableResults,
  getSellerInventoryProductsTableSellersResults,
  getSellerInventoryTableResults,
} from '../../selectors/SellerResearch/SellerInventory';

/* Actions */
import { getSellerQuota } from '../Settings';

/* Utils */
import { error, info, success } from '../../utils/notifications';

/* Interfaces */
import {
  DeleteSellerPayload,
  SellerInventoryProductsTablePaginationInfo,
  SellerInventoryProductsTablePayload,
  SellerInventoryProductsTableSellersPaginationInfo,
  SellerInventoryProductsTableSellersPayload,
  SellerInventoryTablePaginationInfo,
  SellerInventoryTablePayload,
  SellerInventoryTableGroup,
  TrackUntrackProduct,
  TrackUntrackProductSeller,
  SellerInventoryTableActiveGroupId,
  CreateSellerGroup,
  UpdateSellerGroup,
  DeleteSellergroup,
} from '../../interfaces/SellerResearch/SellerInventory';

/* ============================================ */
/* ====== SELLER INVENTORY MAIN TABLE ========= */
/* ============================================ */

/* Action to set loading state for main table */
export const isLoadingSellerInventoryTable = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_SELLER_INVENTORY_TABLE,
    payload,
  };
};

/* Action to set seller inventory table results */
export const setSellerInventoryTableResults = (payload: any[]) => {
  return {
    type: actionTypes.SET_SELLER_INVENTORY_TABLE_RESULTS,
    payload,
  };
};

/* Action to set the seller inventory pagination info results */
export const setSellerInventoryTablePaginationInfo = (
  payload: SellerInventoryTablePaginationInfo
) => {
  return {
    type: actionTypes.SET_SELLER_INVENTORY_TABLE_PAGINATION_INFO,
    payload,
  };
};

/* Action to set seller inventory expanded row */
export const setSellerInventoryTableExpandedRow = (payload: any) => {
  return {
    type: actionTypes.SET_SELLER_INVENTORY_TABLE_EXPANDED_ROW,
    payload,
  };
};

/* ============================================ */
/* ====== SELLER INVENTORY  TABLE GROUPS ===== */
/* ============================================ */

/* Action to set seller inventory groups */
export const setSellerInventoryTableGroups = (payload: SellerInventoryTableGroup[]) => {
  return {
    type: actionTypes.SET_SELLER_INVENTORY_TABLE_GROUPS,
    payload,
  };
};

/* Action to set the active seller inventory table group */
export const setSellerInventoryTableActiveGroupId = (
  payload: SellerInventoryTableActiveGroupId
) => {
  return {
    type: actionTypes.SET_SELLER_INVENTORY_TABLE_ACTIVE_GROUP_ID,
    payload,
  };
};

/* ============================================ */
/* ====== SELLER INVENTORY MAIN TABLE ========= */
/* ============================================ */

/* Action to set loading state for seller inventory products table */
export const isLoadingSellerInventoryProductsTable = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_SELLER_INVENTORY_PRODUCTS_TABLE,
    payload,
  };
};

/* Action to set seller inventory products table results */
export const setSellerInventoryProductsTableResults = (payload: any[]) => {
  return {
    type: actionTypes.SET_SELLER_INVENTORY_PRODUCTS_TABLE_RESULTS,
    payload,
  };
};

/* Action to set the seller inventory products table pagination info  */
export const setSellerInventoryProductsTablePagintionInfo = (
  payload: SellerInventoryProductsTablePaginationInfo
) => {
  return {
    type: actionTypes.SET_SELLER_INVENTORY_PRODUCTS_TABLE_PAGINATION_INFO,
    payload,
  };
};

/* Action to set seller inventory prpducts table expanded row */
export const setSellerInventoryProductsTableExpandedRow = (payload: any) => {
  return {
    type: actionTypes.SET_SELLER_INVENTORY_PRODUCTS_TABLE_EXPANDED_ROW,
    payload,
  };
};

/* ====================================================== */
/* ====== SELLER INVENTORY PRODUCTS SELLERS TABLE ========= */
/* ====================================================== */

/* Action to set loading state for seller inventory products table sellers */
export const isLoadingSellerInventoryProductsTableSellers = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_SELLER_INVENTORY_PRODUCTS_TABLE_SELLERS,
    payload,
  };
};

/* Action to set seller inventory products table sllers results */
export const setSellerInventoryProductsTableSellersResults = (payload: any) => {
  return {
    type: actionTypes.SET_SELLER_INVENTORY_PRODUCTS_TABLE_SELLERS_RESULTS,
    payload,
  };
};

/* Action to set seller inventory products table sellers pagination info */
export const setSellerInventoryProductsTableSellersPaginationInfo = (
  payload: SellerInventoryProductsTableSellersPaginationInfo
) => {
  return {
    type: actionTypes.SET_SELLER_INVENTORY_PRODUCTS_TABLE_SELLERS_PAGINATION_INFO,
    payload,
  };
};

/* ============================================ */
/* ================= ASYNC ACIONS ========== */
/* ============================================ */

/* ============================================ */
/* ========== SELLER INVENTORY TABLE =========== */
/* ============================================ */

/* Action to fetch the seller inventory table */
export const fetchSellerInventoryTableResults = (payload: SellerInventoryTablePayload) => async (
  dispatch: any
) => {
  const sellerId = sellerIDSelector();

  const {
    enableLoader = true,
    sort = 'udate',
    sortDir = 'desc',
    page = 1,
    perPage = 20,
    search = '',
  } = payload;

  try {
    const pagination = `page=${page}&per_page=${perPage}`;
    const sorting = `ordering=${sortDir === 'desc' ? `-${sort}` : sort}`;

    let resourcePath = `${sorting}&${pagination}`;

    if (search) {
      resourcePath = `${resourcePath}&search=${search}`;
    }

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/merchants?${resourcePath}`;

    dispatch(isLoadingSellerInventoryTable(enableLoader));

    const { data } = await axios.get(URL);

    if (data) {
      const { results, ...paginationInfo } = data;
      dispatch(setSellerInventoryTableResults(results));
      dispatch(setSellerInventoryTablePaginationInfo(paginationInfo));
      dispatch(isLoadingSellerInventoryTable(false));
    } else {
      dispatch(isLoadingSellerInventoryTable(false));
      dispatch(setSellerInventoryTableResults([]));
      dispatch(
        setSellerInventoryTablePaginationInfo({
          per_page: 20,
          total_pages: 0,
          count: 0,
          current_page: 0,
        })
      );
    }
  } catch (err) {
    console.error('Error fetching seller inventory table', err);
    dispatch(isLoadingSellerInventoryTable(false));
    dispatch(setSellerInventoryTableResults([]));
    dispatch(
      setSellerInventoryTablePaginationInfo({
        per_page: 20,
        total_pages: 0,
        count: 0,
        current_page: 0,
      })
    );
  }
};

/* Action to delete seller from table */
export const deleteSellerFromTable = (payload: DeleteSellerPayload) => async (dispatch: any) => {
  const sellerId = sellerIDSelector();

  try {
    const { id } = payload;

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/merchants/${id}`;

    const { data } = await axios.delete(URL);

    if (data) {
      dispatch(fetchSellerInventoryTableResults({ enableLoader: false }));
      success('Seller successfully deleted');
    }
  } catch (err) {
    console.error('Error deleting seler from table', err);
  }
};

/* ============================================ */
/* ====== SELLER INVENTORY  TABLE GROUPS ===== */
/* ============================================ */

/* Action to fetch all active seller inventiry table groups */
export const fetchSellerInventoryTableGroups = () => async (dispatch: any) => {
  const sellerId = sellerIDSelector();

  try {
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/merchants/group`;

    const { data } = await axios.get(URL);

    if (data) {
      dispatch(setSellerInventoryTableGroups(data));
    } else {
      dispatch(setSellerInventoryTableGroups([]));
    }
  } catch (err) {
    console.error('Error fetching seller inventory table groups', err);
    dispatch(setSellerInventoryTableGroups([]));
  }
};

/* Action to create a seller inventory table group */
export const createSellerInventoryTableGroup = (payload: CreateSellerGroup) => async (
  dispatch: any
) => {
  const sellerId = sellerIDSelector();

  try {
    const { name } = payload;

    /* Prepare payload */
    const formData = new FormData();
    formData.set('name', name);

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/merchants/group`;

    const { data } = await axios.post(URL, formData);

    if (data) {
      await dispatch(fetchSellerInventoryTableGroups());
      dispatch(setSellerInventoryTableActiveGroupId(data.id));
      success(`Created ${data.name} `);
    }
  } catch (err) {
    console.error('Error creating seller group');
  }
};

/* Action to update a seller inventory groups */
export const updateSellerInventoryTableGroup = (payload: UpdateSellerGroup) => async (
  dispatch: any
) => {
  const sellerId = sellerIDSelector();

  try {
    const { id, name, status, merchantIds } = payload;

    const formData = new FormData();

    if (name) {
      formData.set('name', name);
    }

    if (status) {
      formData.set('status', status);
    }

    if (merchantIds) {
      formData.set('merchant_ids', merchantIds);
    }

    const resourcePath = `id=${id}`;

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/merchants/group?${resourcePath}`;

    const { data } = await axios.patch(URL, formData);

    if (data) {
      // delete the group but keep its content
      if (status && status === 'inactive') {
        await dispatch(fetchSellerInventoryTableGroups());
        await dispatch(setSellerInventoryTableActiveGroupId(null));
        await dispatch(fetchSellerInventoryTableResults({ enableLoader: false }));
        success(data.message);
        return;
      }

      await dispatch(fetchSellerInventoryTableGroups());
      dispatch(setSellerInventoryTableActiveGroupId(id));
      success(data.message);
    }
  } catch (err) {
    console.error('Error updating seller group', err);
  }
};

/* Action to delete a seller inventory groups */
export const deleteSellerInventoryTableGroup = (payload: DeleteSellergroup) => async (
  dispatch: any
) => {
  const sellerId = sellerIDSelector();

  try {
    const { id, refreshTable = false } = payload;

    const resourcePath = `id=${id}`;

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/merchants/group?${resourcePath}`;

    const { data } = await axios.delete(URL);

    if (data) {
      await dispatch(fetchSellerInventoryTableGroups());
      dispatch(setSellerInventoryTableActiveGroupId(null));
      success(data.message);

      if (refreshTable) {
        await dispatch(fetchSellerInventoryTableResults({ enableLoader: false }));
      }
    }
  } catch (err) {
    console.error('Error deleting seller group', err);
  }
};

/* ============================================ */
/* ====== SELLER INVENTORY PRODUCTS TABLE ===== */
/* ============================================ */

/* Action to fetch seller inventory products */
export const fetchSellerInventoryProductsTableResults = (
  payload: SellerInventoryProductsTablePayload
) => async (dispatch: any) => {
  const sellerId = sellerIDSelector();

  try {
    const { enableLoader = true, page = 1, perPage = 100, rowId } = payload;

    const pagination = `page=${page}&per_page=${perPage}`;

    const resourcePath = `${pagination}`;

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/merchants/${rowId}/products?${resourcePath}`;

    dispatch(isLoadingSellerInventoryProductsTable(enableLoader));

    const { data } = await axios.get(URL);

    if (data) {
      const { results, ...paginationInfo } = data;
      dispatch(setSellerInventoryProductsTableResults(results));
      dispatch(setSellerInventoryProductsTablePagintionInfo(paginationInfo));
      dispatch(isLoadingSellerInventoryProductsTable(false));
    } else {
      dispatch(setSellerInventoryProductsTableResults([]));
      dispatch(
        setSellerInventoryProductsTablePagintionInfo({ count: 0, num_pages: 0, per_page: 20 })
      );
      dispatch(isLoadingSellerInventoryProductsTable(false));
    }
  } catch (err) {
    console.error('Error fetching seller inventory products table');
    dispatch(setSellerInventoryProductsTableResults([]));
    dispatch(
      setSellerInventoryProductsTablePagintionInfo({ count: 0, num_pages: 0, per_page: 20 })
    );
    dispatch(isLoadingSellerInventoryProductsTable(false));
  }
};

/* Action to track and untrack seller inventory products */
export const trackUntrackSellerProduct = (payload: TrackUntrackProduct) => async (
  dispatch: any,
  getState: any
) => {
  const sellerId = sellerIDSelector();

  try {
    const { status, productId, productTrackId = null } = payload;

    const formData = new FormData();

    formData.set('status', status);
    formData.set('product_id', String(productId));

    if (productTrackId) {
      formData.set('id', String(productTrackId));
    }

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/track/product`;

    // if product track id exists use patch else use post (first time only)
    const { data } = productTrackId
      ? await axios.patch(URL, formData)
      : await axios.post(URL, formData);

    if (data) {
      const currentSellerProducts = getSellerInventoryProductsTableResults(getState());

      const { object: trackedObj } = data;

      // from the retuned tracked object updated the necessary field for UI
      // and spread rest of the info
      const updatedSellerProducts = currentSellerProducts.map((p: any) => {
        if (p.product_id === trackedObj.product_id) {
          return {
            ...p,
            // tracking_status===status
            tracking_status: trackedObj.status,
            // product_track_id===id
            product_track_id: trackedObj.id,
          };
        } else {
          return p;
        }
      });

      dispatch(setSellerInventoryProductsTableResults(updatedSellerProducts));
      dispatch(getSellerQuota());
      success(`Product successfully ${status === 'active' ? 'tracked' : 'untracked'}`);
    }
  } catch (err) {
    console.error('Error tracking/untracking product', err);
  }
};

/* ====================================================== */
/* ====== SELLER INVENTORY PRODUCTS SELLERS TABLE ========= */
/* ====================================================== */

/* Action to fetch seller inventory products table sellers */
export const fetchSellerInventoryProductsTableSellers = (
  payload: SellerInventoryProductsTableSellersPayload
) => async (dispatch: any) => {
  const sellerId = sellerIDSelector();

  try {
    const { enableLoader = true, page = 1, perPage = 20, parentAsin } = payload;

    if (!parentAsin) {
      return;
    }

    const pagination = `page=${page}&per_page=${perPage}`;

    const resourcePath = `${pagination}&parent_asin=${parentAsin}`;

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/merchants?${resourcePath}`;

    dispatch(isLoadingSellerInventoryProductsTableSellers(enableLoader));

    const { data } = await axios.get(URL);

    if (data) {
      const { results, ...paginationInfo } = data;
      dispatch(setSellerInventoryProductsTableSellersResults(results));
      dispatch(setSellerInventoryProductsTableSellersPaginationInfo(paginationInfo));
      dispatch(isLoadingSellerInventoryProductsTableSellers(false));
    } else {
      dispatch(setSellerInventoryProductsTableSellersResults([]));
      dispatch(
        setSellerInventoryProductsTableSellersPaginationInfo({
          count: 0,
          total_pages: 0,
          current_page: 0,
          per_page: 0,
        })
      );
      dispatch(isLoadingSellerInventoryProductsTableSellers(false));
    }
  } catch (err) {
    console.error('Error fetching seller inventory products table sellers', err);
    dispatch(setSellerInventoryProductsTableSellersResults([]));
    dispatch(
      setSellerInventoryProductsTableSellersPaginationInfo({
        count: 0,
        total_pages: 0,
        current_page: 0,
        per_page: 0,
      })
    );
    dispatch(isLoadingSellerInventoryProductsTableSellers(false));
  }
};

/* Action to track untrack sellers */
export const trackUntrackProductSeller = (payload: TrackUntrackProductSeller) => async (
  dispatch: any,
  getState: any
) => {
  const sellerId = sellerIDSelector();

  try {
    const { amazonMerchantId, sellerMerchantId } = payload;

    const formData = new FormData();

    if (!sellerMerchantId || !amazonMerchantId) {
      return error('Seller cannot be tracked');
    }

    if (sellerMerchantId) {
      formData.set('seller_merchant_id', String(sellerMerchantId));
    }

    if (amazonMerchantId) {
      formData.set('amazon_merchant_id', String(amazonMerchantId));
    }

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/merchants/track`;

    const { data } = await axios.post(URL, formData);

    if (data) {
      const { object: trackedObj } = data;

      // get current product sellers
      const currentProductSellers = getSellerInventoryProductsTableSellersResults(getState());
      const currentSellerInventoryTable = getSellerInventoryTableResults(getState());

      // update the tracking_status on it which is satus from respone
      const updatedProductSellers = currentProductSellers.map((s: any) => {
        if (s.id === trackedObj.id) {
          return {
            ...s,
            ...trackedObj,
          };
        } else {
          return s;
        }
      });

      dispatch(setSellerInventoryProductsTableSellersResults(updatedProductSellers));

      success(
        `Seller successfully ${trackedObj.tracking_status === 'active' ? 'tracked' : 'untracked'}`
      );

      // if the tracking status is active shift the tracked seller to top
      if (trackedObj.tracking_status === 'active') {
        const sellerExistAsParent = currentSellerInventoryTable.find((s: any) => {
          return s.id === trackedObj.id;
        });

        // if exist on parent filter it out and add to top to avoid duplicates
        if (sellerExistAsParent) {
          const filterOutTrackedSeller = currentSellerInventoryTable.filter((s: any) => {
            return s.id !== trackedObj.id;
          });

          dispatch(setSellerInventoryTableResults([trackedObj, ...filterOutTrackedSeller]));
        } else {
          // just simply add to top
          dispatch(setSellerInventoryTableResults([trackedObj, ...currentSellerInventoryTable]));
        }
      }
    }
  } catch (err) {
    console.error('Error Tracking Product Seller', err);
    const { response } = err as any;
    if (response) {
      const { status, data } = response;
      if (status === 400 && data && data.message && data.message.length > 0) {
        info(data.message);
      }
    }
  }
};
