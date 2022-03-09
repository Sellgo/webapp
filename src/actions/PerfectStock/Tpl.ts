import axios from 'axios';

/* Config */
import { AppConfig } from '../../config';

/* Constants */
import { actionTypes } from '../../constants/PerfectStock/Tpl';

/* Interfaces */
import { CreateTplPayload } from '../../interfaces/PerfectStock/Tpl';
import { getTplActiveVendor } from '../../selectors/PerfectStock/Tpl';

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

/* Action to set active tpl vendor */
export const setTplActiveVendor = (payload: any) => {
  return {
    type: actionTypes.SET_TPL_ACTIVE_VENDOR,
    payload,
  };
};

export const isLoadingTplSkuData = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_TPL_SKU_DATA,
    payload,
  };
};

export const setTplSkuData = (payload: any) => {
  return {
    type: actionTypes.SET_TPL_SKU_DATA,
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
export const fetchTplVendors = () => async (dispatch: any) => {
  dispatch(isLoadingTplVendors(true));
  try {
    const sellerId = sellerIDSelector();
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/perfect-stock/vendor`;

    const { data } = await axios.get(URL);
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
export const createTplVendor = (payload: CreateTplPayload) => async (dispatch: any) => {
  try {
    const sellerId = sellerIDSelector();
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/perfect-stock/vendor`;

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

export const fetchTplSkuData = () => async (dispatch: any, getState: any) => {
  dispatch(isLoadingTplSkuData(true));
  try {
    const state = getState();
    const vendor = getTplActiveVendor(state);
    console.log(vendor);
    const sellerId = sellerIDSelector();
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/sku-tpl-data?vendor_id=1`;

    const { data } = await axios.get(URL);
    console.log(data);
    if (data) {
      dispatch(setTplSkuData(data.results));
    }
  } catch (err) {
    dispatch(setTplSkuData([]));
    console.error('Error fetching Tpl Sku Information', err);
  }
  dispatch(isLoadingTplSkuData(false));
};
