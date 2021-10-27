import {
  actionTypes,
  INITIAL_CENTER,
  INITIAL_ZOOM,
  WORLD_MAP_BOUNDS,
} from '../../constants/SellerResearch/SellerMap';
import { AnyAction } from 'redux';
import { setIn } from '../../utils/immutablity';

const INITIAL_STATE = {
  isLoadingSellers: false,
  sellersForMap: [],

  isLoadingSellersListForMap: false,
  sellersListForMap: [],

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
    // State for the seller maps
    case actionTypes.LOADING_SELLERS_FOR_MAP: {
      return setIn(state, 'isLoadingSellers', action.payload);
    }
    case actionTypes.SET_SELLERS_FOR_MAP: {
      return setIn(state, 'sellersForMap', action.payload);
    }

    // State for the sellers list
    case actionTypes.IS_LOADING_SELLERS_LIST_FOR_MAP: {
      return setIn(state, 'isLoadingSellersListForMap', action.payload);
    }

    case actionTypes.SET_SELLERS_LIST_FOR_MAP: {
      return setIn(state, 'sellersListForMap', action.payload);
    }

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
    case actionTypes.SET_MAP_MARKETPLACE: {
      return setIn(state, 'mapMarketplace', action.payload);
    }
    default: {
      return state;
    }
  }
};

export default sellerMapReducer;
