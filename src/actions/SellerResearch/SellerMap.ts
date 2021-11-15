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
import {
  SellerMapPayload,
  Location,
  SellersListPayload,
  SellersListPaginationInfo,
  UpdateSellerMapFilterPayload,
} from '../../interfaces/SellerResearch/SellerMap';
import { MarketplaceOption } from '../../interfaces/SellerResearch/SellerDatabase';

/* Selectors */
import { sellerIDSelector } from '../../selectors/Seller';

/* Utils */
import { calculateBoundsForMap } from '../../utils/map';

/* Notifications */
import { error, success } from '../../utils/notifications';
import { getSellerMapFilterData } from '../../selectors/SellerResearch/SellerMap';
import { F_TYPES } from '../../constants/SellerResearch';

/* =================================================== */
/* ================ SELLER MAP FILTERS ================*/
/* =================================================== */
/* Action to update the seller map filter options */
export const updateSellerMapFilterOptions = (payload: UpdateSellerMapFilterPayload) => {
  return {
    type: actionTypes.UPDATE_SELLER_MAP_FILTERS_DATA,
    payload,
  };
};

/* Action to reset the seller map filters data */
export const resetSellerMapFiltersData = () => {
  return {
    type: actionTypes.RESET_SELLER_MAP_FILTERS_DATA,
  };
};

/* Action to set the seller map filters data */
export const setSellerMapFiltersData = (payload: any) => {
  return {
    type: actionTypes.SET_SELLER_MAP_FILTERS_DATA,
    payload,
  };
};

/* =================================================== */
/* ================ MAIN MAP DISPLAY ================*/
/* =================================================== */

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

/* =================================================== */
/* ================ MAIN MAP SELLERS LIST ================*/
/* =================================================== */

/* Action to set loaing state for sellers list for map */
export const isLoadingSellersListForMap = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_SELLERS_LIST_FOR_MAP,
    payload,
  };
};

/* Action to set sellers list for map */
export const setSellersListForMap = (payload: any[]) => {
  return {
    type: actionTypes.SET_SELLERS_LIST_FOR_MAP,
    payload,
  };
};

/* Action to set sellers list for map pagination info */
export const setSellersListForMapPaginationInfo = (payload: SellersListPaginationInfo) => {
  return {
    type: actionTypes.SET_SELLERS_LIST_FOR_MAP_PAGINATION_INFO,
    payload,
  };
};

/* =================================================== */
/* ================ SELLER DETAILS ON MAP ================*/
/* =================================================== */

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

/* Action to set marketplace info for seller map */
export const setSellerDatabaseMarketplace = (payload: MarketplaceOption) => {
  return {
    type: actionTypes.SET_MAP_MARKETPLACE,
    payload,
  };
};

/* Action to prepare the payload for query */
export const parseFilters = (sellerDatabaseFilter: any) => {
  let filterQuery = '';

  sellerDatabaseFilter.forEach((filterData: any) => {
    const { keyName, type, value } = filterData;

    if (type === F_TYPES.TEXT) {
      if (value) {
        filterQuery += `&${keyName}=${encodeURIComponent(value)}`;
      }
    }

    if (type === F_TYPES.COUNTRY) {
      if (value && value !== 'All Countries') {
        filterQuery += `&${keyName}=${value}`;
      }
    }

    if (type === F_TYPES.STATE) {
      if (value && value !== 'All States') {
        filterQuery += `&${keyName}=${value}`;
      }
    }

    if (type === F_TYPES.MARKETPLACE) {
      if (value.value) {
        // encode URI is necessary to escape '&' in values for categories
        filterQuery += `&${keyName}=${value.value}`;
      }
    }

    if (type === F_TYPES.INPUT_INCLUDE_EXCLUDE) {
      const includes = value.include
        ? `&include_${keyName}=${encodeURIComponent(value.include)}`
        : '';
      const excludes = value.exclude
        ? `&exclude_${keyName}=${encodeURIComponent(value.exclude)}`
        : '';
      filterQuery += `${includes}${excludes}`;
    }

    if (type === F_TYPES.MIN_MAX) {
      const min = value.min ? `&${keyName}_min=${value.min}` : '';
      const max = value.max ? `&${keyName}_max=${value.max}` : '';
      filterQuery += `${min}${max}`;
    }

    if (type === F_TYPES.MIN_MAX_PERIOD) {
      if (value.period) {
        const min = value.min ? `&${keyName}_${value.period}_min=${value.min}` : '';
        const max = value.max ? `&${keyName}_${value.period}_max=${value.max}` : '';
        filterQuery += `${min}${max}`;
      }
    }

    if (type === F_TYPES.GROWTH_COUNT_FILTER || type === F_TYPES.GROWTH_PERCENT_FILTER) {
      if (value.period) {
        const min = value.min ? `&${value.period}_min=${value.min}` : '';
        const max = value.max ? `&${value.period}_max=${value.max}` : '';
        filterQuery += `${min}${max}`;
      }
    }

    if (type === F_TYPES.MIN_MAX_PERIOD_REVIEW) {
      if (value.type) {
        const min = value.min ? `&${value.type}_${value.period}_min=${value.min}` : '';
        const max = value.max ? `&${value.type}_${value.period}_max=${value.max}` : '';
        filterQuery += `${min}${max}`;
      }
    }

    if (type === F_TYPES.CATEGORIES) {
      if (value && value.length > 0) {
        const categories = value.join('|');
        filterQuery += `&${keyName}=${encodeURIComponent(categories)}`;
      }
    }
  });

  return filterQuery;
};
/* ================= Async actions =========================== */

