import { UPDATE_SUPPLIER } from './../constant/constant';
import { SET_SUPPLIERS, RESET_SUPPLIERS } from '../constant/constant';
import Axios from 'axios';
import { sellerIDSelector } from '../selectors/user';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppConfig } from '../config';

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('idToken')}`,
  'Content-Type': `multipart/form-data`,
});

export interface Supplier {
  id: number;
}

export interface Suppliers {
  supplierIds: number[];
  suppliersById: { [key: number]: Supplier };
}

export const setSuppliers = (suppliers: Suppliers) => ({
  type: SET_SUPPLIERS,
  payload: suppliers,
});

export const resetSuppliers = () => ({ type: RESET_SUPPLIERS });

export const fetchSuppliers = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const sellerID = sellerIDSelector();

  const response = await Axios.get(
    `${AppConfig.BASE_URL_API}seller/${String(sellerID)}/supplier_compact`,
    {
      headers: getHeaders(),
    }
  );

  dispatch(setSuppliers(response.data));
};

export const fetchSynthesisProgressUpdates = () => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  const response = await Axios.get(AppConfig.BASE_URL_API + `synthesis_progress`, {
    headers: getHeaders(),
  });
};

export const updateSupplier = (supplier: Supplier) => ({
  type: UPDATE_SUPPLIER,
  payload: supplier,
});