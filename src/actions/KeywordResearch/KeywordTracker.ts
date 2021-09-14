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
  AddCompetitorsPayload,
  KeywordTrackerProductsTablePaginationInfo,
  KeywordTrackerTableCompetitors,
  ProductTrackPayload,
  TrackerProductKeywordsHistory,
  TrackerProductKeywordsTablePaginationInfo,
  TrackerProductKeywordsTablePayload,
  TrackerProductsKeywordsHistoryExportProgress,
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
import { error, success } from '../../utils/notifications';
import { downloadFile } from '../../utils/download';

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
/*    KEYWORD TRACKER COMPETITORS  */
/* ================================================= */

/* Action to set the competitors */
export const setKeywordTrackerProductsTableCompetitors = (
  payload: KeywordTrackerTableCompetitors[]
) => {
  return {
    type: actionTypes.SET_KEYWORD_TRACKER_PRODUCTS_TABLE_COMPETITORS,
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
/*   						KEYWORD HISTORY											 */
/* ================================================= */

/* Action to set loading state for tracker product keyword history */
export const isLoadingTrackerProductKeywordsHistory = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_TRACKER_PRODUCT_KEYWORDS_HISTORY,
    payload,
  };
};

/* Action to set tracker product keyword history */
export const setTrackerProductKeywordsHistoryResult = (payload: any[]) => {
  return {
    type: actionTypes.SET_TRACKER_PRODUCT_KEYWORDS_HISTORY_RESULT,
    payload,
  };
};

/* ================================================= */
/*   		   KEYWORD HISTORY	PROGRESS								 */
/* ================================================= */

/* Action to set if progress needs to be called */
export const shouldFetchTrackerProductKeywordsHistoryExportProgress = (payload: boolean) => {
  return {
    type: actionTypes.SHOULD_FETCH_TRACKER_PRODUCT_KEYWORDS_HISTORY_EXPORT_PROGRESS,
    payload,
  };
};

/* Action to set keyword history export progress data */
export const setTrackerProductKeywordsHistoryExportProgress = (
  payload: TrackerProductsKeywordsHistoryExportProgress
) => {
  return {
    type: actionTypes.SET_TRACKER_PRODUCT_KEYWORDS_HISTORY_EXPORT_PROGRESS,
    payload,
  };
};

/* ================================================= */
/*   						ASYNC ACTIONS 											 */
/* ================================================= */

/* ================================================= */
/*   					KEYWORD TRACKER MAIN TABLE							*/
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
      search = '',
    } = payload;

    if (resetFilters) {
      dispatch(isLoadingKeywordTrackerProductsTable(false));
      dispatch(setKeywordTrackerProductsTableResults([]));
      return;
    }

    const sorting = `sort=${sort}&sort_direction=${sortDir}`;
    const pagination = `page=${page}&per_page=${perPage}`;
    const searchTerm = `search=${search}`;

    const resourcePath = `${sorting}&${pagination}&${searchTerm}`;

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/keywords/track/products?${resourcePath}`;

    dispatch(isLoadingKeywordTrackerProductsTable(enableLoader));

    const { data } = await axios.get(URL);

    const { results, ...paginationInfo } = data;

    if (data) {
      dispatch(setKeywordTrackerProductsTableResults(results));
      dispatch(setKeywordTrackerProductsTablePaginationInfo(paginationInfo));
      dispatch(isLoadingKeywordTrackerProductsTable(false));
    }
  } catch (err) {
    console.error('Error fetching tracker table products', err);
    dispatch(setKeywordTrackerProductsTableResults([]));
    dispatch(
      setKeywordTrackerProductsTablePaginationInfo({
        count: 0,
        total_pages: 0,
        per_page: 0,
        current_page: 0,
      })
    );

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

/* Action to add the competitors for a product in the keyword tracker products table */

export const addCompetitorsToKeywordTrackerProductsTable = (
  payload: AddCompetitorsPayload
) => async () => {
  const sellerId = sellerIDSelector();

  try {
    const { keywordTrackProductId, asins } = payload;

    if (!keywordTrackProductId || !asins) {
      return;
    }

    // prepare the payload
    const formData = new FormData();

    formData.set('keyword_track_product_id', String(keywordTrackProductId));
    formData.set(asins, 'asins');

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/keywords/track/competitors`;

    const { data } = await axios.post(URL, formData);

    if (data) {
      console.log('Adding for competitors successful');
    }
  } catch (err) {
    console.error('Error adding competitors to table');
  }
};

