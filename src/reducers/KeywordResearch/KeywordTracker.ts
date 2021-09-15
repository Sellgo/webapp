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

  // tracker table products competitors
  keywordTrackerProductsTableCompetitors: [],

  // State for the keyword table for each product on keyword tracker
  isLoadingTrackerProductKeywordsTable: false,
  trackerProductKeywordsTableResults: [],
  trackerProductKeywordsTablePaginationInfo: {
    count: 0,
    current_page: 0,
    total_pages: 0,
    per_page: 20,
  },

  //keyword history chart
  isLoadingTrackerProductKeywordsHistory: false,
  trackerProductKeywordsHistoryResult: [],

  // keyword history export
  shouldFetchTrackerProductKeywordsHistoryExportProgress: false,
  trackerProductKeywordsHistoryExportProgress: {
    export_progress: '',
    keyword_track_id: 0,
    export_status: '',
    report_xlsx_url: '',
  },
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
    /*           TRACKER PRODUCTS TABLE COMPETITORS               */
    /* ========================================================== */
    case actionTypes.SET_KEYWORD_TRACKER_PRODUCTS_TABLE_COMPETITORS: {
      return setIn(state, 'keywordTrackerProductsTableCompetitors', action.payload);
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
    /*                 KEYWORDS HISTORY GRAPH                    */
    /* ========================================================== */
    case actionTypes.IS_LOADING_TRACKER_PRODUCT_KEYWORDS_HISTORY: {
      return setIn(state, 'isLoadingTrackerProductKeywordsHistory', action.payload);
    }

    case actionTypes.SET_TRACKER_PRODUCT_KEYWORDS_HISTORY_RESULT: {
      return setIn(state, 'trackerProductKeywordsHistoryResult', action.payload);
    }

    /* ========================================================== */
    /*                 KEYWORDS HISTORY EXPORT                    */
    /* ========================================================== */
    case actionTypes.SHOULD_FETCH_TRACKER_PRODUCT_KEYWORDS_HISTORY_EXPORT_PROGRESS: {
      return setIn(state, 'shouldFetchTrackerProductKeywordsHistoryExportProgress', action.payload);
    }

    case actionTypes.SET_TRACKER_PRODUCT_KEYWORDS_HISTORY_EXPORT_PROGRESS: {
      return setIn(state, 'trackerProductKeywordsHistoryExportProgress', action.payload);
    }
    default: {
      return state;
    }
  }
};

export default keywordTrackerReducer;
