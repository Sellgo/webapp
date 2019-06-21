import axios from 'axios';
import {
  SET_BASIC_INFO_SELLER,
  UPDATE_BASIC_INFO_SELLER,
  GET_BASIC_INFO_SELLER,
  SET_AMAZONE_MWS,
  URLS,
} from '../constant/constant';

export type field = {
  key: string;
  value: any;
};

export type infoField = {
  name?: string;
  id: string;
  email?: string;
  auth0_user_id?: string;
  firstName?: String;
  lastName?: String;
};
export type infoMWS = {
  marketplace_id: string;
  seller_id: string;
  token: string;
};
const headers = {
  Authorization: `Bearer ${localStorage.getItem('idToken')}`,
  'Content-Type': 'application/json',
};

export const updateBasicInfoSeller = (data: infoField) => (dispatch: any) => {
  return axios({
    method: 'PATCH',
    url: URLS.BASE_URL_API + `seller/`,
    data: data,
    headers,
  })
    .then(json => {
      return json.data;
    })
    .catch(error => {});
};
export const getBasicInfoSeller = () => (dispatch: any) => {
  const url = `?email=${localStorage.getItem('userEmail')}`;
  const userId = localStorage.getItem('userId');
  return axios({
    method: 'get',
    url: URLS.BASE_URL_API + `seller${url}`,
    headers,
  })
    .then(json => {
      dispatch(setBasicInfoSeller({ key: 'id', value: userId }));
      return json.data;
    })
    .catch(error => {});
};

export const updateAmazoneMWS = (id: string, data: infoMWS) => (dispatch: any) => {
  return axios({
    method: 'POST',
    url: URLS.BASE_URL_API + `seller/${id}/mws_auth/`,
    data: data,
    headers,
  })
    .then(json => {
      return json.data;
    })
    .catch(error => {});
};

export const setBasicInfoSeller = (data: field) => ({
  type: SET_BASIC_INFO_SELLER,
  data,
});

export const setAmazoneMWS = (data: field) => ({
  type: SET_AMAZONE_MWS,
  aData: data,
});
