import { AnyAction } from 'redux';

/* Constants */
import { actionTypes } from '../../constants/KeywordResearch/KeywordDatabase';

/* Utils*/
import { makeOrGetUniqueTabID } from '../../utils/session';

const INITIAL_STATE: { [key: string]: any } = {
  [makeOrGetUniqueTabID()]: {
    // keyword request id state
    isFetchingKeywordDatabaseRequestId: false,
    keywordDatabaseRequestId: sessionStorage.getItem('keywordDatabaseRequestId') || '',
    keywordsListForKeywordDatabase: sessionStorage.getItem('keywordDatabaseKeywordList') || '',

    // keyword request progress state
    shouldFetchKeywordDatabaseProgress: false,
    keywordDatabaseProgressData: JSON.parse(
      sessionStorage.getItem('keywordDatabaseProgressData') ||
        JSON.stringify({
          id: 0,
          seller: 0,
          progress: '0',
          status: '',
          report_xlsx_url: '',
        })
    ),

    // table state
    isLoadingKeywordDatabaseTable: false,
    keywordDatabaseTableResults: [],
    keywordDatabaseTablePaginationInfo: {
      count: 0,
      total_pages: 0,
      current_page: 0,
      per_page: 0,
    },
  },
};

const keywordDatabaseReducer = (state = INITIAL_STATE, action: AnyAction) => {
  const sessionTab = makeOrGetUniqueTabID();

  const sessionStateChunk = state[sessionTab];

  switch (action.type) {
    /* ================= KEYWORD REQUEST ==================== */
    /* Keyword Request Reducers */
    case actionTypes.IS_FETCHING_KEYWORD_DATABASE_REQUEST_ID: {
      return {
        ...state,
        [sessionTab]: {
          ...sessionStateChunk,
          isFetchingKeywordDatabaseRequestId: action.payload,
        },
      };
    }

    case actionTypes.SET_KEYWORD_DATABASE_REQUEST_ID: {
      return {
        ...state,
        [sessionTab]: {
          ...sessionStateChunk,
          keywordDatabaseRequestId: action.payload,
        },
      };
    }

    case actionTypes.SET_KEYWORDS_LIST_FOR_KEYWORD_DATABASE: {
      return {
        ...state,
        [sessionTab]: {
          ...sessionStateChunk,
          keywordsListForKeywordDatabase: action.payload,
        },
      };
    }

    /* ================= KEYWORD PROGRESS =============== */
    case actionTypes.SHOULD_FETCH_KEYWORD_DATABASE_PROGRESS: {
      return {
        ...state,
        [sessionTab]: {
          ...sessionStateChunk,
          shouldFetchKeywordDatabaseProgress: action.payload,
        },
      };
    }

    case actionTypes.SET_KEYWORD_DATABASE_PROGRESS_DATA: {
      return {
        ...state,
        [sessionTab]: {
          ...sessionStateChunk,
          keywordDatabaseProgressData: action.payload,
        },
      };
    }

    /* =================== DATABASE TABLE =================== */
    // Set loading state
    case actionTypes.IS_LOADING_KEYWORD_DATABASE_TABLE: {
      return {
        ...state,
        [sessionTab]: {
          ...sessionStateChunk,
          isLoadingKeywordDatabaseTable: action.payload,
        },
      };
    }

    // Set results
    case actionTypes.SET_KEYWORD_DATABASE_TABLE_RESULTS: {
      return {
        ...state,
        [sessionTab]: {
          ...sessionStateChunk,
          keywordDatabaseTableResults: action.payload,
        },
      };
    }

    // Set pagination results
    case actionTypes.SET_KEYWORD_DATABASE_TABLE_PAGINATION_INFO: {
      return {
        ...state,
        [sessionTab]: {
          ...sessionStateChunk,
          keywordDatabaseTablePaginationInfo: action.payload,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default keywordDatabaseReducer;