/* ================================================= */
/*   	KEYWORD TRACKER PRODUCTS KEYWORDS  TABLE			 */
/* ================================================= */

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
    const sorting = `sort=${sort}&sort_direction=${sortDir}`;

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
export const unTrackTrackerProductTableKeyword = (payload: UnTrackProductsTableKeyword) => async (
  dispatch: any,
  getState: any
) => {
  const sellerId = sellerIDSelector();

  const currentlyAvailableKeywords = getTrackerProductKeywordsTableResults(getState());

  try {
    const { keywordTrackId } = payload;

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

/* Action to fetch tracker product keywords history */
export const fetchTrackerProductKeywordsHistory = (
  payload: TrackerProductKeywordsHistory
) => async (dispatch: any) => {
  const sellerId = sellerIDSelector();

  try {
    const { keywordTrackId } = payload;

    if (!keywordTrackId) {
      dispatch(isLoadingTrackerProductKeywordsHistory(false));
      dispatch(setTrackerProductKeywordsHistoryResult([]));
      return;
    }

    const resourcePath = `keyword_track_id=${keywordTrackId}`;

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/keywords/track/history?${resourcePath}`;
    dispatch(isLoadingTrackerProductKeywordsHistory(true));

    const { data } = await axios.get(URL);

    if (data) {
      dispatch(isLoadingTrackerProductKeywordsHistory(false));
      dispatch(setTrackerProductKeywordsHistoryResult(data));
    } else {
      dispatch(isLoadingTrackerProductKeywordsHistory(false));
      dispatch(setTrackerProductKeywordsHistoryResult([]));
    }
  } catch (err) {
    console.error('Error fetching keywords history');
    dispatch(isLoadingTrackerProductKeywordsHistory(false));
    dispatch(setTrackerProductKeywordsHistoryResult([]));
  }
};

/* Action to fetch the keyword history progress */
export const fetchTrackerProductKeywordsHistoryExportProgress = () => async (dispatch: any) => {
  try {
    const sellerID = sellerIDSelector();

    const keywordTrackId = localStorage.getItem('trackerProductExportKeywordTrackId');

    if (!keywordTrackId) {
      dispatch(shouldFetchTrackerProductKeywordsHistoryExportProgress(false));
      dispatch(
        setTrackerProductKeywordsHistoryExportProgress({
          export_progress: '',
          keyword_track_id: 0,
          export_status: '',
          report_xlsx_url: '',
        })
      );
      return;
    }

    const resourcePath = `keyword_track_id=${keywordTrackId}`;
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerID}/keywords/track/history/export?${resourcePath}`;

    const { data } = await axios.get(URL);

    const isFailedStatus = data.export_status === 'failed';
    const isCompleted = data.export_status === 'completed';

    if (isFailedStatus) {
      dispatch(shouldFetchTrackerProductKeywordsHistoryExportProgress(false));
      dispatch(
        setTrackerProductKeywordsHistoryExportProgress({
          export_progress: '',
          keyword_track_id: 0,
          export_status: '',
          report_xlsx_url: '',
        })
      );
      error('Error: Failed during export in progress');
      return;
    }

    if (!isFailedStatus) {
      dispatch(setTrackerProductKeywordsHistoryExportProgress(data));
      // if not completed should fetch again else not
      dispatch(shouldFetchTrackerProductKeywordsHistoryExportProgress(!isCompleted));

      if (isCompleted) {
        const { report_xlsx_url } = data;

        if (report_xlsx_url) {
          await downloadFile(report_xlsx_url);
          success('Keyword history sucessfully exported');
        }
      }
    }
  } catch (err) {
    console.error('Error fetching keyword progress');
    dispatch(shouldFetchTrackerProductKeywordsHistoryExportProgress(false));
    dispatch(
      setTrackerProductKeywordsHistoryExportProgress({
        export_progress: '',
        keyword_track_id: 0,
        export_status: '',
        report_xlsx_url: '',
      })
    );
  }
};

/* Action to trigger export for keywords history */
export const triggerTrackerProductKeywordsHistoryExport = (
  payload: TrackerProductKeywordsHistory
) => async (dispatch: any) => {
  const sellerId = sellerIDSelector();

  const { keywordTrackId } = payload;

  // keep the keywordTrackId undergoingexport in localStorage
  localStorage.setItem('trackerProductExportKeywordTrackId', String(keywordTrackId));

  try {
    const formData = new FormData();
    formData.set(TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY, String(keywordTrackId));

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/keywords/track/history/export`;

    const { status, statusText } = await axios.post(URL, formData);

    if (status === 200 && statusText === 'OK') {
      // reset any previous export results
      dispatch(
        setTrackerProductKeywordsHistoryExportProgress({
          export_progress: '',
          keyword_track_id: 0,
          export_status: '',
          report_xlsx_url: '',
        })
      );

      dispatch(shouldFetchTrackerProductKeywordsHistoryExportProgress(true));
      return;
    }
  } catch (err) {
    console.error('Error starting the export for keyword');
  }
};
