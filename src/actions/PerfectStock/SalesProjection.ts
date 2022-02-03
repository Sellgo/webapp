import axios from 'axios';

/* Config */
import { AppConfig } from '../../config';

/* Constants */
import { actionTypes } from '../../constants/PerfectStock/SalesProjection';

/* Interfaces */
import {
  SalesProjectionPayload,
  SalesProjectionProduct,
  SalesProjectionUpdatePayload,
} from '../../interfaces/PerfectStock/SalesProjection';

/* Selectors */
import { sellerIDSelector } from '../../selectors/Seller';
import { getSalesProjectionResults } from '../../selectors/PerfectStock/SalesProjection';
import { error, success } from '../../utils/notifications';

/* Action to set loading state for sales estimation */
export const isLoadingSalesProjection = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_SALES_PROJECTION_RESULTS,
    payload,
  };
};

/* Action to set sales estimation results */
export const setSalesProjectionResults = (payload: any) => {
  return {
    type: actionTypes.SET_SALES_PROJECTION_RESULTS,
    payload,
  };
};

/* Action to set sales projection update date */
export const setSalesProjectionUpdateDate = (payload: string) => {
  return {
    type: actionTypes.SET_SALES_PROJECTION_UPDATE_DATE,
    payload,
  };
};

/* Action to set refresh sales projection id */
export const setRefreshSalesProjectionId = (payload: number) => {
  return {
    type: actionTypes.SET_REFRESH_SALES_PROJECTION_ID,
    payload,
  };
};

/* Action to set fetch progress for sales projection refresh status */
export const setIsFetchingProgressForRefresh = (payload: boolean) => {
  return {
    type: actionTypes.SET_IS_FETCHING_PROGRESS_FOR_REFRESH,
    payload,
  };
};

/* Action to set progress for sales projection refresh status */
export const setRefreshProgress = (payload: number) => {
  return {
    type: actionTypes.SET_REFRESH_PROGRESS,
    payload,
  };
};

/* Action to set one row in sales projection table */
export const setSalesProjectionRow = (payload: SalesProjectionProduct) => (
  dispatch: any,
  getState: any
) => {
  const currentSalesProjectionProducts = getSalesProjectionResults(getState());
  const updatedSalesProjectionProducts = currentSalesProjectionProducts.map(
    (product: SalesProjectionProduct) => {
      if (product.id === payload.id) {
        return payload;
      } else {
        return product;
      }
    }
  );
  dispatch(setSalesProjectionResults(updatedSalesProjectionProducts));
};

/*********** Async Actions ************************ */

/* Export product database table */
// export const exportProductDatabaseTable = (requestPayload: any, fileFormat: string) => async () => {
//   try {
//     const sellerID = sellerIDSelector();
//     const { data } = await axios.post(`${AppConfig.BASE_URL_API}${sellerID}/products`, {
//       ...requestPayload,
//       is_export: true,
//       file_format: fileFormat,
//     });

//     if (data) {
//       const { url } = data;
//       if (url) {
//         await downloadFile(url);
//         success('File successfully exported');
//       } else {
//         error('Export not available.');
//       }
//     }
//   } catch (err) {
//     const { status, data } = err.response;

//     if (status === 403) {
//       error(data.message);
//     }
//   }
// };

/* Action to fetch products database */
export const fetchSalesProjection = (payload: SalesProjectionPayload) => async (dispatch: any) => {
  try {
    const {
      page = 1,
      sortDir = 'asc',
      sort = 'asin',
      isExport = false,
      fileFormat = 'csv',
    } = payload;

    const sellerId = sellerIDSelector();

    const requestPayload: any = {
      page: page,
    };

    const pagination = `page=${page}`;
    const sorting = `ordering=${sortDir === 'desc' ? `-${sort}` : sort}`;
    const resourcePath = `${pagination}&${sorting}`;

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/sales-projection?${resourcePath}`;

    if (isExport && fileFormat) {
      /* Handle Exports */
      // dispatch(exportProductDatabaseTable(requestPayload, fileFormat));
      return;
    }

    dispatch(isLoadingSalesProjection(true));

    const { data } = await axios.get(URL, requestPayload);
    if (data) {
      dispatch(setSalesProjectionResults(data.results));
      dispatch(setSalesProjectionUpdateDate(data.last_forecast_update));
    }
  } catch (err) {
    dispatch(setSalesProjectionResults([]));
    dispatch(setSalesProjectionUpdateDate(''));
    console.error('Error fetching sales estimation', err);
  }
  dispatch(isLoadingSalesProjection(false));
};

/* Action to fetch products database */
export const updateSalesProjectionProduct = (payload: SalesProjectionUpdatePayload) => async (
  dispatch: any
) => {
  try {
    const sellerId = sellerIDSelector();
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/sales-projection/${payload.id}/update`;
    const { data } = await axios.patch(URL, payload.updatePayload);
    if (data) {
      dispatch(setSalesProjectionRow(data));
      success('Successfully updated');
    }
  } catch (err) {
    dispatch(setSalesProjectionResults([]));
    console.error('Error updating sales estimation', err);
  }
};

/* Action to refresh sales projection results */
export const refreshSalesProjection = () => async (dispatch: any) => {
  try {
    const sellerId = sellerIDSelector();
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/perfect-stock/refresh-forecast`;
    const { data } = await axios.post(URL);

    if (data && data.perfect_stock_job_id) {
      dispatch(setRefreshSalesProjectionId(data.perfect_stock_job_id));
      dispatch(setIsFetchingProgressForRefresh(true));
      success('Refreshing sales projection information.');
    }
  } catch (err) {
    dispatch(setIsFetchingProgressForRefresh(false));
    const { status } = err.response;
    if (status === 429) {
      error('Only 1 refresh per day allowed.');
    }
    console.error('Error updating sales estimation', err);
  }
};

/* Action to get refresh progress */
export const fetchRefreshProgress = () => async (dispatch: any, getState: any) => {
  try {
    const sellerId = sellerIDSelector();
    const refreshId = getState().salesProjection.refreshSalesProjectionId;
    const URL =
      `${AppConfig.BASE_URL_API}sellers/${sellerId}/perfect-stock/job/progress` +
      `?perfect_stock_job_id=${refreshId}`;
    const { data } = await axios.get(URL);

    if (data && data.progress) {
      if (data.status === 'completed') {
        dispatch(fetchSalesProjection({}));
        dispatch(setIsFetchingProgressForRefresh(false));
        dispatch(setRefreshSalesProjectionId(-1));
      } else {
        dispatch(setRefreshProgress(parseFloat(data.progress)));
      }
    }
  } catch (err) {
    dispatch(setIsFetchingProgressForRefresh(false));
    console.error('Error fetching progress for perfect stock', err);
  }
};
