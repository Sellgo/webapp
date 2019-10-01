import axios, { Cancel, Canceler } from 'axios';
import {
  SET_SELLERS,
  SET_PRODUCTS,
  SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION,
  SET_PRODUCT_TRACK_DATA,
  SET_CHART_VALUES_PRICE,
  SET_CHART_VALUES_RANK,
  SET_Product_Detail,
  SET_Product_Detail_Chart_Values_Rank,
  SET_Product_Detail_Chart_Values_Price,
  SET_Product_Detail_Chart_Values_Kpi,
  SET_TIME_EFFICIENCY,
  UPDATE_PRODUCT,
  UPLOAD_SYNTHESIS_FILE_ID,
  GET_PRODUCT_TRACK_GROUP,
  UPLOAD_CSV_RESPONSE,
} from '../constant/constant';
import { AppConfig } from '../config';
import { updateSupplier, fetchSynthesisProgressUpdates, addSupplier } from './suppliers';
import { success, error } from '../utils/notifications';
import { sellerIDSelector } from '../selectors/user';
export interface Supplier {
  supplier_id: number;
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
  p2l_ratio: any;
  xid: string;
  file_name: string;
  synthesis_file_id: number;
  speed: number;
  progress: number;
  udate: Date;
  tag: string;
  file_url: string;
  report_url: string;
  file_status: string;
}

export interface TimeEfficiency {
  saved_time: string;
  efficiency: string;
  id: any;
  seller_id: any;
}

export interface Product {
  amazon_url: string;
  amazon_category_name: string;
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
  product_track_id: string;
  roi: string;
  product_cost: string;
  fees: string;
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
  title: string;
  package_quantity: string;
  total_cost: number;
}

export interface ProductChartDetailsRank {
  rank: number;
  cdate: string;
}

export interface ProductChartDetailsPrice {
  price: number;
  cdate: string;
}

export interface ProductChartDetailsKpi {
  profit: string;
  roi: string;
  cdate: string;
}

export interface ChartAveragePrice {
  avg_price: string;
  cdate: string;
}

