import { AnyAction } from 'redux';
import { setIn } from '../../utils/immutablity';

import { actionTypes } from '../../constants/SellerResearch/SellerInventory';

const INITIAL_STATE = {
  // Seller Inventory  Table
  isLoadingSellerInventoryTable: false,
  sellerInventoryTableResults: [],
  sellerInventoryTablePaginationInfo: {
    count: 0,
    total_pages: 0,
    current_page: 0,
    per_page: 0,
  },
  sellerInventoryTableExpandedRow: {},

  // Seller Inventory Products Table
  isLoadingSellerInventoryProductsTable: false,
  sellerInventoryProductsTableResults: [],
  sellerInventoryProductsTablePaginationInfo: { count: 0, num_pages: 0, per_page: 20 },
  sellerInventoryProductsTableExpandedRow: {},
};

const sellerInventoryReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    /* ============================================ */
    /* ====== SELLER INVENTORY MAIN TABLE ========= */
    /* ============================================ */
    case actionTypes.IS_LOADING_SELLER_INVENTORY_TABLE: {
      return setIn(state, 'isLoadingSellerInventoryTable', action.payload);
    }

    case actionTypes.SET_SELLER_INVENTORY_TABLE_RESULTS: {
      return setIn(state, 'sellerInventoryTableResults', action.payload);
    }

    case actionTypes.SET_SELLER_INVENTORY_TABLE_PAGINATION_INFO: {
      return setIn(state, 'sellerInventoryTablePaginationInfo', action.payload);
    }

    case actionTypes.SET_SELLER_INVENTORY_TABLE_EXPANDED_ROW: {
      return setIn(state, 'sellerInventoryTableExpandedRow', action.payload);
    }

    /* ============================================ */
    /* ====== SELLER INVENTORY PRODUCTS TABLE ===== */
    /* ============================================ */

    case actionTypes.IS_LOADING_SELLER_INVENTORY_PRODUCTS_TABLE: {
      return setIn(state, 'isLoadingSellerInventoryProductsTable', action.payload);
    }

    case actionTypes.SET_SELLER_INVENTORY_PRODUCTS_TABLE_RESULTS: {
      return setIn(state, 'sellerInventoryProductsTableResults', action.payload);
    }

    case actionTypes.SET_SELLER_INVENTORY_PRODUCTS_TABLE_PAGINATION_INFO: {
      return setIn(state, 'sellerInventoryProductsTablePaginationInfo', action.payload);
    }

    case actionTypes.SET_SELLER_INVENTORY_PRODUCTS_TABLE_EXPANDED_ROW: {
      return setIn(state, 'sellerInventoryProductsTableExpandedRow', action.payload);
    }
    default: {
      return state;
    }
  }
};

export default sellerInventoryReducer;
