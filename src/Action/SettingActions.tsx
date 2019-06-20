import axios from 'axios';
import {
  SET_BASIC_INFO_SELLER,
  UPDATE_BASIC_INFO_SELLER,
  GET_BASIC_INFO_SELLER,
  SET_AMAZONE_MWS,
} from '../constant/constant';
import {  URLS } from '../config';

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
}

export interface MWSinfo {
  marketplace_id: string;
  seller_id: string;
  token: string;
}

const headers = {
  Authorization: `Bearer ${localStorage.getItem('idToken')}`,
  'Content-Type': 'application/json',
};

export const updateBasicInfoSeller = (data: SellField) => (dispatch: any) => {

  let form_data = new FormData();
  form_data.append('name', data.name);
  form_data.append('id', data.id);
  form_data.append('email', data.email);
  form_data.append('auth0_user_id', data.auth0_user_id);

  return axios({
    method: 'PATCH',
    url: URLS.BASE_URL_API + `seller/`,
    data: form_data,
    headers,
  })
    .then(json => {
      dispatch(      {
        type: UPDATE_BASIC_INFO_SELLER,
        data:{ key: 'success', value: true },
      });
      setTimeout(() => {
        dispatch(      {
          type: UPDATE_BASIC_INFO_SELLER,
          data:{ key: 'success', value: false },
        });
      }, 1000);

      return json.data;
    })
    .catch(() => {});
};
export const getBasicInfoSeller = () => (dispatch: any) => {
  const userId = localStorage.getItem('userId');
  const email = localStorage.getItem('userEmail');
  const userName = localStorage.getItem('userName');
  dispatch(setBasicInfoSeller({ key: 'email', value: email }));
  dispatch(setBasicInfoSeller({ key: 'firstName', value: userName }));

  const url = `?email=${email}`;

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

export const updateamazonMWS = (id: string, data: MWSinfo) => (dispatch: any) => {

  let form_data = new FormData();
  form_data.append('seller_id', data.seller_id);
  form_data.append('marketplace_id', data.marketplace_id);
  form_data.append('token', data.token);

  return axios({
    method: 'POST',
    url: URLS.BASE_URL_API + `seller/${id}/mws_auth/`,
    data: form_data,
    headers,
  })
    .then(json => {
      dispatch(      {
        type: UPDATE_BASIC_INFO_SELLER,
        data:{ key: 'success', value: true },
      });
      setTimeout(() => {
        dispatch(      {
          type: UPDATE_BASIC_INFO_SELLER,
          data:{ key: 'success', value: false },
        });
      }, 1000);

      return json.data;
    })
    .catch(error => {})
};


export const setBasicInfoSeller = (data: Field) => ({
  type: SET_BASIC_INFO_SELLER,
  data,
});

export const setamazonMWS = (data: Field) => ({
  type: SET_AMAZONE_MWS,
  data,
});
