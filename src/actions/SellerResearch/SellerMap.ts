import axios from 'axios';

/* Config */
import { AppConfig } from '../../config';

/* Constants */
import {
  actionTypes,
  INITIAL_CENTER,
  INITIAL_ZOOM,
} from '../../constants/SellerResearch/SellerMap';

/* Interfaces */
import { SellerMapPayload, Location } from '../../interfaces/SellerResearch/SellerMap';
import { MarketplaceOption } from '../../interfaces/SellerResearch/SellerDatabase';

/* Selectors */
import { sellerIDSelector } from '../../selectors/Seller';

/* Utils */
import { calculateBoundsForMap } from '../../utils/map';

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

/* Action to set marketplace info for seller map */
export const setSellerDatabaseMarketplace = (payload: MarketplaceOption) => {
  return {
    type: actionTypes.SET_MAP_MARKETPLACE,
    payload,
  };
};
/* ================= Async actions =========================== */

/* Action for fetching sellers for map */
export const fetchSellersForMap = (payload: SellerMapPayload) => async (dispatch: any) => {
  const sellerId = sellerIDSelector();

  const {
    resetMap = false,
    marketplaceId = 'ATVPDKIKX0DER',
    country = 'US',
    state = '',
    zipCode = '',
    merchantName,
    categories = '',
    minMonthlyRevenue = '',
    maxMonthlyRevenue = '',
    launched = '',
    sellerType = '',
    maxCount = 1000,
  } = payload;

  try {
    // if reset map is hit
    if (resetMap) {
      dispatch(setSellersForMap([]));
      dispatch(setLoadingSellersForMap(false));
      dispatch(setMapCenter(INITIAL_CENTER));
      dispatch(setMapZoom(INITIAL_ZOOM));
      return;
    }

    let queryString = '';

    // add the marketplace
    if (marketplaceId) {
      queryString += `&marketplace_id=${marketplaceId}`;
    }

    // skip all countries since all countries means no countries filter
    if (country && country !== 'All Countries') {
      queryString += `&country=${country}`;
    }

    // skip all states since all states means no states filter
    if (state && state !== 'All States') {
      queryString += `&state=${state}`;
    }

    // add the zip code if us state
    if (zipCode) {
      queryString += `&zip_code=${zipCode}`;
    }

    // add the merchant name
    if (merchantName) {
      queryString += `&merchant_name=${merchantName}`;
    }

    // add the categories
    if (categories) {
      queryString += `&categories=${encodeURIComponent(categories)}`;
    }

    // min monthly revenue
    if (minMonthlyRevenue) {
      // add the monthly revenue
      queryString += `&sales_estimate_min=${minMonthlyRevenue}`;
    }

    // add max monthly revenue
    if (maxMonthlyRevenue) {
      queryString += `&sales_estimate_max=${maxMonthlyRevenue}`;
    }

    if (launched) {
      queryString += `&launched=${launched}`;
    }

    if (sellerType) {
      queryString += `&seller_type=${sellerType}`;
    }

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/merchantmaps/search?max_count=${maxCount}${queryString}`;

    dispatch(setLoadingSellersForMap(true));

    const response = await axios.get(URL);
    if (response && response.data) {
      const { data } = response;
      const { mapCenter, mapZoom } = calculateBoundsForMap(country, state);

      dispatch(setMapCenter(mapCenter));
      dispatch(setMapZoom(mapZoom));

      success(`Found ${data.length} sellers`);
      dispatch(setSellersForMap(data));
      dispatch(setLoadingSellersForMap(false));
    }
  } catch (err) {
    dispatch(setMapCenter(INITIAL_CENTER));
    dispatch(setMapZoom(INITIAL_ZOOM));
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
    const { response } = err as any;
    if (response) {
      const { status, data } = response;
      if (status === 400 && data && data.detail) {
        error(data.detail);
      } else if (status === 429 && data && data.message) {
        error(data.message);
      }
    }
    dispatch(setShowSellerDetailsCard(false));
    dispatch(setSellerDetailsForMap({}));
    dispatch(setLoadingSellerDetailsForMap(false));
  }
};
