import axios from 'axios';
import { URLS, SET_SELLERS, SET_PRODUCTS } from '../constant/constant';

export interface Supplier {
  contact: string;
  description: string;
  email: string;
  freight_fee: string;
  id: any;
  item_active_count: any;
  item_total_count: any;
  name: string;
  phone: string;
  rate: string;
  seller_id: any;
  status: string;
  supplier_group_id: any;
  timezone: string;
  upcharge_fee: string;
  website: string;
  xid: string;
}
export interface Product {
  contact: string;
  description: string;
  email: string;
  freight_fee: string;
  id: any;
  item_active_count: any;
  item_total_count: any;
  name: string;
  phone: string;
  rate: string;
  seller_id: any;
  status: string;
  supplier_group_id: any;
  timezone: string;
  upcharge_fee: string;
  website: string;
  xid: string;
}

const headers = {
  Authorization: `Bearer ${localStorage.getItem('idToken')}`,
  'Content-Type': 'application/json',
};

export const getSellers = () => (dispatch: any) => {
  // const userID = localStorage.getItem('userId');
  return axios({
    method: 'get',
    url: URLS.BASE_URL_API + 'seller/1000000001/supplier/',
    headers,
  })
    .then(json => {
      console.log(json.data);
      dispatch(setSellers(json.data));
      // return json.data;
    })
    .catch(error => { });
};

export const getProducts = (sellerID: string) => (dispatch: any) => {
  // const userID = localStorage.getItem('userId');
  return axios({
    method: 'get',
    url: URLS.BASE_URL_API + 'seller/' + sellerID + '/supplier/',
    headers,
  })
    .then(json => {
      console.log(json.data);
      dispatch(setProducts(json.data));
      // return json.data;
    })
    .catch(error => { });
};

export const setSellers = (data: {}) => ({
  type: SET_SELLERS,
  data,
});

export const setProducts = (data: {}) => ({
  type: SET_PRODUCTS,
  data,
});
