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
  GET_PRODUCT_TRACK_GROUP, UPLOAD_SYNTHESIS_PROGRESS_UPDATES, SYN_RESET_PRODUCT_REDUCED_VALUES, UPLOAD_CSV_RESPONSE,
} from '../constant/constant';
import { AppConfig } from '../config';

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
  p2l_ratio: any;
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
  roi:string;
  product_cost:string;
  fees:string;
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
}

export interface ProductChartDetailsRank {
  rank: number;
  cdate: string
}

export interface ProductChartDetailsPrice {
  price: number;
  cdate: string
}

export interface ProductChartDetailsKpi {
  profit: string;
  roi:string;
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

let progressTimer: NodeJS.Timeout | null = null;
const CancelToken = axios.CancelToken;
let progressAxiosCancel: Canceler | null = null;
export const getSellers = () => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  if (headers.Authorization === 'Bearer null') {
    headers.Authorization = `Bearer ${localStorage.getItem('idToken')}`;
  }
  return axios({
    method: 'get',
    url: AppConfig.BASE_URL_API + `seller/${sellerID}/supplier/?status=active`,
    headers,
  })
    .then(json => {
      if (json.data.length == 0) {
        dispatch(setSellers(
          [{
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
          }],
        ));
      } else {
        dispatch(setSellers(json.data));
      }
    })
    .catch(error => {
      dispatch(setSellers(
        [{
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
        }],
      ));
    });
};


export const getTimeEfficiency = () => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  return axios({
    method: 'get',
    url: AppConfig.BASE_URL_API + `seller/${sellerID}/time_efficiency/`,
    headers,
  })
    .then(json => {
      dispatch(setTimeEfficiency(json.data));
    })
    .catch(error => {
    });
};

export const getProductsChartHistoryPrice = (supplierID: string) => (dispatch: any) => {
  return axios({
    method: 'get',
    url: AppConfig.BASE_URL_API + 'group/' + supplierID + '/history/price',
    headers,
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
          ]),
        );
      }
    })
    .catch(error => {
    });
};

export const getProductsChartHistoryRank = (supplierID: string) => (dispatch: any) => {
  return axios({
    method: 'get',
    url: AppConfig.BASE_URL_API + 'group/' + supplierID + '/history/rank',
    headers,
  })
    .then(json => {
      dispatch(setChartValuesRank(json.data));
    })
    .catch(error => {
    });
};

export const getProductDetail = (productID: string, supplierID: string) => (dispatch: any) => {
  return axios({
    method: 'get',
    url: AppConfig.BASE_URL_API + 'product/' + productID + '/detail/?supplier_id=' + supplierID,
    headers,
  })
    .then(json => {
      dispatch(setProductDetail(json.data[0]));
    })
    .catch(error => {
    });
};

export const getProductDetailChartRank = (product_id: string) => (dispatch: any) => {
  return axios({
    method: 'get',
    url: AppConfig.BASE_URL_API + 'product/' + product_id + '/history/rank',
    headers,
  })
    .then(json => {
      dispatch(setProductDetailChartRank(json.data));
    })
    .catch(error => {
    });
};

export const getProductDetailChartPrice = (product_id: string) => (dispatch: any) => {
  return axios({
    method: 'get',
    url: AppConfig.BASE_URL_API + 'product/' + product_id + '/history/price',
    headers,
  })
    .then(json => {
      dispatch(setProductDetailChartPrice(json.data));
    })
    .catch(error => {
    });
};

export const getProductDetailChartKpi = (product_id: string) => (dispatch: any) => {
  return axios({
    method: 'get',
    url: AppConfig.BASE_URL_API + 'product/' + product_id + '/history/kpi',
    headers,
  })
    .then(json => {
      dispatch(setProductDetailChartKpi(json.data));
    })
    .catch(error => {
    });
};


export const getProductTrackData = (supplierID: string) => (dispatch: any) => {
  return axios({
    method: 'get',
    url: AppConfig.BASE_URL_API + 'group/track_data/?supplier_id=' + supplierID,
    headers,
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
          }),
        );
      } else {
        dispatch(setProductTrackData(json.data[0]));
      }
    })
    .catch(error => {
    });
};

export const getProductTrackGroupId = (supplierID: string) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  return axios({
    method: 'GET',
    url: AppConfig.BASE_URL_API + `seller/${sellerID}/track/group/?supplier_id=${supplierID}`,
    headers,
  })
    .then(json => {
      dispatch(reduceProductTrackGroup(json.data));
    })
    .catch(error => {
    });
};

export const postProductTrackGroupId = (supplierID: string, supplierName: string) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');

  const bodyFormData = new FormData();
  bodyFormData.set('name', supplierName);
  bodyFormData.set('supplier_id', supplierID);
  bodyFormData.set('marketplace_id', 'US');
  return axios({
    method: 'POST',
    url: AppConfig.BASE_URL_API + `seller/${sellerID}/track/group/`,
    data: bodyFormData,

    headers,
  })
    .then(json => {
      // dispatch(reduceProductTrackGroup(json.data));
    })
    .catch(error => {
    });
};

function createSupplierGroup(supplier_name: string, call_back: any) {
  const sellerID = localStorage.getItem('userId');
  var bodyFormData = new FormData();
  bodyFormData.set('name', supplier_name);
  return axios({
    method: 'POST',
    url: AppConfig.BASE_URL_API + `seller/${sellerID}/supplier_group/`,
    data: bodyFormData,
    headers,
  })
    .then(json => {
      call_back(json.data);
    })
    .catch(error => {
    });
};

