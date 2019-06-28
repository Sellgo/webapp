import axios from 'axios';
import { URLS, SET_SELLERS, SET_PRODUCTS, SET_PRODUCT_ATTRIBUTES, SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION } from '../constant/constant';

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
  new_supplier_id: string;
}

export interface Product {
  id: any;
  product_id: any;
  supplier_id: any;
  synthesis_input_id: any;
  margin: string;
  profit_monthly: string;
  roi: string;
  sales_monthly: string;
}

const headers = {
  Authorization: `Bearer ${localStorage.getItem('idToken')}`,
  'Content-Type': 'application/json',
};

export const getSellers = () => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  console.log(sellerID);
  return axios({
    method: 'get',
    // url: URLS.BASE_URL_API + `seller/${sellerID}/supplier/`,
    url: URLS.BASE_URL_API + 'seller/1000000052/supplier/',
    headers,
  })
    .then(json => {
      console.log(json.data);
      dispatch(setSellers(json.data));
      // return json.data;
    })
    .catch(error => {
    });
};

export const saveSupplierNameAndDescription = (name: string, description: string) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  console.log(name);
  return axios({
    method: 'POST',
    // url: URLS.BASE_URL_API + `/seller/${sellerID}/supplier/`,
    url: URLS.BASE_URL_API + `seller/1000000052/supplier/`,
    data: {
      name: name,
      description: description,
      supplier_group_id: 1
    },
    headers,
  })
    .then(json => {
      console.log(json.data.id);
      dispatch(setsaveSupplierNameAndDescription({ new_supplier_id: json.data.id }));
      // return json.data;
    })
    .catch(error => {
    });
};

export const getProducts = (supplierID: string) => (dispatch: any) => {
  // const userID = localStorage.getItem('userId');
  const supplier = URLS.BASE_URL_API + 'supplier/' + supplierID + '/synthesis_data/';
  console.log(supplier);




  return axios({
    method: 'get',
    url: URLS.BASE_URL_API + 'supplier/' + supplierID + '/synthesis_data/',
    // url: URLS.BASE_URL_API + 'supplier/' + supplierID + '/synthesis_data/',
    headers,
  })
    .then(json => {
      console.log(JSON.stringify(json.data));

      // axios({
      //   method: 'get',
      //   url: URLS.BASE_URL_API + 'attribute/',
      //   headers,
      // })
      //   .then(json => {
      //     console.log(JSON.stringify(json.data));
      //     // dispatch(setProductAttributes(json.data));
      //     // return json.data;
      //   })
      //   .catch(error => {
      //   });

      // for (let dataObject of json.data) {
      //   console.log(dataObject.product_id);
      // getProductAttributes(dataObject.id);
      // const url = URLS.BASE_URL_API + 'product/' +  dataObject.product_id + '/attribute/';
      // console.log(url);
      // return axios({
      //   method: 'get',
      //   url: URLS.BASE_URL_API + 'product/' + dataObject.product_id + '/attribute/',
      //   headers,
      // })
      //   .then(json => {
      //     console.log(JSON.stringify(json.data));
      //     // dispatch(setProductAttributes(json.data));
      //     // return json.data;
      //   })
      //   .catch(error => {
      //   });
      // }
      dispatch(setProducts(json.data));
      // return json.data;
    })
    .catch(error => {
    });
};
export const getProductAttributes = (productID: string) => (dispatch: any) => {
  // api/product/3000000065/attribute/
  const url = URLS.BASE_URL_API + 'product/' + productID + '/attribute/';
  console.log(url);
  return axios({
    method: 'get',
    url: URLS.BASE_URL_API + 'product/' + productID + '/attribute/',
    headers,
  })
    .then(json => {
      console.log(json.data);
      // dispatch(setProductAttributes(json.data));
      // return json.data;
    })
    .catch(error => {
    });
};
export const trackProduct = (productID: string, productTrackGroupID: string) => (dispatch: any) => {
  // api/seller/(?P<seller_id>[0-9]+)/track/product/
  const sellerID = localStorage.getItem('userId');
  console.log(productID);
  const data = {
    seller_id: sellerID,
    product_track_group_id: 2,
    product_id: productID,
  };
  return axios({
    method: 'POST',
    url: URLS.BASE_URL_API + `seller/${sellerID}/track/product`,
    data,
    headers,
  })
    .then(json => {
      console.log(json.data);
      return json.data;
    })
    .catch(error => {
    });
};

export const setSellers = (data: {}) => ({
  type: SET_SELLERS,
  data,
});

export const setProducts = (data: {}) => ({
  type: SET_PRODUCTS,
  data,
});
export const setProductAttributes = (data: {}) => ({
  type: SET_PRODUCT_ATTRIBUTES,
  data,
});
export const setsaveSupplierNameAndDescription = (data: {}) => ({
  type: SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION,
  data,
});