export interface ChartAverageRank {
  avg_rank: number;
  cdate: string;
}

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('idToken')}`,
  'Content-Type': `multipart/form-data`,
});

let progressTimer: NodeJS.Timeout | null = null;
const CancelToken = axios.CancelToken;
let progressAxiosCancel: Canceler | null = null;
export const getSellers = () => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  return axios({
    method: 'get',
    url: AppConfig.BASE_URL_API + `seller/${sellerID}/supplier/?status=active`,
    headers: getHeaders(),
  })
    .then(json => {
      if (json.data.length == 0) {
        dispatch(
          setSellers([
            {
              contact: null,
              description: null,
              email: null,
              freight_fee: null,
              id: -10000000,
              item_active_count: null,
              item_total_count: null,
              name: null,
              phone: null,
              rate: null,
              seller_id: null,
              status: null,
              supplier_group_id: null,
              timezone: null,
              upcharge_fee: null,
              website: null,
              xid: null,
            },
          ])
        );
      } else {
        dispatch(setSellers(json.data));
      }
    })
    .catch(error => {
      dispatch(
        setSellers([
          {
            contact: null,
            description: null,
            email: null,
            freight_fee: null,
            id: -10000000,
            item_active_count: null,
            item_total_count: null,
            name: null,
            phone: null,
            rate: null,
            seller_id: null,
            status: null,
            supplier_group_id: null,
            timezone: null,
            upcharge_fee: null,
            website: null,
            xid: null,
          },
        ])
      );
    });
};

export const getTimeEfficiency = () => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  return axios({
    method: 'get',
    url: AppConfig.BASE_URL_API + `sellers/${sellerID}/time-efficiency`,
    headers: getHeaders(),
  })
    .then(json => {
      dispatch(setTimeEfficiency(json.data));
    })
    .catch(error => {});
};

export const getProductsChartHistoryPrice = (supplierID: string) => (dispatch: any) => {
  return axios({
    method: 'get',
    url: AppConfig.BASE_URL_API + 'group/' + supplierID + '/history/price',
    headers: getHeaders(),
  })
    .then(json => {
      if (json.data.length > 0) {
        dispatch(setChartValuesPrice(json.data));
      } else {
        dispatch(
          setChartValuesPrice([
            {
              avg_price: '-1000000',
              cdate: '-1000000',
            },
          ])
        );
      }
    })
    .catch(error => {});
};

export const getProductsChartHistoryRank = (supplierID: string) => (dispatch: any) => {
  return axios({
    method: 'get',
    url: AppConfig.BASE_URL_API + 'group/' + supplierID + '/history/rank',
    headers: getHeaders(),
  })
    .then(json => {
      dispatch(setChartValuesRank(json.data));
    })
    .catch(error => {});
};

export const getProductDetail = (productID: string, supplierID: string) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  return axios({
    method: 'get',
    url:
      AppConfig.BASE_URL_API +
      `sellers/${sellerID}/suppliers/${supplierID}/products/${productID}/detail`,
    headers: getHeaders(),
  })
    .then(json => {
      dispatch(setProductDetail(json.data[0]));
    })
    .catch(error => {});
};

export const getProductDetailChartRank = (productID: string) => (dispatch: any) => {
  return axios({
    method: 'get',
    url: AppConfig.BASE_URL_API + `products/${productID}/history/rank`,
    headers: getHeaders(),
  })
    .then(json => {
      dispatch(setProductDetailChartRank(json.data));
    })
    .catch(error => {});
};

export const getProductDetailChartPrice = (productID: string) => (dispatch: any) => {
  return axios({
    method: 'get',
    url: AppConfig.BASE_URL_API + `products/${productID}/history/price`,
    headers: getHeaders(),
  })
    .then(json => {
      dispatch(setProductDetailChartPrice(json.data));
    })
    .catch(error => {});
};

export const getProductDetailChartKpi = (productID: string) => (dispatch: any) => {
  return axios({
    method: 'get',
    url: AppConfig.BASE_URL_API + `products/${productID}/history/kpi`,
    headers: getHeaders(),
  })
    .then(json => {
      dispatch(setProductDetailChartKpi(json.data));
    })
    .catch(error => {});
};

export const getProductTrackData = (supplierID: string) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  return axios({
    method: 'get',
    url: AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplierID}/group/track-data`,
    headers: getHeaders(),
  })
    .then(json => {
      if (json.data.length === 0) {
        dispatch(
          setProductTrackData({
            avg_price: '',
            daily_rank: 0,
            daily_sales: '',
            date_range: 0,
            fees: '',
            id: 0,
            monthly_sales: '',
            product_track_group_id: 0,
            profit: '',
            rating: '',
            review: 0,
            roi: '',
            size_tier: '',
            weight: '',
          })
        );
      } else {
        dispatch(setProductTrackData(json.data[0]));
      }
    })
    .catch(error => {});
};

export const getProductTrackGroupId = (supplierID: string) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  return axios({
    method: 'GET',
    url: AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplierID}/track/group`,
    headers: getHeaders(),
  })
    .then(json => {
      dispatch(reduceProductTrackGroup(json.data));
    })
    .catch(error => {});
};

export const postProductTrackGroupId = (supplierID: string, supplierName: string) => (
  dispatch: any
) => {
  const sellerID = localStorage.getItem('userId');

  const bodyFormData = new FormData();
  bodyFormData.set('name', supplierName);
  bodyFormData.set('supplier_id', supplierID);
  bodyFormData.set('marketplace_id', 'US');
  return axios({
    method: 'POST',
    url: AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplierID}/track/group`,
    data: bodyFormData,

    headers: getHeaders(),
  })
    .then(json => {
      // dispatch(reduceProductTrackGroup(json.data));
    })
    .catch(error => {});
};

function createSupplierGroup(supplier_name: string, call_back: any) {
  const sellerID = localStorage.getItem('userId');
  const bodyFormData = new FormData();
  bodyFormData.set('name', supplier_name);
  return axios({
    method: 'POST',
    url: AppConfig.BASE_URL_API + `sellers/${sellerID}/supplier-group`,
    data: bodyFormData,
    headers: getHeaders(),
  })
    .then(json => {
      call_back(json.data);
    })
    .catch(error => {});
}

