/* Actions types for keywords database */
export const actionTypes = {
  /* Actions for keyword request */
  IS_FETCHING_KEYWORD_DATABASE_REQUEST_ID: 'IS_FETCHING_KEYWORD_DATABASE_REQUEST_ID',
  SET_KEYWORD_DATABASE_REQUEST_ID: 'SET_KEYWORD_DATABASE_REQUEST_ID',
  SET_KEYWORDS_LIST_FOR_KEYWORD_DATABASE: 'SET_KEYWORDS_LIST_FOR_KEYWORD_DATABASE',

  /* Actions for keyword request progress */
  SHOULD_FETCH_KEYWORD_DATABASE_PROGRESS: 'SHOULD_FETCH_KEYWORD_DATABASE_PROGRESS',
  SET_KEYWORD_DATABASE_PROGRESS_DATA: 'SET_KEYWORD_DATABASE_PROGRESS_DATA',

  /* Action Types for table aggregation summary */
  IS_LOADING_KEYWORD_DATABASE_WORD_FREQ_SUMMARY: 'IS_LOADING_KEYWORD_DATABASE_WORD_FREQ_SUMMARY',
  SET_KEYWORD_DATABASE_WORD_FREQ_SUMMARY: 'SET_KEYWORD_DATABASE_WORD_FREQ_SUMMARY',
  IS_LOADING_KEYWORD_DATABASE_AGG_SUMMARY: 'IS_LOADING_KEYWORD_DATABASE_AGG_SUMMARY',
  SET_KEYWORD_DATABASE_AGG_SUMMARY: 'SET_KEYWORD_DATABASE_AGG_SUMMARY',

  /* Actions for the main table */
  IS_LOADING_KEYWORD_DATABASE_TABLE: 'IS_LOADING_KEYWORD_DATABASE_TABLE',
  SET_KEYWORD_DATABASE_TABLE_RESULTS: 'SET_KEYWORD_DATABASE_TABLE_RESULTS',
  SET_KEYWORD_DATABASE_TABLE_PAGINATION_INFO: 'SET_KEYWORD_DATABASE_TABLE_PAGINATION_INFO',
};

/* Default Include Exclude exclude */
export const DEFAULT_INCLUDE_EXCLUDE_FILTER = {
  include: '',
  exclude: '',
};

/* Default Min Max Filter */
export const DEFAULT_MIN_MAX_FILTER = {
  min: '',
  max: '',
};

/* Possible filter types */
export const F_TYPES = {
  TEXT: 'TEXT',
  INPUT_INCLUDE_EXCLUDE: 'INPUT_INCLUDE_EXCLUDE',
  MIN_MAX: 'MIN_MAX',
  MIN_MAX_PERIOD: 'MIN_MAX_PERIOD',
  CHECKBOX: 'CHECKBOX',
};

/* Filter Query Key Mapper */
/* Map the payload keys to query keys for API */
export const FILTER_QUERY_KEY_MAPPER: { [key: string]: { keyName: string; type: string } } = {
  // include exclude
  searchTerm: { keyName: 'phrases', type: F_TYPES.INPUT_INCLUDE_EXCLUDE },

  // checkbox filters
  matchKeywords: { keyName: 'whole_words', type: F_TYPES.CHECKBOX },
  amazonChoice: { keyName: 'is_amazon_choice', type: F_TYPES.CHECKBOX },

  // min max based
  searchVolume: { keyName: 'search_volume', type: F_TYPES.MIN_MAX },
  wordCount: { keyName: 'word_count', type: F_TYPES.MIN_MAX },
  competingProducts: { keyName: 'competing_products', type: F_TYPES.MIN_MAX },
  titleDensity: { keyName: 'title_density', type: F_TYPES.MIN_MAX },
  searchVolumeTrend30D: { keyName: 'search_volume_30_days', type: F_TYPES.MIN_MAX },
};

export const MAX_KEYWORDS_ALLOWED = 200;

/* Default Pages Display List Options */
export const DEFAULT_PAGES_LIST = [
  {
    text: '20',
    value: 20,
    id: '20',
  },
  {
    text: '50',
    value: 50,
    id: '50',
  },
  {
    text: '100',
    value: 100,
    id: '100',
  },
];
