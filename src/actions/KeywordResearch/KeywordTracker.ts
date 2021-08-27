/* Import Action Types */
import axios from 'axios';
import { AppConfig } from '../../config';
import {
  actionTypes,
  TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY,
  TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY,
} from '../../constants/KeywordResearch/KeywordTracker';

/* Interfaces */
import {
  KeywordTrackerProductsTablePaginationInfo,
  ProductTrackPayload,
  TrackerProductKeywordsTablePaginationInfo,
  TrackerProductKeywordsTablePayload,
  TrackerTableProductsPayload,
  UnTrackKeywordTrackerTableProduct,
  UnTrackProductsTableKeyword,
} from '../../interfaces/KeywordResearch/KeywordTracker';

/* Selectors */
import { sellerIDSelector } from '../../selectors/Seller';
import {
  getKeywordTrackerProductsTableResults,
  getTrackerProductKeywordsTableResults,
} from '../../selectors/KeywordResearch/KeywordTracker';

/* Utils */
import { success } from '../../utils/notifications';

/* ================================================= */
/*    KEYWORD TRACK MAIN TABLE (PRODUCTS)  */
/* ================================================= */

/* Action to set loading state of keyword tracker product table */
export const isLoadingKeywordTrackerProductsTable = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_KEYWORD_TRACKER_PRODUCTS_TABLE,
    payload,
  };
};

/* Action to set keyword tracker products table results */
export const setKeywordTrackerProductsTableResults = (payload: any) => {
  return {
    type: actionTypes.SET_KEYWORD_TRACKER_PRODUCTS_TABLE_RESULTS,
    payload,
  };
};

/* Action to set keyword tracker products table pagination info */
export const setKeywordTrackerProductsTablePaginationInfo = (
  payload: KeywordTrackerProductsTablePaginationInfo
) => {
  return {
    type: actionTypes.SET_KEYWORD_TRACKER_PRODUCTS_TABLE_PAGINATION_INFO,
    payload,
  };
};

/* ================================================= */
/*    KEYWORD TRACKER PRODUCT KEYWORDS TABLE   */
/* ================================================= */

/* Action to set loading state of keyword tracker product table */
export const isLoadingTrackerProductKeywordsTable = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_TRACKER_PRODUCT_KEYWORDS_TABLE,
    payload,
  };
};

/* Action to set keyword tracker products table results */
export const setTrackerProductKeywordsTableResults = (payload: any) => {
  return {
    type: actionTypes.SET_TRACKER_PRODUCT_KEYWORDS_TABLE_RESULTS,
    payload,
  };
};

/* Action to set pagination info details fr the tracker product keyword table */
export const setTrackerProductKeywordsTablePaginationInfo = (
  payload: TrackerProductKeywordsTablePaginationInfo
) => {
  return {
    type: actionTypes.SET_TRACKER_PRODUCT_KEYWORDS_TABLE_PAGINATION_INFO,
    payload,
  };
};

/* ================================================= */
/*   						ASYNC ACTIONS 											 */
/* ================================================= */

/* Action to track products (asin) and the kwyrods */
export const trackProductWithAsinAndKeywords = (payload: ProductTrackPayload) => async (
  dispatch: any,
  getState: any
) => {
  const sellerId = sellerIDSelector();
  const currentlyTrackedProducts = getKeywordTrackerProductsTableResults(getState());

  try {
    const { asin, keywords } = payload;

    if (!asin || !keywords) {
      return;
    }

    const formData = new FormData();

    formData.set('asin', asin);
    formData.set('phrases', keywords);

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/keywords/track`;

    const { data } = await axios.post(URL, formData);

    if (data) {
      const updatedData = [...currentlyTrackedProducts, data];
      dispatch(setKeywordTrackerProductsTableResults(updatedData));
      success('Product successfully tracked');
    }
  } catch (err) {
    console.error('Error tracking product with keyword', err);
  }
};

/* Action to fetch the keyword tacker products table content */
export const fetchKeywordTrackerProductsTable = (payload: TrackerTableProductsPayload) => async (
  dispatch: any
) => {
  const sellerId = sellerIDSelector();

  try {
    const {
      resetFilters = false,
      enableLoader = true,
      sortDir = 'asc',
      sort = 'id',
      page = 1,
      perPage = 20,
    } = payload;

    if (resetFilters) {
      dispatch(isLoadingKeywordTrackerProductsTable(false));
      dispatch(setKeywordTrackerProductsTableResults([]));
      return;
    }

    const sorting = `sort=${sort}&sort_dir=${sortDir}`;
    const pagination = `page=${page}&per_page=${perPage}`;
    const resourcePath = `${sorting}&${pagination}`;

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/keywords/track/products?${resourcePath}`;

    dispatch(isLoadingKeywordTrackerProductsTable(enableLoader));

    const { data } = await axios.get(URL);

    if (data) {
      dispatch(setKeywordTrackerProductsTableResults(data));
      dispatch(isLoadingKeywordTrackerProductsTable(false));
    }
  } catch (err) {
    console.error('Error fetching tracker table products', err);
    dispatch(isLoadingKeywordTrackerProductsTable(false));
  }
};

