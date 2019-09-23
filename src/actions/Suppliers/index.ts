import {
  SET_SUPPLIERS,
  RESET_SUPPLIERS,
  SELECT_SUPPLIER,
  UPDATE_SUPPLIER,
  ADD_SUPPLIER,
  SET_SUPPLIERS_TABLE_COLUMNS,
  SET_SUPPLIERS_TABLE_TAB,
} from '../../constants/constants';
import Axios from 'axios';
import { sellerIDSelector } from '../../selectors/Seller';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppConfig } from '../../config';
import { suppliersSelector } from '../../selectors/Suppliers';
import { Supplier } from '../Synthesis';

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
    `${AppConfig.BASE_URL_API}sellers/${String(sellerID)}/suppliers-compact?status=active`
  );
  const suppliers = response.data.map((supplier: any) => {
    if (supplier['file_status'] === 'completed')
      return { ...supplier, ...{ progress: 100, speed: 0 } };
    return { ...supplier, ...{ progress: -1, speed: -1 } };
  });
  dispatch(setSuppliers(suppliers));
  dispatch(fetchSynthesisProgressUpdates());
};

export const fetchSupplier = (supplierId: number) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  const sellerID = sellerIDSelector();

  const response = await Axios.get(
    `${AppConfig.BASE_URL_API}sellers/${String(sellerID)}/suppliers-compact?supplier_id=${String(
      supplierId
    )}`
  );
  if (response.data.length) {
    dispatch(updateSupplier({ ...response.data[0], id: supplierId }));
    dispatch(selectSupplier({ ...response.data[0], id: supplierId }));
  }
};

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const fetchSynthesisProgressUpdates = () => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => {}
) => {
  const sellerID = sellerIDSelector();
  let suppliers = suppliersSelector(getState());
  suppliers = suppliers.filter(
    supplier =>
      supplier.file_status && supplier.file_status !== null && supplier.file_status !== 'completed'
  );
  while (suppliers.length > 0) {
    const requests = suppliers.map(supplier => {
      return Axios.get(
        AppConfig.BASE_URL_API +
          `sellers/${sellerID}/suppliers/${String(
            supplier.supplier_id
          )}/synthesis/progress?synthesis_file_id=${supplier.synthesis_file_id}`
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
      if (responses[index].data.progress === 100) dispatch(fetchSupplier(supplier.supplier_id));
      return responses[index].data.progress !== 100;
    });

    await timeout(2000);
  }
};

export const selectSupplier = (supplier: Supplier) => ({
  type: SELECT_SUPPLIER,
  payload: supplier,
});

export const updateSupplier = (supplier: Supplier) => ({
  type: UPDATE_SUPPLIER,
  payload: supplier,
});

export const addSupplier = (supplier: Supplier) => ({
  type: ADD_SUPPLIER,
  payload: supplier,
});

export const fetchSupplierTableColumns = () => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  let suppliersTableColumns: any = localStorage.getItem('suppliersTableColumns');
  if (!suppliersTableColumns) suppliersTableColumns = {};
  else suppliersTableColumns = JSON.parse(suppliersTableColumns);
  dispatch(setSupplierTableColumns(suppliersTableColumns));
};

export const setSupplierTableColumns = (column: any) => ({
  type: SET_SUPPLIERS_TABLE_COLUMNS,
  payload: column,
});

export const setSupplierTableTab = (tab: string) => ({
  type: SET_SUPPLIERS_TABLE_TAB,
  payload: tab,
});
