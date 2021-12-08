import { AnyAction } from 'redux';
import { setIn } from '../../utils/immutablity';

import { actionTypes } from '../../constants/PerfectStock/SalesProjection';
import { SalesProjectionProduct } from '../../interfaces/PerfectStock/SalesProjection';

const INITIAL_STATE = {
  isLoadingSalesProjection: false,
  salesProjectionResult: [],
};

const salesProjectionReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.IS_LOADING_SALES_PROJECTION_RESULTS: {
      return setIn(state, 'isLoadingSalesProjection', action.payload);
    }

    case actionTypes.SET_SALES_PROJECTION_RESULTS: {
      return setIn(state, 'salesProjectionResult', action.payload);
    }

    case actionTypes.UPDATE_SALES_PROJECTION_RESULTS: {
      const updatedSalesProjectionResult = state.salesProjectionResult.map(
        (item: SalesProjectionProduct) => {
          if (item.id === action.payload.id && item.asin === action.payload.asin) {
            return action.payload;
          } else {
            return item;
          }
        }
      );
      return setIn(state, 'salesProjectionResult', updatedSalesProjectionResult);
    }

    default: {
      return state;
    }
  }
};

export default salesProjectionReducer;
