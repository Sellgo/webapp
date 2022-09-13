import { AnyAction } from 'redux';
import { setIn } from '../../utils/immutablity';

import { actionTypes } from '../../constants/PerfectStock/Tpl';

const INITIAL_STATE = {
  isLoadingTplVendors: false,
  tplVendors: [],
  isLoadingTplSkuData: false,
  tplSkuData: [],
  activeTplVendor: {},
};

const tplReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.IS_LOADING_TPL_VENDORS: {
      return setIn(state, 'isLoadingTplVendors', action.payload);
    }

    case actionTypes.SET_TPL_VENDORS: {
      return setIn(state, 'tplVendors', action.payload);
    }

    case actionTypes.SET_TPL_ACTIVE_VENDOR: {
      return setIn(state, 'activeTplVendor', action.payload);
    }

    case actionTypes.IS_LOADING_TPL_SKU_DATA: {
      return setIn(state, 'isLoadingTplSkuData', action.payload);
    }

    case actionTypes.SET_TPL_SKU_DATA: {
      return setIn(state, 'tplSkuData', action.payload);
    }

    default: {
      return state;
    }
  }
};

export default tplReducer;
