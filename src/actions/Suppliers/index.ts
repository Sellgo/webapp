import {
  SET_SUPPLIERS,
  RESET_SUPPLIERS,
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
import { suppliersSelector } from '../../selectors/Supplier';
import { Supplier } from '../../interfaces/Supplier';
import {
  SET_SUPPLIER_DETAILS,
  SET_SUPPLIER_PRODUCTS,
  RESET_SUPPLIER_PRODUCTS,
  SET_SUPPLIER_PRODUCTS_TRACK_DATA,
  RESET_SUPPLIER,
  SET_SUPPLIER_PRODUCT_TRACKER_GROUP,
  UPDATE_SUPPLIER_PRODUCT,
  UPDATE_SUPPLIER_FILTER_RANGES,
  findMinMaxRange,
} from '../../constants/Synthesis/Suppliers';
import { Product } from '../../interfaces/Product';

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

export const fetchSupplier = (supplierID: any) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  const sellerID = sellerIDSelector();

  const response = await Axios.get(
    `${AppConfig.BASE_URL_API}sellers/${String(
      sellerID
    )}/suppliers-compact?supplier_id=${supplierID}`
  );
  if (response.data.length) {
    dispatch(updateSupplier({ ...response.data[0], id: supplierID }));
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

export const resetSupplier = () => ({ type: RESET_SUPPLIER });

export const setSupplierProducts = (products: Product[]) => ({
  type: SET_SUPPLIER_PRODUCTS,
  payload: products,
});

export const resetSupplierProducts = () => ({ type: RESET_SUPPLIER_PRODUCTS });

export const fetchSupplierProducts = (supplierID: any) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  const sellerID = sellerIDSelector();
  const response = await Axios.get(
    AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplierID}/synthesis-data-compact`
  );
  if (response.data.length) {
    const products = response.data;
    dispatch(setSupplierProducts(products));
    dispatch(updateSupplierFilterRanges(findMinMaxRange(products)));
  }
};

export const setSupplierDetails = (supplier: Supplier) => ({
  type: SET_SUPPLIER_DETAILS,
  payload: supplier,
});

export const fetchSupplierDetails = (supplierID: any) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  const sellerID = sellerIDSelector();

  Axios.get(
    `${AppConfig.BASE_URL_API}sellers/${String(
      sellerID
    )}/suppliers-compact?supplier_id=${supplierID}`
  ).then(response => {
    if (response.data.length) {
      dispatch(setSupplierDetails(response.data[0]));
    }
  });
};

export const setSupplierProductsTrackData = (data: any) => ({
  type: SET_SUPPLIER_PRODUCTS_TRACK_DATA,
  payload: data,
});

export const fetchSupplierProductsTrackData = (supplierID: any) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  const sellerID = sellerIDSelector();
  const response = await Axios.get(
    AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplierID}/group/track-data`
  );
  if (response.data.length) {
    dispatch(setSupplierProductsTrackData(response.data[0]));
  }
};

export const setSupplierProductTrackerGroup = (data: any) => ({
  type: SET_SUPPLIER_PRODUCT_TRACKER_GROUP,
  payload: data,
});

export const fetchSupplierProductTrackerGroup = (supplierID: string) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  return Axios.get(
    AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplierID}/track/group`
  )
    .then(json => {
      dispatch(setSupplierProductTrackerGroup(json.data));
    })
    .catch(error => {});
};

export const updateProductTrackingStatus = (
  status: string,
  productID?: string,
  productTrackerID?: string,
  productTrackerGroupID?: string
) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  const bodyFormData = new FormData();

  bodyFormData.set('seller_id', sellerID || '');
  bodyFormData.set('status', status);

  if (productTrackerID) bodyFormData.set('id', productTrackerID);
  if (productID) bodyFormData.set('product_id', productID);
  if (productTrackerGroupID) bodyFormData.set('product_track_group_id', productTrackerGroupID);

  return !productTrackerID
    ? Axios.post(AppConfig.BASE_URL_API + `sellers/${sellerID}/track/product`, bodyFormData)
        .then(json => {
          dispatch(updateSupplierProduct(json.data));
        })
        .catch(error => {})
    : Axios.patch(AppConfig.BASE_URL_API + `sellers/${sellerID}/track/product`, bodyFormData)
        .then(json => {
          dispatch(updateSupplierProduct(json.data));
        })
        .catch(error => {});
};

export const updateSupplierProduct = (data: any) => ({
  type: UPDATE_SUPPLIER_PRODUCT,
  payload: data,
});

export const updateSupplierFilterRanges = (filterRanges: any) => ({
  type: UPDATE_SUPPLIER_FILTER_RANGES,
  payload: filterRanges,
});
