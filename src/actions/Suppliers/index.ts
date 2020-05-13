import Axios from 'axios';
import { sellerIDSelector } from '../../selectors/Seller';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppConfig } from '../../config';
import { getSellerQuota, handleUnauthorizedMwsAuth } from '../Settings';
import {
  suppliersSelector,
  newSupplierIdSelector,
  getSynthesisId,
  suppliersByIdSelector,
} from '../../selectors/Supplier';
import { Supplier } from '../../interfaces/Supplier';
import {
  SET_SUPPLIERS,
  RESET_SUPPLIERS,
  UPDATE_SUPPLIER,
  SUPPLIER_QUOTA,
  ADD_SUPPLIER,
  SET_SUPPLIERS_TABLE_COLUMNS,
  SET_SUPPLIERS_TABLE_TAB,
  SET_SUPPLIER_NAME,
  SET_NEW_SEARCH,
  SET_TIME_EFFICIENCY,
  SET_SUPPLIER_DETAILS,
  IS_LOADING_SUPPLIER_PRODUCTS,
  SET_SUPPLIER_PRODUCTS,
  RESET_SUPPLIER_PRODUCTS,
  SET_SUPPLIER_PRODUCTS_TRACK_DATA,
  RESET_SUPPLIER,
  SET_SUPPLIER_PRODUCT_TRACKER_GROUP,
  UPDATE_SUPPLIER_PRODUCT,
  UPDATE_SUPPLIER_FILTER_RANGES,
  findMinMaxRange,
  SET_SUPPLIER_SINGLE_PAGE_ITEMS_COUNT,
  FILTER_SUPPLIER_PRODUCTS,
  SEARCH_SUPPLIER_PRODUCTS,
  UPDATE_PROFIT_FINDER_PRODUCTS,
} from '../../constants/Suppliers';
import { SET_PROGRESS, SET_SPEED, SET_ETA } from '../../constants/UploadSupplier';
import { Product } from '../../interfaces/Product';
import { success, error } from '../../utils/notifications';
import { updateTrackedProduct, setMenuItem, removeTrackedProduct } from './../ProductTracker';
import { UntrackSuccess } from '../../components/ToastMessages';

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
    if (supplier.file_status === 'completed') {
      return { ...supplier, ...{ progress: 100, speed: 0 } };
    }
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

export const deleteSupplier = (supplier: any) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  const sellerID = sellerIDSelector();
  const bodyFormData = new FormData();
  bodyFormData.set('status', 'inactive');
  Axios.patch(
    AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplier.supplier_id}`,
    bodyFormData
  )
    .then(json => {
      dispatch(updateSupplier(json.data));
    })
    .catch(() => {
      // display error
    });
};

export const setFavouriteSupplier = (supplierID: any, isFavourite: any) => (dispatch: any) => {
  const sellerID = sellerIDSelector();
  const bodyFormData = new FormData();
  bodyFormData.set('tag', isFavourite);

  return Axios.patch(
    AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplierID}`,
    bodyFormData
  )
    .then(json => {
      dispatch(updateSupplier(json.data));
    })
    .catch(() => {
      // display error
    });
};

