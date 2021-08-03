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

/* Action to prepare the payload for query */
export const parseFilters = (sellerDatabaseFilter: any) => {
  console.log('Filter given', sellerDatabaseFilter);
};

/* =========================== Async actions ======================= */
export const fetchSellerDatabase = (payload: SellerDatabasePayload) => async (dispatch: any) => {
  const sellerID = sellerIDSelector();

  try {
    const {
      resetFilter = false,
      filterPayload,
      page = 1,
      sort = 'seller_id',
      sortDir = 'asc',
    } = payload;

    // if filter request is passed
    if (resetFilter) {
      dispatch(setIsLoadingSellerDatabase(false));
      dispatch(setSellerDatabaseResults([]));
      dispatch(
        setSellerDatabaseFilterMessage({
          type: 'info',
          show: true,
          message: 'Please specify atleast one filter to view the data',
        })
      );
      return;
    }

    const pagination = `page=${page}`;
    const sorting = `ordering=${sortDir === 'desc' ? `-${sort}` : sort}`;

    const filtersQueryString = parseFilters(filterPayload);

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerID}/merchants-database?
    ${pagination}&${sorting}${filtersQueryString}`;

    console.log('Fetching URL', URL);
  } catch (err) {
    console.error('Error fetching seller databse', err);
  }
};
