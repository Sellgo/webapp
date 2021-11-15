import { AnyAction } from 'redux';
import { setIn } from '../../utils/immutablity';

import { actionTypes } from '../../constants/ProductResearch/ProductsDatabase';

const INITIAL_STATE = {
  isLoadingProductsDatabase: false,
  productsDatabaseResult: [],
  productsDatabasePaginationInfo: {
    current_page: 0,
    total_pages: 0,
  },
  showFilterMessage: {
    show: false,
    message: 'Please specify at least one filter',
    type: 'info',
  },
};

const productsDatabaseReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.IS_LOADING_PRODUCTS_DATABASE: {
      return setIn(state, 'isLoadingProductsDatabase', action.payload);
    }

    case actionTypes.SHOW_FILTER_MESSAGE: {
      return setIn(state, 'showFilterMessage', action.payload);
    }

    case actionTypes.SET_PRODUCTS_DATABASE: {
      return setIn(state, 'productsDatabaseResult', action.payload);
    }

    case actionTypes.SET_PRODUCTS_DATABASE_PAGINATION_INFO: {
      return setIn(state, 'productsDatabasePaginationInfo', action.payload);
    }

    case actionTypes.SET_PRODUCTS_DATABASE_FILTERS: {
      return setIn(state, 'productsDatabaseFilters', action.payload);
    }

    default: {
      return state;
    }
  }
};

export default productsDatabaseReducer;