export const supplierProgress = () => (dispatch: any) => {
  const sellerID = sellerIDSelector();
  return Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}/quota-meter`)
    .then(json => {
      dispatch(supplierQuota(json.data));
    })
    .catch(() => {
      // display error
    });
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
    .then(() => {
      dispatch(updateSupplier({ ...supplier, ...{ progress: 0, file_status: 'pending' } }));
      dispatch(fetchSynthesisProgressUpdates());
      success('Rerun successfully initiated!');
    })
    .catch(err => {
      if (err.response.status === 401) {
        dispatch(handleUnauthorizedMwsAuth());
      } else {
        error('Rerun failed. Try again!');
      }
    });
};

export const postSynthesisRun = (synthesisId: string) => async (
  dispatch: any,
  getState: () => any
) => {
  const sellerID = sellerIDSelector();
  const supplierID = newSupplierIdSelector(getState());
  const existingSupplier = suppliersByIdSelector(getState())[supplierID];

  const bodyFormData = new FormData();
  bodyFormData.set('synthesis_file_id', String(synthesisId));
  return Axios.post(
    AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplierID}/synthesis/run`,
    bodyFormData
  )
    .then(() => {
      dispatch(updateSupplier(existingSupplier));
      dispatch(fetchSynthesisProgressUpdates());
    })
    .catch(err => {
      if (err.response.status === 401) {
        dispatch(handleUnauthorizedMwsAuth());
      } else {
        error('Run failed. Try again!');
      }
    });
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
  const currSynthesisId = getSynthesisId(getState());
  suppliers = suppliers.filter(
    supplier =>
      supplier &&
      supplier.file_status &&
      supplier.file_status !== null &&
      supplier.file_status !== 'completed'
  );

  const handleUpdateSupplier = (response: any, index: any) => {
    const data = response.data;
    const supplier = suppliers[index];
    dispatch(
      updateSupplier({
        ...supplier,
        ...data,
      })
    );
  };

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
    responses.forEach(handleUpdateSupplier);

    suppliers = suppliers.filter((supplier, index) => {
      if (currSynthesisId === supplier.synthesis_file_id) {
        dispatch(setEta(responses[index].data.eta));
        dispatch(setProgress(responses[index].data.progress));
        dispatch(setSpeed(responses[index].data.speed));
      }

      if (responses[index].data.progress === 100) {
        dispatch(fetchSupplier(supplier.supplier_id));
      }
      return responses[index].data.progress !== 100;
    });

    await timeout(2000);
  }
};
export const supplierQuota = (supplier: Supplier) => ({
  type: SUPPLIER_QUOTA,
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
  if (!suppliersTableColumns) {
    suppliersTableColumns = {};
  } else {
    suppliersTableColumns = JSON.parse(suppliersTableColumns);
  }
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

export const isLoadingSupplierProducts = (value: boolean) => ({
  type: IS_LOADING_SUPPLIER_PRODUCTS,
  payload: value,
});

export const setSupplierProducts = (products: Product[]) => ({
  type: SET_SUPPLIER_PRODUCTS,
  payload: products,
});

export const resetSupplierProducts = () => ({ type: RESET_SUPPLIER_PRODUCTS });

export const fetchSupplierProducts = (supplierID: any) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(isLoadingSupplierProducts(true));

  const sellerID = sellerIDSelector();
  const response = await Axios.get(
    AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplierID}/synthesis-data-compact`
  );

  if (response.data.length) {
    dispatch(isLoadingSupplierProducts(false));
    const products = response.data;

    dispatch(setSupplierProducts(products));
    dispatch(updateSupplierFilterRanges(findMinMaxRange(products)));
  } else {
    dispatch(isLoadingSupplierProducts(false));
    error('Data not found');
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

export const fetchSupplierProductTrackerGroup = () => (dispatch: any) => {
  const sellerID = sellerIDSelector();
  return Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}/track/group`)
    .then(json => {
      dispatch(setSupplierProductTrackerGroup(json.data));
    })
    .catch(() => {
      // display error
    });
};

export const updateProductTrackingStatus = (
  status: string,
  productID?: number,
  productTrackerID?: number,
  productTrackerGroupID?: number,
  name?: string,
  supplierID?: number,
  currentState?: any,
  type?: any
) => (dispatch: any, getState: any) => {
  const {
    productTracker: { menuItem, trackerGroup },
  } = getState();
  const sellerID = sellerIDSelector();
  const bodyFormData = new FormData();
  const groupName =
    name === 'tracker' && type === 'move-group'
      ? productTrackerGroupID === -1
        ? 'Ungrouped'
        : trackerGroup.find((group: any) => group.id === productTrackerGroupID).name
      : '';

  bodyFormData.set('seller_id', sellerID || '');
  bodyFormData.set('status', status);
  if (productTrackerID) {
    bodyFormData.set('id', String(productTrackerID));
  }
  if (productID) {
    bodyFormData.set('product_id', String(productID));
  }
  if (productTrackerID && productTrackerGroupID) {
    bodyFormData.set('product_track_group_id', String(productTrackerGroupID));
  }
  if (supplierID) {
    bodyFormData.set('supplier_id', String(supplierID));
  }

  return !productTrackerID
    ? Axios.post(AppConfig.BASE_URL_API + `sellers/${sellerID}/track/product`, bodyFormData)
        .then(json => {
          dispatch(getSellerQuota());
          dispatch(updateSupplierProduct(json.data));
        })
        .catch(err => {
          if (err.response && err.response.status === 401) {
            dispatch(handleUnauthorizedMwsAuth());
          } else if (err.response && err.response.status === 400) {
            error(err.response.data.message);
          }
        })
    : Axios.patch(AppConfig.BASE_URL_API + `sellers/${sellerID}/track/product`, bodyFormData)
        .then(json => {
          dispatch(getSellerQuota());
          if (name === 'tracker') {
            if (type === 'untrack') {
              success(UntrackSuccess);
              dispatch(removeTrackedProduct(json.data.id));
            } else if (type === 'move-group') {
              success(`Product is moved to ${groupName}`);
              dispatch(updateTrackedProduct(json.data));
              dispatch(setMenuItem(menuItem));
            }
          } else {
            dispatch(updateSupplierProduct(json.data));
          }
        })
        .catch(err => {
          if (err.response && err.response.status === 401) {
            dispatch(handleUnauthorizedMwsAuth());
          } else if (err.response && err.response.status === 400) {
            error(err.response.data.message);
          }
        });
};

export const updateSupplierProduct = (data: any) => ({
  type: UPDATE_SUPPLIER_PRODUCT,
  payload: data,
});

export const updateProfitFinderProducts = (data: any) => ({
  type: UPDATE_PROFIT_FINDER_PRODUCTS,
  payload: {
    filteredProducts: data,
  },
});

