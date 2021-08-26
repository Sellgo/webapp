import { AnyAction } from 'redux';

import { setIn } from '../../utils/immutablity';

/* Constants */
import { actionTypes } from '../../constants/KeywordResearch//KeywordTracker';

const INITIAL_STATE = {
  // State for keyword tracker main products table
  isLoadingKeywordTrackerProductsTable: false,
  keywordTrackerProductsTableResults: [],
};

const keywordTrackerReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    // reducers for the keyword tracker main products table
    case actionTypes.IS_LOADING_KEYWORD_TRACKER_PRODUCTS_TABLE: {
      return setIn(state, 'isLoadingKeywordTrackerProductsTable', action.payload);
    }

    case actionTypes.SET_KEYWORD_TRACKER_PRODUCTS_TABLE_RESULTS: {
      return setIn(state, 'keywordTrackerProductsTableResults', action.payload);
    }

    default: {
      return state;
    }
  }
};

export default keywordTrackerReducer;
