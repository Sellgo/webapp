import { AnyAction } from 'redux';
import { setIn } from '../../utils/immutablity';

import { actionTypes } from '../../constants/SellerResearch/SellerInventory';

const INITIAL_STATE = {
  // Central Export progress
  centralExportProgress: {
    showProgress: false,
    progress: 0,
    status: '',
    csv_path: '',
    excel_path: '',
  },

  // Central Scraping Progress
  showCentralScrapingProgress: false,
  centralScrapingProgress: {},

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

  // Seller inventory table groups
  sellerInventoryTableGroups: [],
  sellerInventoryTableActiveGroupId: null,

  // Seller Inventory Products Table
  isLoadingSellerInventoryProductsTable: false,
  sellerInventoryProductsTableResults: [],
  sellerInventoryProductsTablePaginationInfo: { count: 0, num_pages: 0, per_page: 20 },
  sellerInventoryProductsTableExpandedRow: {},

  // seller inventory products table sellers
  isLoadingSellerInventoryProductsTableSellers: false,
  sellerInventoryProductsTableSellersResults: [],
  sellerInventoryProductsTableSellersPaginationInfo: {
    count: 0,
    total_pages: 0,
    current_page: 0,
    per_page: 0,
  },
};

const sellerInventoryReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    /* ============================================ */
    /* ======CENTRAL EXPORT PROGRESS ========= */
    /* ============================================ */
    case actionTypes.SET_CENTRAL_EXPORT_PROGRESS: {
      return setIn(state, 'centralExportProgress', action.payload);
    }

    /* ============================================ */
    /* ======CENTRAL SCRAPING PROGRESS ========= */
    /* ============================================ */
    case actionTypes.SET_SHOW_CENTRAL_SCRAPING_PROGRESS: {
      return setIn(state, 'showCentralScrapingProgress', action.payload);
    }
    case actionTypes.SET_CENTRAL_SCRAPING_PROGRESS: {
      return setIn(state, 'centralScrapingProgress', action.payload);
    }

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
    /* ====== SELLER INVENTORY  TABLE GROUPS ========= */
    /* ============================================ */
    case actionTypes.SET_SELLER_INVENTORY_TABLE_GROUPS: {
      return setIn(state, 'sellerInventoryTableGroups', action.payload);
    }

    case actionTypes.SET_SELLER_INVENTORY_TABLE_ACTIVE_GROUP_ID: {
      return setIn(state, 'sellerInventoryTableActiveGroupId', action.payload);
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

    /* ============================================ */
    /* ====== SELLER INVENTORY PRODUCTS SELLERS TABLE ===== */
    /* ============================================ */

    case actionTypes.IS_LOADING_SELLER_INVENTORY_PRODUCTS_TABLE_SELLERS: {
      return setIn(state, 'isLoadingSellerInventoryProductsTableSellers', action.payload);
    }

    case actionTypes.SET_SELLER_INVENTORY_PRODUCTS_TABLE_SELLERS_RESULTS: {
      return setIn(state, 'sellerInventoryProductsTableSellersResults', action.payload);
    }

    case actionTypes.SET_SELLER_INVENTORY_PRODUCTS_TABLE_SELLERS_PAGINATION_INFO: {
      return setIn(state, 'sellerInventoryProductsTableSellersPaginationInfo', action.payload);
    }

    default: {
      return state;
    }
  }
};

export default sellerInventoryReducer;
