import { AnyAction } from 'redux';
import { setIn } from '../../utils/immutablity';

import { actionTypes } from '../../constants/PerfectStock/OrderPlanning';

const INITIAL_STATE = {
  isLoadingInventoryTableResults: false,
  inventoryTableResults: [],
  dateRange: {
    startDate: '',
    endDate: '',
  },
};

const salesProjectionReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.IS_LOADING_INVENTORY_TABLE_RESULTS: {
      return setIn(state, 'isLoadingInventoryTableResults', action.payload);
    }

    case actionTypes.SET_INVENTORY_TABLE_RESULTS: {
      return setIn(state, 'inventoryTableResults', action.payload);
    }

    case actionTypes.SET_DATE_RANGE: {
      return setIn(state, 'dateRange', action.payload);
    }

    default: {
      return state;
    }
  }
};

export default salesProjectionReducer;
