import { Map } from 'immutable';
import {
  SET_BASIC_INFO_SELLER,
  UPDATE_BASIC_INFO_SELLER,
  FETCH_AUTH_BEGIN,
  SET_AMAZONE_MWS,
} from '../constant/constant';

const initialState = Map({
  profile: {
    name: '',
    firstName: '',
    lastName: '',
    email: '',
    auth0_user_id: '',
    id: 0,
  },
  amazoneMWS: {
    seller_id: 0,
    marketplace_id: 'DJIW28394D',
    token: '',
  },
  loading: false,
  error: {},
});

export const SettingReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_AUTH_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SET_BASIC_INFO_SELLER:
      const { data } = action;
      const { key, value } = data;
      const newState = state.setIn(['profile', key], value);
      return newState;
    case SET_AMAZONE_MWS:
      const { aData } = action;
      const newMWS = state.setIn(['amazoneMWS', aData.key], aData.value);
      return newMWS;

    default:
      return state;
  }
};

export default SettingReducer;