/* Action for fetching sellers for map */
export const fetchSellersForMap = (payload: SellerMapPayload) => async (
  dispatch: any,
  getState: any
) => {
  const sellerId = sellerIDSelector();

  const { resetMap = false, enableLoader = true } = payload;

  try {
    // if reset map is hit
    if (resetMap) {
      dispatch(setSellersForMap([]));
      dispatch(setLoadingSellersForMap(false));
      dispatch(setMapCenter(INITIAL_CENTER));
      dispatch(setMapZoom(INITIAL_ZOOM));
      dispatch(resetSellerMapFiltersData());
      return;
    }

    const allFiltersData = getSellerMapFilterData(getState());
    const resourcePath = parseFilters(allFiltersData);

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/merchantmaps/search?${resourcePath}`;

    dispatch(setLoadingSellersForMap(enableLoader));

    const country = allFiltersData && allFiltersData.find((f: any) => f.keyName === 'country');
    const state = allFiltersData && allFiltersData.find((f: any) => f.keyName === 'state');

    const response = await axios.get(URL);

    if (response && response.data) {
      const { data } = response;
      const { mapCenter, mapZoom } = calculateBoundsForMap(country.value, state.value);

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

/* Action to fetch sellers list for map */
export const fetchSellersListForMap = (payload: SellersListPayload) => async (
  dispatch: any,
  getState: any
) => {
  try {
    const {
      page = 1,
      sort = 'seller_id',
      sortDir = 'asc',
      enableLoader = true,
      isWholesale = true,
      perPage = 20,
    } = payload;

    const sellerId = sellerIDSelector();

    const pagination = `page=${page}&per_page=${perPage}`;
    const sorting = `ordering=${sortDir === 'desc' ? `-${sort}` : sort}`;
    const sellerType = `seller_type=${isWholesale ? 'wholesale' : 'private_label'}`;

    const allFiltersData = getSellerMapFilterData(getState());
    const filtersPath = parseFilters(allFiltersData);

    const resourcePath = `${pagination}&${sorting}&${sellerType}${filtersPath}&seller_maps=true`;

    dispatch(isLoadingSellersListForMap(enableLoader));

    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/merchants-database?${resourcePath}`;

    const { data } = await axios.get(URL);
    const { results, ...paginationInfo } = data;

    if (data) {
      dispatch(setSellersListForMap(results));
      dispatch(setSellersListForMapPaginationInfo(paginationInfo));
      dispatch(isLoadingSellersListForMap(false));
    } else {
      dispatch(setSellersListForMap([]));
      dispatch(setSellersListForMapPaginationInfo({ total_pages: 0, current_page: 0, count: 0 }));
      dispatch(isLoadingSellersListForMap(false));
    }
  } catch (err) {
    console.error('Unable to fetch sellers list for map', err);
    dispatch(setSellersListForMap([]));
    dispatch(setSellersListForMapPaginationInfo({ total_pages: 0, current_page: 0, count: 0 }));
    dispatch(isLoadingSellersListForMap(false));
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
