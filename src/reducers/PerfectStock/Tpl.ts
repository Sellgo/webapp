import { AnyAction } from 'redux';
import { setIn } from '../../utils/immutablity';

import { actionTypes } from '../../constants/PerfectStock/Tpl';

const INITIAL_STATE = {
  isLoadingTplVendors: false,
  tplVendors: [],
};

const tplReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.IS_LOADING_TPL_VENDORS: {
      return setIn(state, 'isLoadingSalesProjection', action.payload);
    }

    case actionTypes.SET_TPL_VENDORS: {
      return setIn(state, 'tplVendors', action.payload);
    }

    default: {
      return state;
    }
  }
};

export default tplReducer;