export const updateSupplierFilterRanges = (filterRanges: any) => ({
  type: UPDATE_SUPPLIER_FILTER_RANGES,
  payload: filterRanges,
});

export const setSupplierSinglePageItemsCount = (itemsCount: number) => ({
  type: SET_SUPPLIER_SINGLE_PAGE_ITEMS_COUNT,
  payload: itemsCount,
});

export const getTimeEfficiency = () => (dispatch: any) => {
  const sellerID = sellerIDSelector();
  return Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}/time-efficiency`)
    .then(json => {
      dispatch(setTimeEfficiency(json.data));
    })
    .catch(() => {
      // display error
    });
};

export const postProductTrackGroupId = (supplierID: string, name: string) => () => {
  const sellerID = sellerIDSelector();
  const bodyFormData = new FormData();
  bodyFormData.set('name', name);
  bodyFormData.set('supplier_id', supplierID);
  bodyFormData.set('marketplace_id', 'US');
  return Axios.post(AppConfig.BASE_URL_API + `sellers/${sellerID}/track/group`, bodyFormData)
    .then(() => {
      // do nothing
    })
    .catch(() => {
      // display error
    });
};

export const saveSearch = (other: any) => (dispatch: any) => {
  return new Promise(resolve => {
    const sellerID = sellerIDSelector();
    const bodyFormData = new FormData();

    for (const param in other) {
      bodyFormData.set(param, other[param]);
    }

    return Axios.post(AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers`, bodyFormData)
      .then(json => {
        dispatch(addSupplier(json.data));
        dispatch(setSearch(json.data));
        resolve(json.data);
      })
      .catch(err => {
        for (const er in err.response.data) {
          error(err.response.data[er].length ? err.response.data[er][0] : err.response.data[er]);
        }
      });
  });
};

export const saveSupplierName = (name: string, other: any) => (dispatch: any) => {
  return new Promise(resolve => {
    const sellerID = sellerIDSelector();
    const bodyFormData = new FormData();
    bodyFormData.set('name', name);

    for (const param in other) {
      bodyFormData.set(param, other[param]);
    }
    return Axios.post(AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers`, bodyFormData)
      .then(json => {
        dispatch(addSupplier(json.data));
        dispatch(setSupplierName(json.data));
        resolve(json.data);
      })
      .catch(err => {
        for (const er in err.response.data) {
          error(err.response.data[er].length ? err.response.data[er][0] : err.response.data[er]);
        }
      });
  });
};

export const updateSupplierName = (name: string, supplierID: string, other: any) => (
  dispatch: any
) => {
  return new Promise(resolve => {
    const sellerID = sellerIDSelector();
    const bodyFormData = new FormData();
    bodyFormData.set('name', name);
    bodyFormData.set('id', supplierID);
    for (const param in other) {
      bodyFormData.set(param, other[param]);
    }
    return Axios.patch(
      AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplierID}`,
      bodyFormData
    )
      .then(json => {
        dispatch(updateSupplier(json.data));
        dispatch(setSupplierName(json.data));
        resolve(json.data);
      })
      .catch(err => {
        for (const er in err.response.data) {
          error(err.response.data[er].length ? err.response.data[er][0] : err.response.data[er]);
        }
      });
  });
};

export const updateSearch = (supplierID: string, other: any) => (dispatch: any) => {
  return new Promise(resolve => {
    const sellerID = sellerIDSelector();
    const bodyFormData = new FormData();
    bodyFormData.set('id', supplierID);
    for (const param in other) {
      bodyFormData.set(param, other[param]);
    }
    return Axios.patch(
      AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplierID}`,
      bodyFormData
    )
      .then(json => {
        dispatch(updateSupplier(json.data));
        dispatch(setSearch(json.data));
        resolve(json.data);
      })
      .catch(err => {
        for (const er in err.response.data) {
          error(err.response.data[er].length ? err.response.data[er][0] : err.response.data[er]);
        }
      });
  });
};

export const setTimeEfficiency = (data: {}) => ({
  type: SET_TIME_EFFICIENCY,
  payload: data,
});

export const setSupplierName = (data: {}) => ({
  type: SET_SUPPLIER_NAME,
  payload: data,
});

export const filterSupplierProducts = (value: string, filterData: any) => ({
  type: FILTER_SUPPLIER_PRODUCTS,
  payload: {
    value: value,
    filterData: filterData,
  },
});

export const searchSupplierProducts = (value: string, filterData: any) => ({
  type: SEARCH_SUPPLIER_PRODUCTS,
  payload: {
    value: value,
    filterData: filterData,
  },
});

export const setSearch = (data: {}) => ({
  type: SET_NEW_SEARCH,
  payload: data,
});

export const setProgress = (value: number) => ({
  type: SET_PROGRESS,
  payload: value,
});

export const setSpeed = (value: number) => ({
  type: SET_SPEED,
  payload: value,
});

export const setEta = (value: number) => ({
  type: SET_ETA,
  payload: value,
});
