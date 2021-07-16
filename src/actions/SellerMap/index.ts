import axios from 'axios';

/* Config */
import { AppConfig } from '../../config';

/* Constants */
import {
  actionTypes,
  INITIAL_CENTER,
  COUNTRY_DROPDOWN_LIST,
  STATES_DROPDOWN_LIST,
} from '../../constants/SellerMap';

/* Interfaces */
import { SellerMapPayload, Location } from '../../interfaces/SellerMap';

/* Selectors */
import { sellerIDSelector } from '../../selectors/Seller';

/* Notifications */
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

/* Action to set country center */
export const setCountryCenter = (payload: Location) => {
  return {
    type: actionTypes.SET_COUNTRY_CENTER,
    payload,
  };
};

/* ================= Async actions =========================== */

/* Action for fetching sellers for map */
export const fetchSellersForMap = (payload: SellerMapPayload) => async (dispatch: any) => {
  const sellerId = sellerIDSelector();

  const { resetMap = false, state = '', zipCode = '', maxCount = 1000, country = 'US' } = payload;

  try {
    // if reset map is hit
    if (resetMap) {
      dispatch(setSellersForMap([]));
      dispatch(setLoadingSellersForMap(false));
      dispatch(setCountryCenter(INITIAL_CENTER));
      return;
    }

    let queryString = '';

    if (state) {
      queryString += `&state=${state}`;
    }

    if (zipCode) {
      queryString += `&zip_code=${zipCode}`;
    }

    if (country) {
      queryString += `&country=${country}`;
    }

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/merchantmaps/search?max_count=${maxCount}${queryString}`;
    dispatch(setLoadingSellersForMap(true));
    const response = await axios.get(URL);

    // if us state is present
    if (state && country === 'US') {
      const findCenterForState = STATES_DROPDOWN_LIST.find((usState: any) => {
        return usState.code === state;
      }).center;

      if (findCenterForState) {
        dispatch(setCountryCenter(findCenterForState));
      } else {
        dispatch(setCountryCenter(INITIAL_CENTER));
      }
    }
    // non-us states only filter by country
    else {
      // find the center for the country selected and dispatch the center
      const findCenterForCountry = COUNTRY_DROPDOWN_LIST.find((countryDetails: any) => {
        return countryDetails.code === country;
      }).center;
      if (findCenterForCountry) {
        dispatch(setCountryCenter(findCenterForCountry));
      } else {
        dispatch(setCountryCenter(INITIAL_CENTER));
      }
    }

    if (response && response.data) {
      success(`Found ${response.data.length} sellers`);
      dispatch(setSellersForMap(response.data));
      dispatch(setLoadingSellersForMap(false));
    }
  } catch (err) {
    dispatch(setCountryCenter(INITIAL_CENTER));
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
      const { status, data } = response;
      if (status === 400 && data && data.detail) {
        error(data.detail);
      }
    }
    dispatch(setShowSellerDetailsCard(false));
    dispatch(setSellerDetailsForMap({}));
    dispatch(setLoadingSellerDetailsForMap(false));
  }
};
