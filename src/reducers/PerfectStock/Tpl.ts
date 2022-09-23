import { AnyAction } from 'redux';
import { setIn } from '../../utils/immutablity';

import { actionTypes, EMPTY_TPL_INBOUND } from '../../constants/PerfectStock/Tpl';

import { TIME_SETTING } from '../../constants/PerfectStock/OrderPlanning';

const INITIAL_STATE = {
  isLoadingTplVendors: false,
  tplVendors: [],
  isLoadingTplSkuData: false,
  tplSkuData: [],
  activeTplVendor: {},
  activeTplInbound: EMPTY_TPL_INBOUND,
  tplInbounds: [],
  isLoadingTplInbounds: false,
  timeSetting: TIME_SETTING.DAY,
  dateRange: {
    startDate: '',
    endDate: '',
  },
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

    case actionTypes.IS_LOADING_TPL_INBOUNDS: {
      return setIn(state, 'isLoadingTplInbounds', action.payload);
    }

    case actionTypes.SET_TPL_INBOUNDS: {
      return setIn(state, 'tplInbounds', action.payload);
    }

    case actionTypes.SET_ACTIVE_TPL_INBOUND: {
      return setIn(state, 'activeTplInbound', action.payload);
    }

    case actionTypes.SET_DATE_RANGE: {
      return setIn(state, 'dateRange', action.payload);
    }

    case actionTypes.SET_TIME_SETTING: {
      return setIn(state, 'timeSetting', action.payload);
    }

    default: {
      return state;
    }
  }
};

export default tplReducer;