export const saveSupplierNameAndDescription = (name: string, description: string, callBack: any) => (dispatch: any) => {
  createSupplierGroup(name, (data: any) => {
    var bodyFormData = new FormData();
    bodyFormData.set('name', name);
    bodyFormData.set('description', description);
    bodyFormData.set('supplier_group_id', data.id);

    const sellerID = localStorage.getItem('userId');
    return axios({
      method: 'POST',
      url: AppConfig.BASE_URL_API + `seller/${sellerID}/supplier/`,
      data: bodyFormData,
      headers,
    })
      .then(json => {
        dispatch(setsaveSupplierNameAndDescription(json.data));
        (callBack(json.data));
      })
      .catch(error => {
      });
  });

};

export const deleteSupplier = (supplier_id: any, callBack: any) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  var bodyFormData = new FormData();
  bodyFormData.set('id', supplier_id);
  bodyFormData.set('status', 'inactive');
  return axios({
    method: 'patch',
    url: AppConfig.BASE_URL_API + `supplier/`,
    data: bodyFormData,
    headers,
  })
    .then(json => {
      callBack(json.data);
    })
    .catch(error => {
    });
};

export const updateSupplierNameAndDescription = (name: string, description: string, update_supplier_id: string, callBack: any) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  var bodyFormData = new FormData();
  bodyFormData.set('name', name);
  bodyFormData.set('description', description);
  bodyFormData.set('id', update_supplier_id);
  return axios({
    method: 'patch',
    url: AppConfig.BASE_URL_API + `supplier/`,
    data: bodyFormData,
    headers,
  })
    .then(json => {
      callBack(json.data);
    })
    .catch(error => {
    });
};


export const getLastFileID = (supplierID: string) => (dispatch: any) => {
  dispatch(setProgressUpdatesValue({ progress: 0 }));
  if (progressTimer != null) {
    clearTimeout(progressTimer);
    if (progressAxiosCancel != null) {
      progressAxiosCancel();
    }
    progressTimer = null;
  }
  const sellerID = localStorage.getItem('userId');
  return axios({
    method: 'GET',
    url: AppConfig.BASE_URL_API + `supplier/${supplierID}/get_last_file_id/?seller_id=${sellerID}`,
    headers,
  })
    .then(json => {
      dispatch(setSynthesisFileID(json.data));
      getSynthesisProgressUpdates(json.data.synthesis_file_id)(dispatch);
    })
    .catch(error => {
    });
};

export const getSynthesisProgressUpdates = (synthesisFileID: string) => (dispatch: any) => {
  return axios({
    method: 'GET',
    url: AppConfig.BASE_URL_API + `synthesis_progress/?synthesis_file_id=${synthesisFileID}`,
    headers,
    cancelToken: new CancelToken(canceler => {
      progressAxiosCancel = canceler;
    }),
  })
    .then(json => {
      dispatch(setProgressUpdatesValue(json.data));
      if (json.data.progress != 100) {
        progressTimer = setTimeout(() => {
          getSynthesisProgressUpdates(synthesisFileID)(dispatch);
        }, 2000);
      }
    })
    .catch(error => {
    });
};

export const uploadCSV = (new_supplier_id: string, file: any) => (dispatch: any) => {

  const sellerID = localStorage.getItem('userId');
  resetUploadCSVResponse();
  var bodyFormData = new FormData();
  bodyFormData.set('seller_id', String(sellerID));
  bodyFormData.set('file', file);

  return axios({
    method: 'POST',
    url: AppConfig.BASE_URL_API + `supplier/${new_supplier_id}/synthesis/upload/`,
    data: bodyFormData,
    headers,
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
    url: AppConfig.BASE_URL_API + 'supplier/' + supplierID + '/synthesis_data_compact/?seller_id=' + sellerID,
    headers,
  })
    .then(json => {
      if (json.data.length == 0) {
        dispatch(setProducts(
          [{
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
          }],
        ));
      } else {
        dispatch(setProducts(json.data));
      }
    })
    .catch(error => {
      dispatch(setProducts(
        [{
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
        }],
      ));
    });
};

export const trackProductWithPost = (productID: string, productTrackGroupID: string, status: string, supplierID: string) => (dispatch: any) => {
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
    url: AppConfig.BASE_URL_API + `seller/${sellerID}/track/product/`,
    data: bodyFormData,
    headers,
  })
    .then(json => {
      dispatch(updateProduct(json.data));
    })
    .catch(error => {
    });
};

export const trackProductWithPatch = (product_track_id: string, productTrackGroupID: string, status: string, supplierID: string) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');

  const bodyFormData = new FormData();
  bodyFormData.set('id', product_track_id);
  bodyFormData.set('status', status);

  return axios({
    method: 'PATCH',
    url: AppConfig.BASE_URL_API + `track/product/`,
    data: bodyFormData,
    headers,
  })
    .then(json => {
      dispatch(updateProduct(json.data));
    })
    .catch(error => {
    });
};

export const resetProductData = (data: {}) => ({
  type: SYN_RESET_PRODUCT_REDUCED_VALUES,
  data,
});

export const resetUploadCSVResponse = () => (dispatch: any) => {
  dispatch(
    reduceUploadCSVResponse({
      message: 'We will process your file within few hours',
      status: 'unset',
    },
    ));
};

export const reduceUploadCSVResponse = (data: {}) => ({
  type: UPLOAD_CSV_RESPONSE,
  data,
});
export const setSynthesisFileID = (data: {}) => ({
  type: UPLOAD_SYNTHESIS_FILE_ID,
  data,
});

export const setProgressUpdatesValue = (data: {}) => ({
  type: UPLOAD_SYNTHESIS_PROGRESS_UPDATES,
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
})

export const reduceProductTrackGroup = (data: {}) => ({
  type: GET_PRODUCT_TRACK_GROUP,
  data,
});
