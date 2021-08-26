/* Action types for keyword tracker  */
export const actionTypes = {
  // Action types for keyword tracker main products table
  IS_LOADING_KEYWORD_TRACKER_PRODUCTS_TABLE: 'IS_LOADING_KEYWORD_TRACKER_PRODUCTS_TABLE',
  SET_KEYWORD_TRACKER_PRODUCTS_TABLE_RESULTS: 'SET_KEYWORD_TRACKER_PRODUCTS_TABLE_RESULTS',
};

/* Unique key on each row for tracker products table */
export const TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY = 'id';

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