/* Action to untrack/delete product from the keywords tracker products table */
export const unTrackKeywordTrackerTableProduct = (
  payload: UnTrackKeywordTrackerTableProduct
) => async (dispatch: any, getState: any) => {
  const sellerId = sellerIDSelector();

  const currentlyAvailableProducts = getKeywordTrackerProductsTableResults(getState());

  try {
    const { keywordTrackProductId } = payload;

    const formData = new FormData();
    formData.set(TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY, String(keywordTrackProductId));
    formData.set('status', 'inactive');

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/keywords/track/products`;

    const { data } = await axios.patch(URL, formData);

    if (data) {
      // Remove the keyword from the keywords table
      const updatedProductsOnTable = currentlyAvailableProducts.filter(
        (productData: any) =>
          productData[TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY] !==
          data[TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY]
      );

      dispatch(setKeywordTrackerProductsTableResults(updatedProductsOnTable));
      success('Successfully deleted product');
    }
  } catch (err) {
    console.error('Error Untracking/Deleting keyword from tracker product table', err);
  }
};

/* Action to fetch the kwyords for the product on tracker table */
export const fetchTrackerProductKeywordsTable = (
  payload: TrackerProductKeywordsTablePayload
) => async (dispatch: any) => {
  const sellerId = sellerIDSelector();

  try {
    const {
      keywordTrackProductId,
      enableLoader = true,
      perPage = 20,
      page = 1,
      sort = 'id',
      sortDir = 'asc',
    } = payload;

    if (!keywordTrackProductId) {
      dispatch(setTrackerProductKeywordsTableResults([]));
      dispatch(
        setTrackerProductKeywordsTablePaginationInfo({
          count: 0,
          current_page: 0,
          total_pages: 0,
          per_page: 20,
        })
      );
      return;
    }

    const pagination = `page=${page}&per_page=${perPage}`;
    const sorting = `sort=${sort}&sort_dir=${sortDir}`;

    const resourcePath = `keyword_track_product_id=${keywordTrackProductId}&${pagination}&${sorting}`;

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/keywords/track?${resourcePath}`;

    dispatch(isLoadingTrackerProductKeywordsTable(enableLoader));

    const { data } = await axios.get(URL);

    const { results, ...paginationInfo } = data;

    if (data) {
      dispatch(setTrackerProductKeywordsTableResults(results));
      dispatch(setTrackerProductKeywordsTablePaginationInfo(paginationInfo));
      dispatch(isLoadingTrackerProductKeywordsTable(false));
    }
  } catch (err) {
    console.error('Error Fetching Tracker');
    dispatch(setTrackerProductKeywordsTableResults([]));
    dispatch(
      setTrackerProductKeywordsTablePaginationInfo({
        count: 0,
        current_page: 0,
        total_pages: 0,
        per_page: 20,
      })
    );

    dispatch(isLoadingTrackerProductKeywordsTable(false));
  }
};

/* Action to untrack the kewyord from tracker products table */
export const unTrackTrackerProductsTableKeyword = (payload: UnTrackProductsTableKeyword) => async (
  dispatch: any,
  getState: any
) => {
  const sellerId = sellerIDSelector();

  const currentlyAvailableKeywords = getTrackerProductKeywordsTableResults(getState());

  try {
    const { keywordTrackId } = payload;

    console.log('This action is called');

    const formData = new FormData();
    formData.set(TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY, String(keywordTrackId));
    formData.set('status', 'inactive');

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/keywords/track`;

    const { data } = await axios.patch(URL, formData);

    if (data) {
      // Remove the keyword from the keywords table
      const updatedKeywordsOnTable = currentlyAvailableKeywords.filter(
        (keywordData: any) =>
          keywordData[TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY] !==
          data[TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY]
      );

      dispatch(setTrackerProductKeywordsTableResults(updatedKeywordsOnTable));
      success('Successfully deleted keyword');
    }
  } catch (err) {
    console.error('Error Untracking/Deleting keyword from tracker product table', err);
  }
};
