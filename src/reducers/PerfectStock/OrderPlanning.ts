import { AnyAction } from 'redux';
import { setIn } from '../../utils/immutablity';

import {
  actionTypes,
  TIME_SETTING,
  EMPTY_PURCHASE_ORDER,
} from '../../constants/PerfectStock/OrderPlanning';

const INITIAL_STATE = {
  isLoadingPurchaseOrders: false,
  isLoadingInventoryTableResults: false,
  activePurchaseOrder: EMPTY_PURCHASE_ORDER,
  purchaseOrders: [],
  inventoryTableResults: [],
  inventoryTableShowAllSkus: true,
  dateRange: {
    startDate: '',
    endDate: '',
  },
  timeSetting: TIME_SETTING.DAY,
  refreshInventoryTableId: -1,
  isFetchingProgressForRefresh: false,
  refreshProgress: 0,
  inventoryTableUpdateDate: '',

  /* Draft orders */
  isLoadingDraftOrder: false,
  draftOrderInformation: {},
  isLoadingExpectedDaysOfInventory: false,
  expectedDaysOfInventory: [],
  activeDraftOrderTemplate: {},
};

const salesProjectionReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.IS_LOADING_PURCHASE_ORDERS: {
      return setIn(state, 'isLoadingPurchaseOrders', action.payload);
    }

    case actionTypes.IS_LOADING_INVENTORY_TABLE_RESULTS: {
      return setIn(state, 'isLoadingInventoryTableResults', action.payload);
    }

    case actionTypes.SET_INVENTORY_TABLE_SHOW_ALL_SKUS: {
      return setIn(state, 'inventoryTableShowAllSkus', action.payload);
    }

    case actionTypes.SET_INVENTORY_TABLE_RESULTS: {
      return setIn(state, 'inventoryTableResults', action.payload);
    }

    case actionTypes.SET_PURCHASE_ORDERS: {
      return setIn(state, 'purchaseOrders', action.payload);
    }

    case actionTypes.SET_ACTIVE_PURCHASE_ORDER: {
      return setIn(state, 'activePurchaseOrder', action.payload);
    }

    case actionTypes.SET_DATE_RANGE: {
      return setIn(state, 'dateRange', action.payload);
    }

    case actionTypes.SET_TIME_SETTING: {
      return setIn(state, 'timeSetting', action.payload);
    }

    case actionTypes.SET_REFRESH_INVENTORY_TABLE_ID: {
      return setIn(state, 'refreshInventoryTableId', action.payload);
    }

    case actionTypes.SET_IS_FETCHING_PROGRESS_FOR_REFRESH: {
      return setIn(state, 'isFetchingProgressForRefresh', action.payload);
    }

    case actionTypes.SET_REFRESH_PROGRESS: {
      return setIn(state, 'refreshProgress', action.payload);
    }

    case actionTypes.SET_INVENTORY_TABLE_UPDATE_DATE: {
      return setIn(state, 'inventoryTableUpdateDate', action.payload);
    }

    case actionTypes.SET_DRAFT_ORDER_INFORMATION: {
      return setIn(state, 'draftOrderInformation', action.payload);
    }

    case actionTypes.IS_LOADING_DRAFT_ORDER_INFORMATION: {
      return setIn(state, 'isLoadingDraftOrder', action.payload);
    }

    case actionTypes.IS_LOADING_EXPECTED_DAYS_OF_INVENTORY: {
      return setIn(state, 'isLoadingExpectedDaysOfInventory', action.payload);
    }

    case actionTypes.SET_EXPECTED_DAYS_OF_INVENTORY: {
      return setIn(state, 'expectedDaysOfInventory', action.payload);
    }

    case actionTypes.SET_ACTIVE_DRAFT_ORDER_TEMPLATE: {
      return setIn(state, 'activeDraftOrderTemplate', action.payload);
    }

    default: {
      return state;
    }
  }
};

export default salesProjectionReducer;
