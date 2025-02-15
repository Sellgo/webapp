import {
  actionTypes,
  INITIAL_CENTER,
  INITIAL_ZOOM,
  SELLER_MAP_DEFAULT_FILTER,
  WORLD_MAP_BOUNDS,
} from '../../constants/SellerResearch/SellerMap';
import { AnyAction } from 'redux';
import { setIn } from '../../utils/immutablity';

const INITIAL_STATE = {
  isLoadingSellers: false,
  sellersForMap: [],

  isLoadingSellersListForMap: false,
  sellersListForMap: [],
  sellersListForMapPaginationInfo: {
    count: 0,
    current_page: 0,
    total_pages: 0,
  },

  sellerMapFilterData: SELLER_MAP_DEFAULT_FILTER,
  isLoadingSellerDetails: false,
  sellerDetails: [],
  showSellerDetailsCard: false,

  mapCenter: INITIAL_CENTER,
  mapBounds: WORLD_MAP_BOUNDS,
  mapZoom: INITIAL_ZOOM,

  mapMarketplace: {},
};

const sellerMapReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    /* =================================================== */
    /* ================ SELLER MAP FILTERS ================*/
    /* =================================================== */
    // State for setting seller map filter options
    case actionTypes.UPDATE_SELLER_MAP_FILTERS_DATA: {
      const { keyName, value } = action.payload;

      const updatedFilters = state.sellerMapFilterData.map((f: any) => {
        if (f.keyName === keyName) {
          return {
            ...f,
            value,
          };
        } else {
          return f;
        }
      });

      return setIn(state, 'sellerMapFilterData', updatedFilters);
    }

    case actionTypes.RESET_SELLER_MAP_FILTERS_DATA: {
      return setIn(state, 'sellerMapFilterData', SELLER_MAP_DEFAULT_FILTER);
    }

    case actionTypes.SET_SELLER_MAP_FILTERS_DATA: {
      return setIn(state, 'sellerMapFilterData', action.payload);
    }

    /* =================================================== */
    /* ================ MAIN MAP DISPLAY ================*/
    /* =================================================== */
    // State for the seller maps
    case actionTypes.LOADING_SELLERS_FOR_MAP: {
      return setIn(state, 'isLoadingSellers', action.payload);
    }
    case actionTypes.SET_SELLERS_FOR_MAP: {
      return setIn(state, 'sellersForMap', action.payload);
    }

    // State for setting map meta info
    case actionTypes.SET_COUNTRY_CENTER: {
      return setIn(state, 'mapCenter', action.payload);
    }
    case actionTypes.SET_MAP_BOUNDS: {
      return setIn(state, 'mapBounds', action.payload);
    }
    case actionTypes.SET_ZOOM_FOR_MAP: {
      return setIn(state, 'mapZoom', action.payload);
    }

    /* =================================================== */
    /* ================ MAIN MAP SELLERS LIST ================*/
    /* =================================================== */
    // State for the sellers list
    case actionTypes.IS_LOADING_SELLERS_LIST_FOR_MAP: {
      return setIn(state, 'isLoadingSellersListForMap', action.payload);
    }

    case actionTypes.SET_SELLERS_LIST_FOR_MAP: {
      return setIn(state, 'sellersListForMap', action.payload);
    }

    case actionTypes.SET_SELLERS_LIST_FOR_MAP_PAGINATION_INFO: {
      return setIn(state, 'sellersListForMapPaginationInfo', action.payload);
    }

    /* =================================================== */
    /* ================ SELLER DETAILS ON MAP ================*/
    /* =================================================== */

    // State for the loading Seller Details Card
    case actionTypes.LOADING_SELLER_DETAILS_FOR_MAP: {
      return setIn(state, 'isLoadingSellerDetails', action.payload);
    }
    case actionTypes.SET_SELLER_DETAILS_FOR_MAP: {
      return setIn(state, 'sellerDetails', action.payload);
    }
    case actionTypes.SHOW_SELLER_DETAILS_CARD: {
      return setIn(state, 'showSellerDetailsCard', action.payload);
    }

    case actionTypes.SET_MAP_MARKETPLACE: {
      return setIn(state, 'mapMarketplace', action.payload);
    }
    default: {
      return state;
    }
  }
};

export default sellerMapReducer;
