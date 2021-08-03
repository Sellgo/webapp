import { actionTypes } from '../../constants/SellerResearch/SellerDatabase';

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
export const setSellerDatabaseFilterMessage = (payload: { show: boolean; message: string }) => {
  return {
    type: actionTypes.SHOW_EMPTY_FILTER_MESSAGE,
    payload,
  };
};

/* =========================== Async actions ======================= */
