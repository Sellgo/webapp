import {
  SET_BASIC_INFO_SELLER,
  UPDATE_BASIC_INFO_SELLER,
  FETCH_AUTH_BEGIN,
  SET_AMAZON_MWS,
  GET_BASIC_INFO_SELLER,
  SET_PAGE_HISTORY_COUNTER,
  UPLOAD_SELLER_IMAGE,
  GET_AMAZON_MWS,
  SIDE_BAR_EXPANDED,
  PATCH_AMAZON_MWS,
} from '../constant/constant';
import { MWSinfo, SellField } from '../Action/SettingActions';
import { object } from 'prop-types';

const initialState = {
  profile: {
    name: '',
    firstName: '',
    lastName: '',
    email: '',
    auth0_user_id: '',
    id: '0',
    cdate: '',
  },
  amazonMWS: {
    seller_id: '',
    amazon_seller_id: '',
    marketplace_id: '',
    token: '',
    id: '',
    status: '',
  },
  amazonMWSFromServer: [
    {
      seller_id: '',
      amazon_seller_id: '',
      marketplace_id: '',
      token: '',
      id: '',
      status: '',
    },
  ],
  pageHistoryCanGoForward: 0,
  updatedImage: {},
  success: false,
  loading: false,
  error: null,
  isMWSAuthorized: false,
  isSideBarExpanded: false,
};

export const SettingReducer = (state = initialState, action: any) => {
  const newState = { ...state };
  let data = null;
  switch (action.type) {
    case SIDE_BAR_EXPANDED:
      data = action.data;
      newState.isSideBarExpanded = data.value;
      return newState;
    case FETCH_AUTH_BEGIN:
      newState.loading = true;
      newState.error = null;
      return newState;
    case SET_BASIC_INFO_SELLER:
      data = action.data;
      const key: keyof SellField = data.key;
      const profile = { ...newState.profile };
      profile[key] = data.value;
      newState.profile = profile;
      return newState;
    case SET_AMAZON_MWS:
      data = action.data;
      const newKey: keyof MWSinfo = data.key;
      const amazonMWS = { ...newState.amazonMWS };
      amazonMWS[newKey] = data.value;
      newState.amazonMWS = amazonMWS;
      return newState;
    case UPDATE_BASIC_INFO_SELLER:
      data = action.data;
      newState.success = data.value;
      return newState;
    case GET_BASIC_INFO_SELLER:
      const { name, cdate, id, email, auth0_user_id } = action.data;
      const firstName = name ? name.substr(0, name.indexOf(' ')) : '';
      const lastName = name ? name.substr(name.indexOf(' ') + 1) : '';
      const sellerData = {
        cdate,
        id,
        email,
        firstName,
        lastName,
        name,
        auth0_user_id,
      };
      newState.profile = sellerData;
      return newState;
    case SET_PAGE_HISTORY_COUNTER:
      data = action.data;
      newState.pageHistoryCanGoForward = data;
      return newState;
    case UPLOAD_SELLER_IMAGE:
      data = action.data;
      newState.updatedImage = data;
      return newState;
    case GET_AMAZON_MWS:
      data = action.data;
      if (data.length > 0) {
        // if (data[0].status !== 'inactive') {
        newState.amazonMWSFromServer = data;
        return newState;
        // }
      }
      return state;
    case PATCH_AMAZON_MWS:
      // data = action.data;
      data = {
        seller_id: '',
        amazon_seller_id: '',
        marketplace_id: '',
        token: '',
        id: '',
        status: '',
      };
      const amazonMWSfromServer = [...newState.amazonMWSFromServer];
      for (const index in amazonMWSfromServer) {
        if (amazonMWSfromServer[index].id === action.data.id) {
          amazonMWSfromServer[index].status = 'inactive';
        }
      }
      newState.amazonMWSFromServer = amazonMWSfromServer;
      newState.amazonMWS = data;
      return newState;
    default:
      return state;
  }
};

export default SettingReducer;
