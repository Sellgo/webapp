/* Action types for keyword tracker  */
export const actionTypes = {
  // Action types for keyword tracker main products table
  IS_LOADING_KEYWORD_TRACKER_PRODUCTS_TABLE: 'IS_LOADING_KEYWORD_TRACKER_PRODUCTS_TABLE',
  SET_KEYWORD_TRACKER_PRODUCTS_TABLE_RESULTS: 'SET_KEYWORD_TRACKER_PRODUCTS_TABLE_RESULTS',
  SET_KEYWORD_TRACKER_PRODUCTS_TABLE_PAGINATION_INFO:
    'SET_KEYWORD_TRACKER_PRODUCTS_TABLE_PAGINATION_INFO',

  SET_KEYWORD_TRACKER_PRODUCTS_EXPANDED_ROW: 'SET_KEYWORD_TRACKER_PRODUCTS_EXPANDED_ROW',
  UPDATE_KEYWORD_TRACKER_PRODUCT: 'UPDATE_KEYWORD_TRACKER_PRODUCT',

  // Action types for obtaining keyword tracker product variations
  IS_LOADING_KEYWORD_TRACKER_PRODUCT_VARIATIONS: 'IS_LOADING_KEYWORD_TRACKER_VARIATIONS',
  SET_KEYWORD_TRACKER_PRODUCT_VARIATIONS: 'SET_KEYWORD_TRACKER_PRODUCT_VARIATIONS',

  // Action types for asetting competitors in keywords products table
  SET_KEYWORD_TRACKER_PRODUCTS_TABLE_COMPETITORS: 'SET_KEYWORD_TRACKER_PRODUCTS_TABLE_COMPETITORS',

  // Action types for the product keyword table
  IS_LOADING_TRACKER_PRODUCT_KEYWORDS_TABLE: 'IS_LOADING_TRACKER_PRODUCT_KEYWORDS_TABLE',
  SET_TRACKER_PRODUCT_KEYWORDS_TABLE_RESULTS: 'SET_TRACKER_PRODUCT_KEYWORDS_TABLE_RESULTS',
  SET_TRACKER_PRODUCT_KEYWORDS_TABLE_PAGINATION_INFO:
    'SET_TRACKER_PRODUCT_KEYWORDS_TABLE_PAGINATION_INFO',

  // Action types for keyword history chart
  IS_LOADING_TRACKER_PRODUCT_KEYWORDS_HISTORY: 'IS_LOADING_TRACKER_PRODUCT_KEYWORDS_HISTORY',
  SET_TRACKER_PRODUCT_KEYWORDS_HISTORY_RESULT: 'SET_TRACKER_PRODUCT_KEYWORDS_HISTORY_RESULT',

  // Action types for the keyword history export
  SHOULD_FETCH_TRACKER_PRODUCT_KEYWORDS_HISTORY_EXPORT_PROGRESS:
    'SHOULD_FETCH_TRACKER_PRODUCT_KEYWORDS_HISTORY_EXPORT_PROGRESS',
  SET_TRACKER_PRODUCT_KEYWORDS_HISTORY_EXPORT_PROGRESS:
    'SET_TRACKER_PRODUCT_KEYWORDS_HISTORY_EXPORT_PROGRESS',
};

/* Row height for the product keyword child table */
export const PRODUCT_KEYWORD_ROW_HEIGHT = 50;

/* Maximum number of competiros allowed */
export const MAX_COMPETITORS_ALLOWED = 10;

/* Maximum keyword allowed */
export const MAX_KEYWORDS_ALLOWED = 2000;

/* Unique key on each row for tracker products table */
export const TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY = 'keyword_track_product_id';

/* Unique key on the product keyword table */
export const TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY = 'keyword_track_id';

/* Pagination info */
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

/* Calculate tracker product table exanded row height */
export const calculateTrackerProductTableExpandedHeight = (noOfItems: number) => {
  if (noOfItems <= 0) {
    return 320;
  }

  const heightWithOffset = (noOfItems + 5) * PRODUCT_KEYWORD_ROW_HEIGHT;

  const expandedRowHeight = Math.min(heightWithOffset, 600);

  return expandedRowHeight;
};

/* Calulate height for the keyword child table */
export const calculateKeywordsTableHeight = (noOfItems: number) => {
  if (noOfItems <= 0) {
    return 250;
  }

  const heightWithOffset = (noOfItems + 3) * PRODUCT_KEYWORD_ROW_HEIGHT;

  const expandedRowHeight = Math.min(heightWithOffset, 500);

  return expandedRowHeight;
};