export const saveSupplierNameAndDescription = (
  name: string,
  description: string,
  other: any,
  callBack?: any
) => (dispatch: any) => {
  // add promise support without breaking existing callback structure
  return new Promise((resolve, reject) => {
    createSupplierGroup(name, (data: any) => {
      const bodyFormData = new FormData();
      bodyFormData.set('name', name);
      if (description) bodyFormData.set('description', description);
      bodyFormData.set('supplier_group_id', data.id);
      for (let param in other) {
        bodyFormData.set(param, other[param]);
      }
      const sellerID = localStorage.getItem('userId');
      return axios({
        method: 'POST',
        url: AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers`,
        data: bodyFormData,
        headers: getHeaders(),
      })
        .then(json => {
          dispatch(addSupplier(json.data));
          dispatch(setsaveSupplierNameAndDescription(json.data));
          callBack && callBack(json.data);
          resolve(json.data);
        })
        .catch(err => {
          for (let er in err.response.data) {
            error(err.response.data[er].length ? err.response.data[er][0] : err.response.data[er]);
          }
        });
    });
  });
};

export const deleteSupplier = (supplier_id: any, callBack: any) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  const bodyFormData = new FormData();
  bodyFormData.set('id', supplier_id);
  bodyFormData.set('status', 'inactive');
  return axios({
    method: 'patch',
    url: AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplier_id}`,
    data: bodyFormData,
    headers: getHeaders(),
  })
    .then(json => {
      dispatch(updateSupplier(json.data));
      callBack(json.data);
    })
    .catch(error => {});
};

export const updateSupplierNameAndDescription = (
  name: string,
  description: string,
  update_supplier_id: string,
  other: any,
  callBack?: any
) => (dispatch: any) => {
  // add promise support without breaking existing callback structure
  return new Promise((resolve, reject) => {
    const sellerID = localStorage.getItem('userId');
    const bodyFormData = new FormData();
    bodyFormData.set('name', name);
    bodyFormData.set('description', description);
    bodyFormData.set('id', update_supplier_id);
    for (let param in other) {
      bodyFormData.set(param, other[param]);
    }
    return axios({
      method: 'patch',
      url: AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${update_supplier_id}`,
      data: bodyFormData,
      headers: getHeaders(),
    })
      .then(json => {
        dispatch(updateSupplier(json.data));
        dispatch(setsaveSupplierNameAndDescription(json.data));
        callBack && callBack(json.data);
        resolve(json.data);
      })
      .catch(err => {
        for (let er in err.response.data) {
          error(err.response.data[er].length ? err.response.data[er][0] : err.response.data[er]);
        }
      });
  });
};

export const uploadCSV = (new_supplier_id: string, file: any) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  resetUploadCSVResponse();
  const bodyFormData = new FormData();
  bodyFormData.set('seller_id', String(sellerID));
  bodyFormData.set('file', file);

  return axios({
    method: 'POST',
    url: AppConfig.BASE_URL_API + `supplier/${new_supplier_id}/synthesis/upload/`,
    data: bodyFormData,
    headers: getHeaders(),
  })
    .then(json => {
      dispatch({
        type: UPLOAD_CSV_RESPONSE,
        data: {
          message: 'We will process your file within few hours',
          status: 'success',
        },
      });
    })
    .catch(error => {
      dispatch({
        type: UPLOAD_CSV_RESPONSE,
        data: {
          message:
            'There is a problem while processing your file. Make sure your file conforms to our format',
          status: 'failed',
        },
      });
    });
};

export const getProducts = (supplierID: string) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');

  return axios({
    method: 'get',
    url:
      AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplierID}/synthesis-data-compact`,
    headers: getHeaders(),
  })
    .then(json => {
      if (json.data.length == 0) {
        dispatch(
          setProducts([
            {
              amazon_url: null,
              asin: null,
              id: -10000000,
              image_url: null,
              last_syn: null,
              margin: null,
              product_id: null,
              profit_monthly: null,
              sales_monthly: null,
              title: null,
              tracking_status: null,
              profit: null,
              product_track_id: null,
            },
          ])
        );
      } else {
        dispatch(setProducts(json.data));
      }
    })
    .catch(error => {
      dispatch(
        setProducts([
          {
            amazon_url: null,
            asin: null,
            id: -10000000,
            image_url: null,
            last_syn: null,
            margin: null,
            product_id: null,
            profit_monthly: null,
            sales_monthly: null,
            title: null,
            tracking_status: null,
            profit: null,
            product_track_id: null,
          },
        ])
      );
    });
};

export const trackProductWithPost = (
  productID: string,
  productTrackGroupID: string,
  status: string,
  supplierID: string
) => (dispatch: any) => {
  let sellerID = localStorage.getItem('userId');
  if (sellerID == null) {
    sellerID = '';
  }
  const bodyFormData = new FormData();
  bodyFormData.set('product_id', productID);
  bodyFormData.set('status', status);
  bodyFormData.set('product_track_group_id', productTrackGroupID);
  bodyFormData.set('seller_id', sellerID);
  return axios({
    method: 'POST',
    url: AppConfig.BASE_URL_API + `sellers/${sellerID}/track/product`,
    data: bodyFormData,
    headers: getHeaders(),
  })
    .then(json => {
      dispatch(updateProduct(json.data));
    })
    .catch(error => {});
};

export const trackProductWithPatch = (
  product_track_id: string,
  productTrackGroupID: string,
  status: string,
  supplierID: string
) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');

  const bodyFormData = new FormData();
  bodyFormData.set('id', product_track_id);
  bodyFormData.set('status', status);

  return axios({
    method: 'PATCH',
    url: AppConfig.BASE_URL_API + `sellers/${sellerID}/track/product`,
    data: bodyFormData,
    headers: getHeaders(),
  })
    .then(json => {
      dispatch(updateProduct(json.data));
    })
    .catch(error => {});
};

export const resetUploadCSVResponse = () => (dispatch: any) => {
  dispatch(
    reduceUploadCSVResponse({
      message: 'We will process your file within few hours',
      status: 'unset',
    })
  );
};

export const reduceUploadCSVResponse = (data: {}) => ({
  type: UPLOAD_CSV_RESPONSE,
  data,
});
export const setSynthesisFileID = (data: {}) => ({
  type: UPLOAD_SYNTHESIS_FILE_ID,
  data,
});

export const setSellers = (data: {}) => ({
  type: SET_SELLERS,
  data,
});

export const updateProduct = (data: {}) => ({
  type: UPDATE_PRODUCT,
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

export const setChartValuesPrice = (data: {}) => ({
  type: SET_CHART_VALUES_PRICE,
  data,
});

export const setChartValuesRank = (data: {}) => ({
  type: SET_CHART_VALUES_RANK,
  data,
});

export const setProductDetail = (data: {}) => ({
  type: SET_Product_Detail,
  data,
});

export const setProductDetailChartRank = (data: {}) => ({
  type: SET_Product_Detail_Chart_Values_Rank,
  data,
});

export const setProductDetailChartPrice = (data: {}) => ({
  type: SET_Product_Detail_Chart_Values_Price,
  data,
});

export const setProductDetailChartKpi = (data: {}) => ({
  type: SET_Product_Detail_Chart_Values_Kpi,
  data,
});

export const reduceProductTrackGroup = (data: {}) => ({
  type: GET_PRODUCT_TRACK_GROUP,
  data,
});

export const setFavouriteSupplier = (supplier_id: any, isFavourite: any) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  const bodyFormData = new FormData();
  bodyFormData.set('id', supplier_id);
  bodyFormData.set('tag', isFavourite);

  return axios({
    method: 'patch',
    url: AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplier_id}`,
    data: bodyFormData,
    headers: getHeaders(),
  })
    .then(json => {
      dispatch(updateSupplier(json.data));
    })
    .catch(error => {});
};

export const postSynthesisRerun = (supplier: Supplier) => (dispatch: any) => {
  const sellerID = sellerIDSelector();
  const bodyFormData = new FormData();
  bodyFormData.set('synthesis_file_id', String(supplier.synthesis_file_id));
  return axios({
    method: 'POST',
    url:
      AppConfig.BASE_URL_API +
      `sellers/${sellerID}/suppliers/${supplier.supplier_id}/synthesis/rerun`,
    data: bodyFormData,

    headers: getHeaders(),
  })
    .then(json => {
      dispatch(updateSupplier({ ...supplier, ...{ progress: 0, file_status: 'pending' } }));
      dispatch(fetchSynthesisProgressUpdates());
      success('Rerun successfully initiated!');
    })
    .catch(err => {
      error('Rerun failed. Try again!');
    });
};
