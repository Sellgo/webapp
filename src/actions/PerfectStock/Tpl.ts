import axios from 'axios';

/* Config */
import { AppConfig } from '../../config';

/* Constants */
import { actionTypes } from '../../constants/PerfectStock/Tpl';

/* Interfaces */
import { TplVendor, UpdateTplSkuPayload } from '../../interfaces/PerfectStock/Tpl';
import { getTplActiveVendor, getTplSkuData } from '../../selectors/PerfectStock/Tpl';

/* Selectors */
import { sellerIDSelector } from '../../selectors/Seller';
import { error, success } from '../../utils/notifications';

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
    if (data) {
      dispatch(setTplVendors(data.results));
      if (data && data.length > 0) {
        dispatch(setTplActiveVendor(data[0]));
      }
    }
  } catch (err) {
    dispatch(setTplVendors([]));
    console.error('Error fetching Tpl', err);
  }
  dispatch(isLoadingTplVendors(false));
};

/* Action to fetch products database */
export const createUpdateTplVendor = (payload: TplVendor) => async (dispatch: any) => {
  dispatch(isLoadingTplVendors(true));

  try {
    const sellerId = sellerIDSelector();
    let data;

    if (payload.id) {
      const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/perfect-stock/vendor/${payload.id}`;
      const res = await axios.patch(URL, payload);
      data = res.data;
    } else {
      const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/perfect-stock/vendor`;
      const res = await axios.post(URL, payload);
      data = res.data;
    }

    if (data) {
      success('Perfect Stock Vendor Saved');
      dispatch(fetchTplVendors());
    }
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

export const updateTplSkuData = (payload: UpdateTplSkuPayload) => async (
  dispatch: any,
  getState: any
) => {
  try {
    const sellerId = sellerIDSelector();
    const state = getState();

    /* Update the redux state first */
    const oldTplSkuData = getTplSkuData(state);
    const updatedTplSkuData = oldTplSkuData.map((sku: any) => {
      if (sku.id === payload.id) {
        return {
          ...sku,
          ...payload,
        };
      } else {
        return sku;
      }
    });
    dispatch(setTplSkuData(updatedTplSkuData));

    /* Revert changes if error */
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/sku-tpl-data/${payload.id}`;
    const { status } = await axios.patch(URL, payload);
    if (status === 200) {
      success('Successfully updated.');
    } else {
      dispatch(setTplSkuData(oldTplSkuData));
      error('Failed to update.');
    }
  } catch (err) {
    dispatch(setTplSkuData([]));
    console.error('Error fetching Tpl Sku Information', err);
  }
};
