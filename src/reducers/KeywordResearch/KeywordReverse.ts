import { AnyAction } from 'redux';

/* Constants */
import { actionTypes } from '../../constants/KeywordResearch/KeywordReverse';

/* Actions */
import { makeOrGetUniqueTabID } from '../../actions/KeywordResearch/KeywordReverse';

const INITIAL_STATE: { [key: string]: any } = {
  [makeOrGetUniqueTabID()]: {
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
