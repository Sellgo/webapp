import axios from 'axios';
import { AppConfig } from '../../config';
import { actionTypes } from '../../constants/SellerMap';
import { SellerMapPayload } from '../../interfaces/SellerMap';
import { sellerIDSelector } from '../../selectors/Seller';
import { error, success } from '../../utils/notifications';

/* Action Creator for setting loading state for sellers on map */
export const setLoadingSellersForMap = (payload: boolean) => {
  return {
    type: actionTypes.LOADING_SELLERS_FOR_MAP,
    payload,
  };
};

/* Action Creator for setting seller data state  on map */
export const setSellersForMap = (payload: any) => {
  return {
    type: actionTypes.SET_SELLERS_FOR_MAP,
    payload,
  };
};

/* Action Creator for setting loading state for sellers details on map */
export const setLoadingSellerDetailsForMap = (payload: boolean) => {
  return {
    type: actionTypes.LOADING_SELLER_DETAILS_FOR_MAP,
    payload,
  };
};

/* Action Creator for setting seller details on map */
export const setSellerDetailsForMap = (payload: any) => {
  return {
    type: actionTypes.SET_SELLER_DETAILS_FOR_MAP,
    payload,
  };
};

/* Action creator for setting show seller detals card state */
export const setShowSellerDetailsCard = (payload: boolean) => {
  return {
    type: actionTypes.SHOW_SELLER_DETAILS_CARD,
    payload,
  };
};

/* ================= Async actions =========================== */

/* Action for fetching sellers for map */
export const fetchSellersForMap = (payload: SellerMapPayload) => async (dispatch: any) => {
  const sellerId = sellerIDSelector();

  const { resetMap = false, state = '', zipCode = '', maxCount = 1000 } = payload;

  try {
    // if reset map is hit
    if (resetMap) {
      dispatch(setSellersForMap([]));
      dispatch(setLoadingSellersForMap(false));
      return;
    }

    let queryString = '';

    if (state) {
      queryString += `&state=${state}`;
    }

    if (zipCode) {
      queryString += `&zip_code=${zipCode}`;
    }

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/merchantmaps/search?max_count=${maxCount}${queryString}`;
    dispatch(setLoadingSellersForMap(true));
    const response = await axios.get(URL);
    if (response && response.data) {
      success(`Found ${response.data.length} sellers`);
      dispatch(setSellersForMap(response.data));
      dispatch(setLoadingSellersForMap(false));
    }
  } catch (err) {
    console.error('Error fetching merchants for map', err);
    dispatch(setSellersForMap([]));
    dispatch(setLoadingSellersForMap(false));
  }
};

/* Action for fetching seller details on marker click */
export const fetchSellerDetailsForMap = (sellerInternalID: string) => async (dispatch: any) => {
  const sellerId = sellerIDSelector();
  try {
    sellerInternalID = encodeURI(sellerInternalID);
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/merchants/search?id=${sellerInternalID}`;
    dispatch(setLoadingSellerDetailsForMap(true));
    const response = await axios.get(URL);
    if (response && response.data) {
      const sellerDetails = response.data[0];
      dispatch(setSellerDetailsForMap(sellerDetails));
      dispatch(setLoadingSellerDetailsForMap(false));
    }
  } catch (err) {
    const { response } = err;
    if (response) {
      const { status } = response;
      if (status === 400) {
        error('Your Session Has Expired, Please Refresh and Try Again');
      }
    }
    dispatch(setShowSellerDetailsCard(false));
    dispatch(setSellerDetailsForMap({}));
    dispatch(setLoadingSellerDetailsForMap(false));
  }
};
