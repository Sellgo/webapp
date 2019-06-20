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
  amazonMWS: {
    seller_id: 0,
    marketplace_id: 'DJIW28394D',
    token: '',
  },
  success: false,
  loading: false,
  error: null,
});

export const SettingReducer = (state = initialState, action: any) => {
  let newState = null;
  let data = null;
  switch (action.type) {
    case FETCH_AUTH_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SET_BASIC_INFO_SELLER:
      data = action.data;
      newState = state.setIn(['profile', data.key], data.value);
      return newState;
    case SET_AMAZONE_MWS:
       data  = action.data ;
      newState = state.setIn(['amazonMWS', data.key], data.value);
      return newState;
    case UPDATE_BASIC_INFO_SELLER:
       data  = action.data ;
      newState = state.setIn(['success'], data.value);
      return newState;

    default:
      return state;
  }
};

export default SettingReducer;
