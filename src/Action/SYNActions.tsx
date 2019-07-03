import axios from 'axios';
import {
  URLS, SET_SELLERS,
  SET_PRODUCTS,
  SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION,
  SET_PRODUCT_TRACK_DATA,
  SET_CHART_VALUES_1,
  SET_CHART_VALUES_2,
  SET_Product_Detail,
  SET_Product_Detail_Chart_Values,
  SET_Product_Detail_Chart_Values_2, SET_TIME_EFFICIENCY,
} from '../constant/constant';

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

export interface TimeEfficiency {
  saved_time: string;
  efficiency: string;
  id: any;
  seller_id: any;
}

export interface New_Supplier {
  new_supplier_id: any;
}

export interface Product {
  amazon_url: string;
  asin: string;
  id: number;
  image_url: string;
  last_syn: string;
  margin: string;
  product_id: number;
  profit_monthly: string;
  sales_monthly: string;
  title: string;
  tracking_status: string;
  profit: string;
}

export interface ProductsTrackData {
  avg_price: string;
  daily_rank: number;
  daily_sales: string;
  date_range: number;
  fees: string;
  id: number;
  monthly_sales: string;
  product_track_group_id: number;
  profit: string;
  rating: string;
  review: number;
  roi: string;
  size_tier: string;
  weight: string;
}

export interface ProductDetails {
  asin: string;
  fees: string;
  id: number;
  inb_shipping_cost: string;
  margin: string;
  monthly_revenue: number;
  monthly_sales: string;
  oub_shipping_cost: string;
  price: string;
  product_cost: string;
  product_id: number;
  profit: string;
  profit_monthly: string;
  rank: string;
  roi: string;
  upc: string;
  amazon_url: string;
  image_url: string;
}

export interface ProductChartDetails {
  rank: number;
  cdate: string
}

export interface ProductChartDetailsPrice {
  price: number;
  cdate: string
}

export interface ChartAveragePrice {
  avg_price: string;
  cdate: string;
}

export interface ChartAverageRank {
  avg_rank: number;
  cdate: string;
}

const headers = {
  Authorization: `Bearer ${localStorage.getItem('idToken')}`,
  'Content-Type': `multipart/form-data`,
};
// const headers = {
//   Authorization: `Bearer ${localStorage.getItem('idToken')}`,
//   'Content-Type': 'application/json',
// };

const headers_file = {
  Authorization: `Bearer ${localStorage.getItem('idToken')}`,
  'Content-Type': `multipart/form-data`,
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
export const getTimeEfficiency = () => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  return axios({
    method: 'get',
    // url: URLS.BASE_URL_API + `seller/${sellerID}/supplier/`,
    url: URLS.BASE_URL_API + 'seller/1000000052/time_efficiency/',
    headers,
  })
    .then(json => {
      console.log(json.data);
      dispatch(setTimeEfficiency(json.data));
      // return json.data;
    })
    .catch(error => {
    });
};
export const getChartValues1 = (product_track_group_id: string) => (dispatch: any) => {
  // const sellerID = localStorage.getItem('userId');
  // console.log(sellerID);
  return axios({
    method: 'get',
    url: URLS.BASE_URL_API + 'group/' + product_track_group_id + '/history/?fields=avg_price,cdate',
    headers,
  })
    .then(json => {
      dispatch(setChartValues1(json.data));
    })
    .catch(error => {
    });
};

export const getChartValues2 = (product_track_group_id: string) => (dispatch: any) => {
  // const sellerID = localStorage.getItem('userId');
  // console.log(sellerID);
  return axios({
    method: 'get',
    url: URLS.BASE_URL_API + 'group/' + product_track_group_id + '/history/?fields=avg_rank,cdate',
    headers,
  })
    .then(json => {
      dispatch(setChartValues2(json.data));
    })
    .catch(error => {
    });
};

