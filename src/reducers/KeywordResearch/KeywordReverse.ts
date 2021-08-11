import { AnyAction } from 'redux';

/* Constants */
import { actionTypes, makeOrGetUniqueTabID } from '../../constants/KeywordResearch/KeywordReverse';

const INITIAL_STATE: { [key: string]: any } = {
  [makeOrGetUniqueTabID()]: {
    // keyword request id state
    isFetchingKeywordReverseRequestId: false,
    keywordReverseRequestId: '',

    // table state
    isLoadingKeywordReverseTable: false,
    keywordReverseTableResults: [],
    keywordReverseTablePaginationInfo: {
      count: 0,
      total_pages: 0,
      current_page: 0,
      per_page: 0,
    },
  },
};

const keywordReverseReducer = (state = INITIAL_STATE, action: AnyAction) => {
  const sessionTab = makeOrGetUniqueTabID();

  const sessionStateChunk = state[sessionTab];

  switch (action.type) {
    /* ======================================================= */
    /* Keyword Request Reducers */
    case actionTypes.IS_FETCHING_KEYWORD_REVERSE_REQUEST_ID: {
      return {
        ...state,
        [sessionTab]: {
          ...sessionStateChunk,
          isFetchingKeywordReverseRequestId: action.payload,
        },
      };
    }

    case actionTypes.SET_KEYWORD_REVERSE_REQUEST_ID: {
      return {
        ...state,
        [sessionTab]: {
          ...sessionStateChunk,
          keywordReverseRequestId: action.payload,
        },
      };
    }

    /* ============================================== */

    /* Table Reducers */
    // Set loading state
    case actionTypes.IS_LOADING_KEYWORD_REVERSE_TABLE: {
      return {
        ...state,
        [sessionTab]: {
          ...sessionStateChunk,
          isLoadingKeywordReverseTable: action.payload,
        },
      };
    }

    // Set results
    case actionTypes.SET_KEYWORD_REVERSE_TABLE_RESULTS: {
      return {
        ...state,
        [sessionTab]: {
          ...sessionStateChunk,
          keywordReverseTableResults: action.payload,
        },
      };
    }

    // Set pagination results
    case actionTypes.SET_KEYWORD_REVERSE_TABLE_PAGINATION_INFO: {
      return {
        ...state,
        [sessionTab]: {
          ...sessionStateChunk,
          keywordReverseTablePaginationInfo: action.payload,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default keywordReverseReducer;
