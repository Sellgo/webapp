import Axios from 'axios';
import {
  SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION,
  SET_TIME_EFFICIENCY,
} from '../../constants/constants';
import { AppConfig } from '../../config';
import { updateSupplier, addSupplier } from '../Suppliers';
import { success, error } from '../../utils/notifications';

export const getTimeEfficiency = () => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  return Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}/time-efficiency`)
    .then(json => {
      dispatch(setTimeEfficiency(json.data));
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

export const setTimeEfficiency = (data: {}) => ({
  type: SET_TIME_EFFICIENCY,
  data,
});

export const setsaveSupplierNameAndDescription = (data: {}) => ({
  type: SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION,
  data,
});
