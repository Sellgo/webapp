import axios from 'axios';

/* Config */
import { AppConfig } from '../../config';

/* Constants */
import { actionTypes } from '../../constants/PerfectStock/Tpl';

/* Interfaces */
import { CreateTplPayload } from '../../interfaces/PerfectStock/Tpl';

/* Selectors */
import { sellerIDSelector } from '../../selectors/Seller';

/* Action to set loading state for tpl */
export const isLoadingTplVendors = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_TPL_VENDORS,
    payload,
  };
};

/* Action to set tpl vendors results */
export const setTplVendors = (payload: any) => {
  return {
    type: actionTypes.SET_TPL_VENDORS,
    payload,
  };
};

// /* Action to set one row in sales projection table */
// export const setSalesProjectionRow = (payload: SalesProjectionProduct) => (
//   dispatch: any,
//   getState: any
// ) => {
//   const currentSalesProjectionProducts = getSalesProjectionResults(getState());
//   const updatedSalesProjectionProducts = currentSalesProjectionProducts.map(
//     (product: SalesProjectionProduct) => {
//       if (product.id === payload.id) {
//         return payload;
//       } else {
//         return product;
//       }
//     }
//   );
//   dispatch(setSalesProjectionResults(updatedSalesProjectionProducts));
// };

/*********** Async Actions ************************ */
/* Action to fetch products database */
export const fetchTpl = (payload?: any) => async (dispatch: any) => {
  try {
    const { page = 1, isExport = false, fileFormat = 'csv' } = payload;

    const sellerId = sellerIDSelector();

    const requestPayload: any = {
      page: page,
    };

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/sku-tpl-data`;

    if (isExport && fileFormat) {
      /* Handle Exports */
      // dispatch(exportProductDatabaseTable(requestPayload, fileFormat));
      return;
    }

    dispatch(isLoadingTplVendors(true));

    const { data } = await axios.get(URL, requestPayload);
    console.log(data);
    if (data) {
      dispatch(setTplVendors(data.results));
    }
  } catch (err) {
    dispatch(setTplVendors([]));
    console.error('Error fetching Tpl', err);
  }
  dispatch(isLoadingTplVendors(false));
};

/* Action to fetch products database */
export const createTpl = (payload: CreateTplPayload) => async (dispatch: any) => {
  try {
    const sellerId = sellerIDSelector();
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/sku-tpl-data`;

    dispatch(isLoadingTplVendors(true));

    const { data } = await axios.post(URL, payload);
    console.log(data);
    // if (data) {
    //   dispatch(setTplVendors(data.results));
    // }
  } catch (err) {
    dispatch(setTplVendors([]));
    console.error('Error fetching Tpl', err);
  }
  dispatch(isLoadingTplVendors(false));
};
