/* Action types for keyword tracker  */
export const actionTypes = {
  // Action types for keyword tracker main products table
  IS_LOADING_KEYWORD_TRACKER_PRODUCTS_TABLE: 'IS_LOADING_KEYWORD_TRACKER_PRODUCTS_TABLE',
  SET_KEYWORD_TRACKER_PRODUCTS_TABLE_RESULTS: 'SET_KEYWORD_TRACKER_PRODUCTS_TABLE_RESULTS',

  // Action types for the product keyword table
  IS_LOADING_TRACKER_PRODUCT_KEYWORDS_TABLE: 'IS_LOADING_TRACKER_PRODUCT_KEYWORDS_TABLE',
  SET_TRACKER_PRODUCT_KEYWORDS_TABLE_RESULTS: 'SET_TRACKER_PRODUCT_KEYWORDS_TABLE_RESULTS',
};

/* Row height for the product keyword child table */
export const PRODUCT_KEYWORD_ROW_HEIGHT = 50;

/* Unique key on each row for tracker products table */
export const TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY = 'keyword_track_product_id';

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

/* Calulate height for the keyword child table */
export const calculateKeywordsTableHeight = (noOfItems: number) => {
  // 4 is added as offset row count
  return PRODUCT_KEYWORD_ROW_HEIGHT * ((noOfItems || 20) + 4);
};
