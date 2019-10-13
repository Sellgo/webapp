import {
  SET_SELLER_AMAZON_MWS_AUTH,
  SET_AMAZON_MWS_AUTHORIZED,
  UPDATE_SELLER_AMAZON_MWS_AUTH,
  SET_SELLER_PROFILE_IMAGE,
  SET_SELLER_INFO,
  DELETE_SELLER_AMAZON_MWS_AUTH,
} from '../../constants/Settings';
import { setIn } from '../../utils/immutablity';
import get from 'lodash/get';

const initialState = {
  profile: {},
  amazonMWSAuth: [],
  profileImage: {},
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SELLER_AMAZON_MWS_AUTH:
      return setIn(state, 'amazonMWSAuth', action.payload);

    case DELETE_SELLER_AMAZON_MWS_AUTH:
      return setIn(
        state,
        'amazonMWSAuth',
        get(state, 'amazonMWSAuth').filter((mws: any) => mws.id !== action.payload)
      );

    case UPDATE_SELLER_AMAZON_MWS_AUTH:
      return setIn(state, 'amazonMWSAuth', [...get(state, 'amazonMWSAuth'), action.payload]);

    case SET_SELLER_PROFILE_IMAGE:
      return setIn(state, 'profileImage', action.payload);

    case SET_AMAZON_MWS_AUTHORIZED:
      return setIn(state, 'amazonMWSAuthorized', action.payload);

    case SET_SELLER_INFO:
      return setIn(state, 'profile', { ...get(state, 'profile'), ...action.payload });

    default:
      return state;
  }
};
