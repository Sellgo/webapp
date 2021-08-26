/* Import Action Types */
import axios from 'axios';
import { AppConfig } from '../../config';
import { actionTypes } from '../../constants/KeywordResearch/KeywordTracker';

/* Interfaces */
import { TrackerTableProductsPayload } from '../../interfaces/KeywordResearch/KeywordTracker';

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
/*   						ASYNC ACTIONS 											 */
/* ================================================= */

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
    console.error('Error try to track product and keyword on main tale', err);
    dispatch(isLoadingKeywordTrackerProductsTable(false));
  }
};
