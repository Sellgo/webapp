import axios from 'axios';

/* Config */
import { AppConfig } from '../../config';

/* Constants */
import {
  actionTypes,
  INITIAL_CENTER,
  INITIAL_ZOOM,
  WORLD_MAP_BOUNDS,
} from '../../constants/SellerMap';

/* Interfaces */
import { SellerMapPayload, Location } from '../../interfaces/SellerMap';

/* Selectors */
import { sellerIDSelector } from '../../selectors/Seller';

/* Utils */
import { calculateBoundsForMap, calculateCenterForMap } from '../../utils/map';

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
export const setMapCenter = (payload: Location) => {
  return {
    type: actionTypes.SET_COUNTRY_CENTER,
    payload,
  };
};

/* Action to set the map bounds */
export const setMapBounds = (payload: any) => {
  return {
    type: actionTypes.SET_MAP_BOUNDS,
    payload,
  };
};

/* Action to set the map bounds */
export const setMapZoom = (payload: number) => {
  return {
    type: actionTypes.SET_ZOOM_FOR_MAP,
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
      dispatch(setMapCenter(INITIAL_CENTER));
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

    if (response && response.data) {
      const { coordinates, box } = response.data;

      if (!box || !box.ne || !box.sw) {
        dispatch(setMapZoom(INITIAL_ZOOM));
        dispatch(setMapBounds(WORLD_MAP_BOUNDS));
        dispatch(setMapCenter(calculateCenterForMap(country, state)));
      } else {
        const { mapCenter, newMapBounds, mapZoom } = calculateBoundsForMap(country, state, box);

        dispatch(setMapCenter(mapCenter));
        dispatch(setMapZoom(mapZoom));
        dispatch(setMapBounds(newMapBounds));
      }

      success(`Found ${coordinates.length} sellers`);
      dispatch(setSellersForMap(coordinates));
      dispatch(setLoadingSellersForMap(false));
    }
  } catch (err) {
    dispatch(setMapCenter(INITIAL_CENTER));
    dispatch(setMapZoom(INITIAL_ZOOM));
    dispatch(setMapBounds(WORLD_MAP_BOUNDS));

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
