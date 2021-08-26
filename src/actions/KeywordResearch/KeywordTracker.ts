/* Import Action Types */
import axios from 'axios';
import { AppConfig } from '../../config';
import { actionTypes } from '../../constants/KeywordResearch/KeywordTracker';

/* Interfaces */
import {
  ProductTrackPayload,
  TrackerProductKeywordsTablePayload,
  TrackerTableProductsPayload,
} from '../../interfaces/KeywordResearch/KeywordTracker';
import { getKeywordTrackerProductsTableResults } from '../../selectors/KeywordResearch/KeywordTracker';

/* Selectors */
import { sellerIDSelector } from '../../selectors/Seller';

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
    const { keywordTrackProductId, enableLoader = true } = payload;

    const resourcePath = `keyword_track_product_id=${keywordTrackProductId}`;

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/keywords/track?${resourcePath}`;

    dispatch(isLoadingTrackerProductKeywordsTable(enableLoader));

    const { data } = await axios.get(URL);

    if (data) {
      dispatch(setTrackerProductKeywordsTableResults(data));
      dispatch(isLoadingTrackerProductKeywordsTable(false));
    }
  } catch (err) {
    console.error('Error Fetching Tracker');
    dispatch(setTrackerProductKeywordsTableResults([]));
    dispatch(isLoadingTrackerProductKeywordsTable(false));
  }
};
