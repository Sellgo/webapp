/* Import Action Types */
import axios from 'axios';
import { AppConfig } from '../../config';
import { actionTypes } from '../../constants/KeywordResearch/KeywordTracker';

/* Interfaces */
import { TrackProductAndKeywords } from '../../interfaces/KeywordResearch/KeywordTracker';
import { getKeywordTrackerProductsTableResults } from '../../selectors/KeywordResearch/KeywordTracker';
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
/*   						ASYNC ACTIONS 											 */
/* ================================================= */

/* Action to fetch the keyword tacker products table content */
export const fetchKeywordTrackerProductsTable = (payload: TrackProductAndKeywords) => async (
  dispatch: any,
  getState: any
) => {
  const sellerId = sellerIDSelector();
  const currentlyTrackedProducts = getKeywordTrackerProductsTableResults(getState());

  try {
    const { asin, keywords } = payload;

    const formData = new FormData();

    // Prepare the POST payload to track a product with keywords
    formData.set('asin', asin);
    formData.set('phrases', keywords);

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/keywords/track`;

    dispatch(isLoadingKeywordTrackerProductsTable(true));
    const { data } = await axios.post(URL, formData);

    if (data) {
      const updatedTrackedProducts = [...currentlyTrackedProducts, data];
      dispatch(setKeywordTrackerProductsTableResults(updatedTrackedProducts));
      dispatch(isLoadingKeywordTrackerProductsTable(false));
    }
  } catch (err) {
    console.error('Error try to track product and keyword on main tale', err);
    dispatch(isLoadingKeywordTrackerProductsTable(false));
  }
};
