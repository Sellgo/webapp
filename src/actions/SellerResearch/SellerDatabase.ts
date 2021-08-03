import { AppConfig } from '../../config';
import { actionTypes } from '../../constants/SellerResearch/SellerDatabase';
import {
  SellerDatabasePayload,
  ShowFilterMessage,
} from '../../interfaces/SellerResearch/SellerDatabase';
import { sellerIDSelector } from '../../selectors/Seller';

/* Action to set loading state for seller database */
export const setIsLoadingSellerDatabase = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_SELLER_DATABASE,
    payload,
  };
};

/* Action to set seller database results */
export const setSellerDatabaseResults = (payload: any) => {
  return {
    type: actionTypes.SET_SELLER_DATABASE_RESULTS,
    payload,
  };
};

/* Action to set and show filter messages */
export const setSellerDatabaseFilterMessage = (payload: ShowFilterMessage) => {
  return {
    type: actionTypes.SHOW_FILTER_MESSAGE,
    payload,
  };
};

/* =========================== Async actions ======================= */
export const fetchSellerDatabase = (payload: SellerDatabasePayload) => async (dispatch: any) => {
  const sellerID = sellerIDSelector();

  try {
    const { resetFilter } = payload;

    if (resetFilter) {
      dispatch(setIsLoadingSellerDatabase(false));
      dispatch(setSellerDatabaseResults([]));
    }

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerID}/merchants-database?`;

    console.log('Fetching URL', URL);
  } catch (err) {
    console.error('Error fetching seller databse', err);
  }
};
