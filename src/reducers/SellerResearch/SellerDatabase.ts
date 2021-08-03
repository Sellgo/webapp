import { AnyAction } from 'redux';
import { setIn } from '../../utils/immutablity';

import { actionTypes } from '../../constants/SellerResearch/SellerDatabase';

const INITIAL_STATE = {
  isLoadingSellerDatabase: false,
  showEmptyFilterMessage: {
    show: false,
    message: 'Please specify atleast one filter',
  },
  sellerDatabaseResults: [],
};

const newSellerDatabaseReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.IS_LOADING_SELLER_DATABASE: {
      return setIn(state, 'isLoadingSellerDatabase', action.payload);
    }

    case actionTypes.SHOW_EMPTY_FILTER_MESSAGE: {
      return setIn(state, 'showEmptyFilterMessage', action.payload);
    }

    case actionTypes.SET_SELLER_DATABASE_RESULTS: {
      return setIn(state, 'sellerDatabaseResults', action.payload);
    }
    default: {
      return state;
    }
  }
};

export default newSellerDatabaseReducer;
