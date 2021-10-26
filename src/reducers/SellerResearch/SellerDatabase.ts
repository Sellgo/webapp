import { AnyAction } from 'redux';
import { setIn } from '../../utils/immutablity';

import { actionTypes } from '../../constants/SellerResearch/SellerDatabase';

const INITIAL_STATE = {
  isLoadingSellerDatabase: false,
  showFilterMessage: {
    show: false,
    message: 'Please specify atleast one filter',
    type: 'info',
  },
  sellerDatabaseResults: [],
  sellerDatabasePaginationInfo: {
    count: 0,
    total_pages: 0,
    current_page: 0,
  },
  sellerMarketplace: {},
  sellerDatabaseQuotaExceeded: false,
};

const sellerDatabaseReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.IS_LOADING_SELLER_DATABASE: {
      return setIn(state, 'isLoadingSellerDatabase', action.payload);
    }

    case actionTypes.SET_SELLER_DATABASE_QUOTA_EXCEEDED: {
      return setIn(state, 'sellerDatabaseQuotaExceeded', action.payload);
    }

    case actionTypes.SHOW_FILTER_MESSAGE: {
      return setIn(state, 'showFilterMessage', action.payload);
    }

    case actionTypes.SET_SELLER_DATABASE_RESULTS: {
      return setIn(state, 'sellerDatabaseResults', action.payload);
    }

    case actionTypes.SET_SELLER_DATABASE_PAGINATION_INFO: {
      return setIn(state, 'sellerDatabasePaginationInfo', action.payload);
    }

    case actionTypes.SET_SELLER_DATABASE_MARKETPLACE: {
      return setIn(state, 'sellerMarketplace', action.payload);
    }

    default: {
      return state;
    }
  }
};

export default sellerDatabaseReducer;
