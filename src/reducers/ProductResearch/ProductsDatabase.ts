import { AnyAction } from 'redux';
import { setIn } from '../../utils/immutablity';

import {
  actionTypes,
  DEFAULT_PRODUCTS_DATABASE_FILTERS,
} from '../../constants/ProductResearch/ProductsDatabase';

const INITIAL_STATE = {
  productsDatabaseFilters: DEFAULT_PRODUCTS_DATABASE_FILTERS,
};

const productsDatabaseReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.UPDATE_PRODUCTS_DATABASE_FILTER: {
      const updatedFilters = state.productsDatabaseFilters.map((f: any) => {
        if (f.name === action.payload.name) {
          return action.payload;
        }
        return f;
      });

      return setIn(state, 'productsDatabaseFilters', updatedFilters);
    }

    default: {
      return state;
    }
  }
};

export default productsDatabaseReducer;
