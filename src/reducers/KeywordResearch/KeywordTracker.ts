import { AnyAction } from 'redux';

import { setIn } from '../../utils/immutablity';

/* Constants */
import { actionTypes } from '../../constants/KeywordResearch//KeywordTracker';

const INITIAL_STATE = {
  // State for keyword tracker main products table
  isLoadingKeywordTrackerProductsTable: false,
  keywordTrackerProductsTableResults: [],
  keywordTrackerProductsTablePaginationInfo: {
    count: 0,
    current_page: 0,
    total_pages: 0,
    per_page: 20,
  },

  // State for the keyword table for each product on keyword tracker
  isLoadingTrackerProductKeywordsTable: false,
  trackerProductKeywordsTableResults: [],
  trackerProductKeywordsTablePaginationInfo: {
    count: 0,
    current_page: 0,
    total_pages: 0,
    per_page: 20,
  },

  //keyword histry chart
  isLoadingTrackerProductKeywordsHistory: false,
  trackerProductKeywordsHistoryResult: [],
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

    case actionTypes.SET_KEYWORD_TRACKER_PRODUCTS_TABLE_PAGINATION_INFO: {
      return setIn(state, 'keywordTrackerProductsTablePaginationInfo', action.payload);
    }

    /* ========================================================== */
    /*                   PRODUCTS KEYWORD TABLE                   */
    /* ========================================================== */

    case actionTypes.IS_LOADING_TRACKER_PRODUCT_KEYWORDS_TABLE: {
      return setIn(state, 'isLoadingTrackerProductKeywordsTable', action.payload);
    }

    case actionTypes.SET_TRACKER_PRODUCT_KEYWORDS_TABLE_RESULTS: {
      return setIn(state, 'trackerProductKeywordsTableResults', action.payload);
    }

    case actionTypes.SET_TRACKER_PRODUCT_KEYWORDS_TABLE_PAGINATION_INFO: {
      return setIn(state, 'trackerProductKeywordsTablePaginationInfo', action.payload);
    }

    /* ========================================================== */
    /*                 KEYWORDS HISTORY TABLE                    */
    /* ========================================================== */
    case actionTypes.IS_LOADING_TRACKER_PRODUCT_KEYWORDS_HISTORY: {
      return setIn(state, 'isLoadingTrackerProductKeywordsHistory', action.payload);
    }

    case actionTypes.SET_TRACKER_PRODUCT_KEYWORDS_HISTORY_RESULT: {
      return setIn(state, 'trackerProductKeywordsHistoryResult', action.payload);
    }

    default: {
      return state;
    }
  }
};

export default keywordTrackerReducer;
