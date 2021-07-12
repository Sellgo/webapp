import { actionTypes } from '../../constants/SellerMap';
import { AnyAction } from 'redux';
import { setIn } from '../../utils/immutablity';

const INITIAL_STATE = {
  isLoadingSellers: false,
  sellersForMap: [],
  isLoadingSellerDetails: false,
  sellerDetails: [],
  showSellerDetailsCard: false,
};

const sellerMapReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.LOADING_SELLERS_FOR_MAP: {
      return setIn(state, 'isLoadingSellers', action.payload);
    }
    case actionTypes.SET_SELLERS_FOR_MAP: {
      return setIn(state, 'sellersForMap', action.payload);
    }
    case actionTypes.LOADING_SELLER_DETAILS_FOR_MAP: {
      return setIn(state, 'isLoadingSellerDetails', action.payload);
    }
    case actionTypes.SET_SELLER_DETAILS_FOR_MAP: {
      return setIn(state, 'sellerDetails', action.payload);
    }
    case actionTypes.SHOW_SELLER_DETAILS_CARD: {
      return setIn(state, 'showSellerDetailsCard', action.payload);
    }
    default: {
      return state;
    }
  }
};

export default sellerMapReducer;
