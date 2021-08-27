/* Import Action Types */
import axios from 'axios';
import { AppConfig } from '../../config';
import { actionTypes } from '../../constants/KeywordResearch/KeywordTracker';

/* Interfaces */
import {
  ProductTrackPayload,
  TrackerProductKeywordsTablePaginationInfo,
  TrackerProductKeywordsTablePayload,
  TrackerTableProductsPayload,
} from '../../interfaces/KeywordResearch/KeywordTracker';

/* Selectors */
import { sellerIDSelector } from '../../selectors/Seller';
import { getKeywordTrackerProductsTableResults } from '../../selectors/KeywordResearch/KeywordTracker';

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
    const { resetFilters = false, enableLoader = true } = payload;

    if (resetFilters) {
      dispatch(isLoadingKeywordTrackerProductsTable(false));
      dispatch(setKeywordTrackerProductsTableResults([]));
      return;
    }

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/keywords/track/products`;

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

/* Action to fetch the kwyords for the product on tracker table */
export const fetchTrackerProductKeywordsTable = (
  payload: TrackerProductKeywordsTablePayload
) => async (dispatch: any) => {
  const sellerId = sellerIDSelector();

  try {
    const { keywordTrackProductId, enableLoader = true, per_page = 20, page = 1 } = payload;

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

    const pagination = `page=${page}&per_page=${per_page}`;

    const resourcePath = `keyword_track_product_id=${keywordTrackProductId}&${pagination}`;

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
