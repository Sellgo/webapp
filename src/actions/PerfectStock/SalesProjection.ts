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
// import { error, success } from '../../utils/notifications';
// import { downloadFile } from '../../utils/download';

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
  console.log(updatedSalesProjectionProducts);

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
      dispatch(setSalesProjectionResults(data));
    }
  } catch (err) {
    dispatch(setSalesProjectionResults([]));
    console.error('Error fetching sales estimation', err);
  }
  dispatch(isLoadingSalesProjection(false));
};

/* Action to fetch products database */
export const updateSalesProjectionProduct = (payload: SalesProjectionUpdatePayload) => async (
  dispatch: any
) => {
  dispatch(isLoadingSalesProjection(true));
  try {
    const sellerId = sellerIDSelector();
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/sales-projection/${payload.id}/update`;
    const { data } = await axios.patch(URL, payload.updatePayload);

    if (data) {
      dispatch(setSalesProjectionRow(data));
    }
  } catch (err) {
    dispatch(setSalesProjectionResults([]));
    console.error('Error updating sales estimation', err);
  }
  dispatch(isLoadingSalesProjection(false));
};
