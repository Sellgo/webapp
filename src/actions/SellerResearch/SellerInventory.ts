import axios from 'axios';

/* Config */
import { AppConfig } from '../../config';

/* Action Types */
import { actionTypes } from '../../constants/SellerResearch/SellerInventory';

/* Selectors */
import { sellerIDSelector } from '../../selectors/Seller';

/* Interfaces */
import {
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
export const setSellerInventoryTablePagintionInfo = (
  payload: SellerInventoryTablePaginationInfo
) => {
  return {
    type: actionTypes.SET_SELLER_INVENTORY_TABLE_PAGINATION_INFO,
    payload,
  };
};

/* ============================================ */
/* ================= ASYNC ACIONS ========== */
/* ============================================ */

/* Seller Inventory main Table */
/* Action to fetch the seller inventory table */
export const fetchSellerInventoryTableResults = (payload: SellerInventoryTablePayload) => async (
  dispatch: any
) => {
  const sellerId = sellerIDSelector();

  console.log('This is called');

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
      dispatch(setSellerInventoryTablePagintionInfo(paginationInfo));
      dispatch(isLoadingSellerInventoryTable(false));
    } else {
      dispatch(isLoadingSellerInventoryTable(false));
      dispatch(setSellerInventoryTableResults([]));
      dispatch(
        setSellerInventoryTablePagintionInfo({
          per_page: 0,
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
      setSellerInventoryTablePagintionInfo({
        per_page: 0,
        total_pages: 0,
        count: 0,
        current_page: 0,
      })
    );
  }
};
