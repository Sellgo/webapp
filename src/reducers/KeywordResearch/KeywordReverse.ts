import { AnyAction } from 'redux';

/* Constants */
import { actionTypes } from '../../constants/KeywordResearch/KeywordReverse';

/* Utils*/
import { makeOrGetUniqueTabID } from '../../utils/session';

const DEFAULT_PRODUCTS_LIST = [
  {
    id: 7,
    keyword_request: 4,
    seller: 1000000001,
    asin: 'B07ZFM7DTQ',
    title: 'PartyWoo Pink Balloons 20 pcs 12 Inch Pink Confetti Balloons',
    rank: null,
    sales_monthly: Math.random() * 100000,
    image_url: 'https://m.media-amazon.com/images/I/51K1EdW8y4L._SL75_.jpg',
    position: 1,
  },
  {
    id: 7,
    keyword_request: 4,
    seller: 1000000001,
    asin: 'B07ZFM7DTQ',
    title: 'PartyWoo Pink Balloons 20 pcs 12 Inch Pink Confetti Balloons',
    rank: null,
    sales_monthly: Math.random() * 100000,
    image_url: 'https://m.media-amazon.com/images/I/51K1EdW8y4L._SL75_.jpg',
    position: 1,
  },
  {
    id: 7,
    keyword_request: 4,
    seller: 1000000001,
    asin: 'B07ZFM7DTQ',
    title: '',
    rank: null,
    sales_monthly: Math.random() * 100000,
    image_url: 'https://m.media-amazon.com/images/I/51K1EdW8y4L._SL75_.jpg',
    position: 1,
  },
  {
    id: 7,
    keyword_request: 4,
    seller: 1000000001,
    asin: 'B07ZSFM7DTQ',
    title: 'PartyWoo Pink Balloons 20 pcs 12 Inch Pink Confetti Balloons',
    rank: null,
    sales_monthly: null,
    image_url: '',
    position: 1,
  },
];

const INITIAL_STATE: { [key: string]: any } = {
  [makeOrGetUniqueTabID()]: {
    // keyword request id state
    isFetchingKeywordReverseRequestId: false,
    keywordReverseRequestId: sessionStorage.getItem('keywordReverseRequestId') || '',
    asinListForKeywordReverse: sessionStorage.getItem('keywordReverseAsinList') || '',

    // keyword reverse products list
    isLoadingKeywordReverseProductsList: false,
    keywordReverseProductsList: DEFAULT_PRODUCTS_LIST,

    // keyword request progress state
    shouldFetchKeywordReverseProgress: false,
    keywordReverseProgressData: JSON.parse(
      sessionStorage.getItem('keywordReverseProgressData') ||
        JSON.stringify({
          id: 0,
          seller: 0,
          progress: '0',
          status: '',
          report_xlsx_url: '',
        })
    ),

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
    /* ================= KEYWORD REQUEST ==================== */
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

    case actionTypes.SET_ASIN_LIST_FOR_KEYWORD_REVERSE: {
      return {
        ...state,
        [sessionTab]: {
          ...sessionStateChunk,
          asinListForKeywordReverse: action.payload,
        },
      };
    }

    /* ================= KEYWORD PRODUCTS =============== */
    case actionTypes.IS_LOADING_KEYWORD_REVERSE_PRODUCTS_LIST: {
      return {
        ...state,
        [sessionTab]: {
          ...sessionStateChunk,
          isLoadingKeywordReverseProductsList: action.payload,
        },
      };
    }

    case actionTypes.SET_KEYWORD_REVERSE_PRODUCTS_LIST: {
      return {
        ...state,
        [sessionTab]: {
          ...sessionStateChunk,
          keywordReverseProductsList: action.payload,
        },
      };
    }

    /* ================= KEYWORD PROGRESS =============== */
    case actionTypes.SHOULD_FETCH_KEYWORD_REVERSE_PROGRESS: {
      return {
        ...state,
        [sessionTab]: {
          ...sessionStateChunk,
          shouldFetchKeywordReverseProgress: action.payload,
        },
      };
    }

    case actionTypes.SET_KEYWORD_REVERSE_PROGRESS_DATA: {
      return {
        ...state,
        [sessionTab]: {
          ...sessionStateChunk,
          keywordReverseProgressData: action.payload,
        },
      };
    }

    /* =================== REVERSE TABLE =================== */
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
