import { AnyAction } from 'redux';
import { setIn } from '../../utils/immutablity';

import { actionTypes, TIME_SETTING } from '../../constants/PerfectStock/OrderPlanning';

const INITIAL_STATE = {
  isLoadingPurchaseOrders: false,
  isLoadingInventoryTableResults: false,
  activePurchaseOrder: null,
  purchaseOrders: [],
  inventoryTableResults: [],
  dateRange: {
    startDate: '',
    endDate: '',
  },
  timeSetting: TIME_SETTING.DAY,
};

const salesProjectionReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.IS_LOADING_PURCHASE_ORDERS: {
      return setIn(state, 'isLoadingPurchaseOrders', action.payload);
    }

    case actionTypes.IS_LOADING_INVENTORY_TABLE_RESULTS: {
      return setIn(state, 'isLoadingInventoryTableResults', action.payload);
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

    default: {
      return state;
    }
  }
};

export default salesProjectionReducer;