export const getProductDetail = (product_id: string) => (dispatch: any) => {
  // const sellerID = localStorage.getItem('userId');
  // console.log(sellerID);
  return axios({
    method: 'get',
    url: URLS.BASE_URL_API + 'product/' + product_id + '/detail',
    headers,
  })
    .then(json => {
      dispatch(setProductDetail(json.data[0]));
    })
    .catch(error => {
    });
};

export const getProductDetailChart = (product_id: string) => (dispatch: any) => {
  // const sellerID = localStorage.getItem('userId');   
  // console.log(sellerID);
  return axios({
    method: 'get',
    url: URLS.BASE_URL_API + 'product/' + product_id + '/history/?fields=rank,cdate',
    headers,
  })
    .then(json => {
      dispatch(setProductDetailChart(json.data));
    })
    .catch(error => {
    });
};

export const getProductDetailChartPrice = (product_id: string) => (dispatch: any) => {
  // const sellerID = localStorage.getItem('userId');   
  // console.log(sellerID);
  return axios({
    method: 'get',
    url: URLS.BASE_URL_API + 'product/' + product_id + '/history/?fields=price,cdate',
    headers,
  })
    .then(json => {
      dispatch(setProductDetailChart2(json.data));
    })
    .catch(error => {
    });
};


export const getProductTrackData = () => (dispatch: any) => {
  return axios({
    method: 'get',
    url: URLS.BASE_URL_API + 'group/track_data/?product_track_group_ids=2',
    // url: URLS.BASE_URL_API + 'group/track_data/',
    // data: {
    //   product_track_group_ids: 2
    // },
    headers,
  })
    .then(json => {
      console.log(json.data);
      dispatch(setProductTrackData(json.data[0]));
    })
    .catch(error => {
    });
};

export const getProductTrackGroupId = (supplier_name: string, supplier_id: string) => (dispatch: any) => {

  const sellerID = localStorage.getItem('userId');

  var bodyFormData = new FormData();
  // bodyFormData.set('seller_id', String(sellerID));
  bodyFormData.set('seller_id', '1000000052');
  bodyFormData.set('name', supplier_name);
  bodyFormData.set('supplier_id', supplier_id);

  return axios({
    method: 'POST',
    // url: URLS.BASE_URL_API + `/seller/${sellerID}/supplier/`,
    url: URLS.BASE_URL_API + `seller/1000000052/track/group/`,
    data: bodyFormData,
    // data: {
    //   name: name,
    //   description: description,
    //   supplier_group_id: 1
    // },
    headers,
  })
    .then(json => {
      console.log(json.data.id);
      dispatch(setsaveSupplierNameAndDescription(json.data));
    })
    .catch(error => {
    });
};

function createSupplierGroup (supplier_name: string)  {
  const sellerID = localStorage.getItem('userId');
  var bodyFormData = new FormData();
  bodyFormData.set('name', supplier_name);
  return axios({
    method: 'POST',
    // url: URLS.BASE_URL_API + `seller/${sellerID}/supplier_group`,
    url: URLS.BASE_URL_API + `seller/1000000052/supplier_group`,
    data: bodyFormData,
    headers,
  })
    .then(json => {
      console.log(json.data.id);
      // dispatch(setsaveSupplierNameAndDescription(json.data));
    })
    .catch(error => {
    });
};

export const saveSupplierNameAndDescription = (name: string, description: string) => (dispatch: any) => {
  console.log("now calling to crerate supplier group")
  createSupplierGroup(name);
  var bodyFormData = new FormData();
  bodyFormData.set('name', name);
  bodyFormData.set('description', description);
  bodyFormData.set('supplier_group_id', "2");

  const sellerID = localStorage.getItem('userId');
  console.log(name);
  return axios({
    method: 'POST',
    // url: URLS.BASE_URL_API + `/seller/${sellerID}/supplier/`,
    url: URLS.BASE_URL_API + `seller/1000000052/supplier/`,
    data: bodyFormData,
    // data: {
    //   name: name,
    //   description: description,
    //   supplier_group_id: 1
    // },
    headers,
  })
    .then(json => {
      console.log(json.data.id);
      dispatch(setsaveSupplierNameAndDescription(json.data));
      // return json.data;
    })
    .catch(error => {
    });
};

