import Axios from 'axios';
import {
  SET_PRODUCTS,
  SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION,
  SET_PRODUCT_TRACK_DATA,
  SET_PRODUCT_DETAIL,
  SET_PRODUCT_DETAIL_CHART_VALUES_RANK,
  SET_PRODUCT_DETAIL_CHART_VALUES_PRICE,
  SET_PRODUCT_DETAIL_CHART_VALUES_KPI,
  SET_TIME_EFFICIENCY,
  UPDATE_PRODUCT,
  GET_PRODUCT_TRACK_GROUP,
} from '../../constants/constants';
import { AppConfig } from '../../config';
import { updateSupplier, fetchSynthesisProgressUpdates, addSupplier } from '../Suppliers';
import { success, error } from '../../utils/notifications';
import { sellerIDSelector } from '../../selectors/Seller';
import { Supplier } from '../../interfaces/Supplier';

export const getTimeEfficiency = () => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  return Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}/time-efficiency`)
    .then(json => {
      dispatch(setTimeEfficiency(json.data));
    })
    .catch(error => {});
};

export const getProductDetail = (productID: string, supplierID: string) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  return Axios.get(
    AppConfig.BASE_URL_API +
      `sellers/${sellerID}/suppliers/${supplierID}/products/${productID}/detail`
  )
    .then(json => {
      dispatch(setProductDetail(json.data[0]));
    })
    .catch(error => {});
};

export const getProductDetailChartRank = (productID: string) => (dispatch: any) => {
  return Axios.get(AppConfig.BASE_URL_API + `products/${productID}/history/rank`)
    .then(json => {
      dispatch(setProductDetailChartRank(json.data));
    })
    .catch(error => {});
};

export const getProductDetailChartPrice = (productID: string) => (dispatch: any) => {
  return Axios.get(AppConfig.BASE_URL_API + `products/${productID}/history/price`)
    .then(json => {
      dispatch(setProductDetailChartPrice(json.data));
    })
    .catch(error => {});
};

export const getProductDetailChartKpi = (productID: string) => (dispatch: any) => {
  return Axios.get(AppConfig.BASE_URL_API + `products/${productID}/history/kpi`)
    .then(json => {
      dispatch(setProductDetailChartKpi(json.data));
    })
    .catch(error => {});
};

export const getProductTrackData = (supplierID: string) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  return Axios.get(
    AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplierID}/group/track-data`
  )
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
  return Axios.get(
    AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplierID}/track/group`
  )
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
  return Axios.post(
    AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplierID}/track/group`,
    bodyFormData
  )
    .then(json => {
      // dispatch(reduceProductTrackGroup(json.data));
    })
    .catch(error => {});
};

function createSupplierGroup(supplier_name: string, call_back: any) {
  const sellerID = localStorage.getItem('userId');
  const bodyFormData = new FormData();
  bodyFormData.set('name', supplier_name);
  return Axios.post(AppConfig.BASE_URL_API + `sellers/${sellerID}/supplier-group`, bodyFormData)
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
      return Axios.post(AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers`, bodyFormData)
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
  return Axios.patch(
    AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplier_id}`,
    bodyFormData
  )
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
    return Axios.patch(
      AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${update_supplier_id}`,
      bodyFormData
    )
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

export const getProducts = (supplierID: string) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  return Axios.get(
    AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplierID}/synthesis-data-compact`
  )
    .then(json => {
      if (json.data.length === 0) {
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
  return Axios.post(AppConfig.BASE_URL_API + `sellers/${sellerID}/track/product`, bodyFormData)
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

  return Axios.patch(AppConfig.BASE_URL_API + `sellers/${sellerID}/track/product`, bodyFormData)
    .then(json => {
      dispatch(updateProduct(json.data));
    })
    .catch(error => {});
};

export const setFavouriteSupplier = (supplier_id: any, isFavourite: any) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  const bodyFormData = new FormData();
  bodyFormData.set('id', supplier_id);
  bodyFormData.set('tag', isFavourite);

  return Axios.patch(
    AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplier_id}`,
    bodyFormData
  )
    .then(json => {
      dispatch(updateSupplier(json.data));
    })
    .catch(error => {});
};

export const postSynthesisRerun = (supplier: Supplier) => (dispatch: any) => {
  const sellerID = sellerIDSelector();
  const bodyFormData = new FormData();
  bodyFormData.set('synthesis_file_id', String(supplier.synthesis_file_id));
  return Axios.post(
    AppConfig.BASE_URL_API +
      `sellers/${sellerID}/suppliers/${supplier.supplier_id}/synthesis/rerun`,
    bodyFormData
  )
    .then(json => {
      dispatch(updateSupplier({ ...supplier, ...{ progress: 0, file_status: 'pending' } }));
      dispatch(fetchSynthesisProgressUpdates());
      success('Rerun successfully initiated!');
    })
    .catch(err => {
      error('Rerun failed. Try again!');
    });
};

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

export const setProductDetail = (data: {}) => ({
  type: SET_PRODUCT_DETAIL,
  data,
});

export const setProductDetailChartRank = (data: {}) => ({
  type: SET_PRODUCT_DETAIL_CHART_VALUES_RANK,
  data,
});

export const setProductDetailChartPrice = (data: {}) => ({
  type: SET_PRODUCT_DETAIL_CHART_VALUES_PRICE,
  data,
});

export const setProductDetailChartKpi = (data: {}) => ({
  type: SET_PRODUCT_DETAIL_CHART_VALUES_KPI,
  data,
});

export const reduceProductTrackGroup = (data: {}) => ({
  type: GET_PRODUCT_TRACK_GROUP,
  data,
});
