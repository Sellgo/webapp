/* Actions types for keywords reverse */

export const actionTypes = {
  /* Actions for keyword request */
  IS_FETCHING_KEYWORD_REVERSE_REQUEST_ID: 'IS_FETCHING_KEYWORD_REVERSE_REQUEST_ID',
  SET_KEYWORD_REVERSE_REQUEST_ID: 'SET_KEYWORD_REVERSE_REQUEST_ID',
  SET_ASIN_LIST_FOR_KEYWORD_REVERSE: 'SET_ASIN_LIST_FOR_KEYWORD_REVERSE',

  /* Actions for keyword request progress */
  SHOULD_FETCH_KEYWORD_REVERSE_PROGRESS: 'SHOULD_FETCH_KEYWORD_REVERSE_PROGRESS',
  SET_KEYWORD_REVERSE_PROGRESS_DATA: 'SET_KEYWORD_REVERSE_PROGRESS_DATA',

  /* Actions for the main table */
  IS_LOADING_KEYWORD_REVERSE_TABLE: 'IS_LOADING_KEYWORD_REVERSE_TABLE',
  SET_KEYWORD_REVERSE_TABLE_RESULTS: 'SET_KEYWORD_REVERSE_TABLE_RESULTS',
  SET_KEYWORD_REVERSE_TABLE_PAGINATION_INFO: 'SET_KEYWORD_REVERSE_TABLE_PAGINATION_INFO',
};

export const DEFAULT_INCLUDE_EXCLUDE_FILTER = {
  include: '',
  exclude: '',
};

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
};

/* Filter Query Key Mapper */
/* Map the payload keys to query keys for API */
export const FILTER_QUERY_KEY_MAPPER: { [key: string]: { keyName: string; type: string } } = {
  // include exclude
  searchTerm: { keyName: 'phrases', type: F_TYPES.INPUT_INCLUDE_EXCLUDE },

  // min max based
  searchVolume: { keyName: 'search_volume', type: F_TYPES.MIN_MAX },
  positionRank: { keyName: 'position_rank', type: F_TYPES.MIN_MAX },
  sponsoredAsins: { keyName: 'sponsored_asins', type: F_TYPES.MIN_MAX },
  relativeRank: { keyName: 'relative_rank', type: F_TYPES.MIN_MAX },
  competitorRank: { keyName: 'competitor_rank_avg', type: F_TYPES.MIN_MAX },
  rankingCompetitors: { keyName: 'ranking_competitors_count', type: F_TYPES.MIN_MAX },
  competingProducts: { keyName: 'competing_products', type: F_TYPES.MIN_MAX },
};

/* Exports data */
export const EXPORT_FORMATS = [
  // { key: 'csv', value: 'csv', text: '.CSV' },
  { key: 'xlsx', value: 'xlsx', text: '.XLSX' },
];

export const EXPORT_DATA = [{ key: 'all', value: 'all', text: 'All Results' }];

export const MAX_ASINS_ALLOWED = 10;

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
