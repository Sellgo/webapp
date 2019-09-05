import { UPDATE_SUPPLIER } from './../constant/constant';
import { SET_SUPPLIERS, RESET_SUPPLIERS } from '../constant/constant';
import Axios from 'axios';
import { sellerIDSelector } from '../selectors/user';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppConfig } from '../config';
import { supplierIdsSelector, suppliersSelector } from '../selectors/suppliers';
import { Supplier } from './SYNActions';

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('idToken')}`,
  'Content-Type': `multipart/form-data`,
});

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
    `${AppConfig.BASE_URL_API}seller/${String(sellerID)}/supplier_compact/?status=active`,
    {
      headers: getHeaders(),
    }
  );
  const suppliers = response.data.map((supplier: any) => {
    if (supplier['file_status'] === 'completed')
      return { ...supplier, ...{ progress: 100, speed: 0 } };
    return supplier;
  });
  dispatch(setSuppliers(suppliers));
  dispatch(fetchSynthesisProgressUpdates());
};

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const fetchSynthesisProgressUpdates = () => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => {}
) => {
  let suppliers = suppliersSelector(getState());
  suppliers = suppliers.filter(
    supplier => supplier.file_status !== null && supplier.file_status !== 'completed'
  );
  while (suppliers.length > 0) {
    const requests = suppliers.map(supplier => {
      return Axios.get(
        AppConfig.BASE_URL_API +
          `synthesis_progress/?synthesis_file_id=${supplier.synthesis_file_id}`,
        {
          headers: getHeaders(),
        }
      );
    });
    const responses = await Promise.all(requests);
    responses.forEach((response, index) => {
      const data = response.data;
      const supplier = suppliers[index];
      dispatch(
        updateSupplier({
          ...supplier,
          ...data,
        })
      );
    });

    suppliers = suppliers.filter((supplier, index) => {
      return responses[index].data.progress !== 100;
    });

    await timeout(2000);
  }
};

export const updateSupplier = (supplier: Supplier) => ({
  type: UPDATE_SUPPLIER,
  payload: supplier,
});
