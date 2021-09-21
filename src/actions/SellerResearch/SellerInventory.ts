import axios from 'axios';

/* Config */
import { AppConfig } from '../../config';

/* Action Types */
import { actionTypes } from '../../constants/SellerResearch/SellerInventory';

/* Selectors */
import { sellerIDSelector } from '../../selectors/Seller';

/* Interfaces */
import {
  SellerInventoryProductsTablePaginationInfo,
  SellerInventoryProductsTablePayload,
  SellerInventoryProductsTableSellersPaginationInfo,
  SellerInventoryProductsTableSellersPayload,
  SellerInventoryTablePaginationInfo,
  SellerInventoryTablePayload,
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

  const { enableLoader = true, sort = 'udate', sortDir = 'desc', page = 1, perPage = 20 } = payload;

  try {
    const pagination = `page=${page}&per_page=${perPage}`;
    const sorting = `ordering=${sortDir === 'desc' ? `-${sort}` : sort}`;

    const resourcePath = `${sorting}&${pagination}`;

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

/* ============================================ */
/* ====== SELLER INVENTORY PRODUCTS TABLE ===== */
/* ============================================ */

/* Action to fetch seller inventory products */
export const fetchSellerInventoryProductsTableResults = (
  payload: SellerInventoryProductsTablePayload
) => async (dispatch: any) => {
  const sellerId = sellerIDSelector();

  try {
    const { enableLoader = true, page = 1, perPage = 20, rowId } = payload;

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
