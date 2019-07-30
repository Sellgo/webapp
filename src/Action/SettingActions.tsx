import axios from 'axios';
import {
  SET_BASIC_INFO_SELLER,
  UPDATE_BASIC_INFO_SELLER,
  GET_BASIC_INFO_SELLER,
  SET_AMAZON_MWS, UPLOAD_SELLER_IMAGE, localStorageKeys, GET_AMAZON_MWS, PATCH_AMAZON_MWS, SIDE_BAR_EXPANDED,
} from '../constant/constant';
import { AppConfig  } from '../config';

export interface Field {
  key: string;
  value: any;
}

export interface SellField {
  name: string;
  id: string;
  email: string;
  auth0_user_id: string;
  firstName?: string;
  lastName?: string;
  cdate?: string;
}

export interface MWSinfo {
  marketplace_id: string;
  amazon_seller_id: string;
  seller_id: string;
  token: string;
  id: any;
}

const headers = {
  Authorization: `Bearer ${localStorage.getItem('idToken')}`,
  'Content-Type': 'application/json',
};

export const getMWSAuth = () => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');

  const url = AppConfig.BASE_URL_API + `seller/${sellerID}/mws_auth/`;
  return axios({
    method: 'GET',
    url,
    headers,
  })
    .then(json => {
      dispatch(reduceGetMWSAuth(json.data));
    })
    .catch(() => {
    });

};

export const deleteMWSAuth = (mws_auth_id: any) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  const url = AppConfig.BASE_URL_API + `mws_auth/`;
  const formData = new FormData();
  formData.append('id', mws_auth_id);
  formData.append('status', 'inactive');
  return axios({
    method: 'PATCH',
    url,
    data: formData,
    headers,
  })
    .then(json => {
      dispatch(reduceDeleteMWSAuth(json.data));
    })
    .catch(() => {
    });

};

export const getIsMWSAuthorized = () => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  const url = AppConfig.BASE_URL_API + `seller/${sellerID}/is_mws_authorized/`;
  return axios({
    method: 'GET',
    url,
    headers,
  })
    .then(json => {
      localStorage.setItem(localStorageKeys.isMWSAuthorized, json.data.is_mws_authorized);
    })
    .catch(() => {
    });

};

export const postSellerImage = (imageType: string, imagePath: any) => (dispatch: any) => {
  const formData = new FormData();
  formData.append('image_type', imageType);
  formData.append('image', imagePath);
  const sellerID = localStorage.getItem('userId');

  return axios({
    method: 'POST',
    url: AppConfig.BASE_URL_API + `image/${sellerID}/`,
    data: formData,
    headers,
  })
    .then(json => {
      dispatch(reduceUpdatedImage(json.data));
    })
    .catch(() => {
    });

};

export const getSellerImage = () => (dispatch: any) => {

  const formData = new FormData();
  const sellerID = localStorage.getItem('userId');

  return axios({
    method: 'GET',
    url: AppConfig.BASE_URL_API + `image/${sellerID}/`,
    data: formData,
    headers,
  })
    .then(json => {
      dispatch(reduceUpdatedImage(json.data));
    })
    .catch(() => {
    });
};

export const updateBasicInfoSeller = (data: SellField) => (dispatch: any) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('id', data.id);
  formData.append('email', data.email);
  formData.append('auth0_user_id', data.auth0_user_id);

  return axios({
    method: 'PATCH',
    url: AppConfig.BASE_URL_API + `seller/`,
    data: formData,
    headers,
  })
    .then(json => {
      dispatch({
        type: UPDATE_BASIC_INFO_SELLER,
        data: {key: 'success', value: true},
      });
      setTimeout(() => {
        dispatch({
          type: UPDATE_BASIC_INFO_SELLER,
          data: {key: 'success', value: false},
        });
      }, 1000);

      return json.data;
    })
    .catch(() => {
    });
};

export const getBasicInfoSeller = () => (dispatch: any) => {
  const userId = localStorage.getItem('userId');
  const email = localStorage.getItem('userEmail');
  const auth0Id = localStorage.getItem('auth0_user_id');
  const url = email !== '' ? `?email=${email}` : `?auth0_user_id=${auth0Id}`;
  if (headers.Authorization === 'Bearer null') {
    headers.Authorization = `Bearer ${localStorage.getItem('idToken')}`;
  }
  return axios({
    method: 'get',
    url: AppConfig.BASE_URL_API + `seller${url}`,
    headers,
  })
    .then(json => {
      dispatch(getBasicInfoSellerDispatch(json.data));
      return json.data;
    })
    .catch(error => {
    });
};

export const updateAmazonMWS = (id: string, data: MWSinfo) => (dispatch: any) => {
  const formData = new FormData();
  formData.append('marketplace_id', data.marketplace_id);
  formData.append('amazon_seller_id', data.amazon_seller_id);
  formData.append('token', data.token);

  return axios({
    method: 'POST',
    url: AppConfig.BASE_URL_API + `seller/${id}/mws_auth/`,
    data: formData,
    headers,
  })
    .then(json => {
      dispatch({
        type: UPDATE_BASIC_INFO_SELLER,
        data: {key: 'success', value: true},
      });
      setTimeout(() => {
        dispatch({
          type: UPDATE_BASIC_INFO_SELLER,
          data: {key: 'success', value: false},
        });
      }, 1000);

      return json.data;
    })
    .catch(error => {
    });
};

export const reduceUpdatedImage = (data: any) => ({
  type: UPLOAD_SELLER_IMAGE,
  data,
});

export const reduceGetMWSAuth = (data: any) => ({
  type: GET_AMAZON_MWS,
  data,
});

export const reduceDeleteMWSAuth = (data: any) => ({
  type: PATCH_AMAZON_MWS,
  data,
});

export const getBasicInfoSellerDispatch = (data: any) => ({
  type: GET_BASIC_INFO_SELLER,
  data,
});

export const setBasicInfoSeller = (data: Field) => ({
  type: SET_BASIC_INFO_SELLER,
  data,
});

export const setAmazonMWS = (data: Field) => ({
  type: SET_AMAZON_MWS,
  data,
});

export const sideBarExpanded = (data: Field) => ({
  type: SIDE_BAR_EXPANDED,
  data,
});