export const updateSupplierNameAndDescription = (name: string, description: string, update_supplier_id: string) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');

  var bodyFormData = new FormData();
  bodyFormData.set('name', name);
  bodyFormData.set('description', description);
  bodyFormData.set('id', update_supplier_id);
  // bodyFormData.set('id', getProductTrackGroupId());

  return axios({
    method: 'patch',
    // url: URLS.BASE_URL_API + `/seller/${sellerID}/supplier/`,
    url: URLS.BASE_URL_API + `supplier`,
    data: bodyFormData,
    // data: {
    //   name: name,
    //   description: description,
    //   id: update_supplier_id
    // },
    headers,
  })
    .then(json => {
      console.log(json.data.id);
      // dispatch(updateSupplierNameAndDescription(json.data));
      // return json.data;
    })
    .catch(error => {
    });
};

export const uploadCSV = (new_supplier_id: string, file: any) => (dispatch: any) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('idToken')}`,
    'Content-Type': `multipart/form-data`,
  };
  const sellerID = localStorage.getItem('userId');
  return axios({
    method: 'POST',
    url: URLS.BASE_URL_API + `supplier/${new_supplier_id}/synthesis/upload/`,
    // url: URLS.BASE_URL_API + `supplier/1000000052/synthesis/upload/`,
    data: {
      // seller_id: sellerID,
      seller_id: '1000000052',
      file: file,
    },
    headers,
  })
    .then(json => {
      console.log(json.data);
      // dispatch(setsaveSupplierNameAndDescription(json.data));
    })
    .catch(error => {
    });
};

export const getProducts = (supplierID: string) => (dispatch: any) => {
  const userID = localStorage.getItem('userId');
  console.log('supplierID: ', supplierID);
  // const supplier = URLS.BASE_URL_API + 'supplier/' + supplierID + '/synthesis_data/';
  // console.log(supplier);

  return axios({
    method: 'get',
    // url: URLS.BASE_URL_API + 'supplier/' + supplierID + '/synthesis_data_compact/?seller_id=' +userID ,
    url: URLS.BASE_URL_API + 'supplier/' + supplierID + '/synthesis_data_compact/?seller_id=1000000052',
    headers,
  })
    .then(json => {
      console.log(json.data);

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

export const trackProduct = (productID: string, productTrackGroupID: string, status: string) => (dispatch: any) => {
  // api/seller/(?P<seller_id>[0-9]+)/track/product/
  const sellerID = localStorage.getItem('userId');
  console.log(productID);
  const data = {
    id: '1072',
    status,
  };
  return axios({
    method: 'PATCH',
    url: URLS.BASE_URL_API + `track/product/`,
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

export const setTimeEfficiency = (data: {}) => ({
  type: SET_TIME_EFFICIENCY,
  data,
});

export const setProducts = (data: {}) => ({
  type: SET_PRODUCTS,
  data,
});
export const setsaveSupplierNameAndDescription = (data: {}) => ({
  type: SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION,
  data,
});

export const setProductTrackData = (data: {}) => ({
  type: SET_PRODUCT_TRACK_DATA,
  data,
});

export const setChartValues1 = (data: {}) => ({
  type: SET_CHART_VALUES_1,
  data,
});

export const setChartValues2 = (data: {}) => ({
  type: SET_CHART_VALUES_2,
  data,
});

export const setProductDetail = (data: {}) => ({
  type: SET_Product_Detail,
  data,
});
export const setProductDetailChart = (data: {}) => ({
  type: SET_Product_Detail_Chart_Values,
  data,
});
export const setProductDetailChart2 = (data: {}) => ({
  type: SET_Product_Detail_Chart_Values_2,
  data,
});