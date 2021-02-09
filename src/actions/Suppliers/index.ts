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
  supplierDetailsSelector,
  productsLoadingDataBusterSelector,
  profitFinderProducts,
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
  SET_TIME_EFFICIENCY,
  SET_SUPPLIER_DETAILS,
  IS_LOADING_SUPPLIER_PRODUCTS,
  SET_SUPPLIER_PRODUCTS,
  RESET_SUPPLIER_PRODUCTS,
  SET_SUPPLIER_PRODUCTS_TRACK_DATA,
  RESET_SUPPLIER,
  SET_SUPPLIER_PRODUCT_TRACKER_GROUP,
  UPDATE_SUPPLIER_PRODUCT_TRACK,
  UPDATE_SUPPLIER_FILTER_RANGES,
  findMinMaxRange,
  SET_SUPPLIER_SINGLE_PAGE_ITEMS_COUNT,
  FILTER_SUPPLIER_PRODUCTS,
  SEARCH_SUPPLIER_PRODUCTS,
  UPDATE_SUPPLIER_PRODUCT_TRACKS,
  UPDATE_PROFIT_FINDER_PRODUCTS,
  SET_SUPPLIER_PAGE_NUMBER,
  SET_STICKY_CHART,
  SET_CONTEXT_SCROLL,
  SET_SCROLL_TOP,
  SET_IS_SCROLL,
  SET_ACTIVE_COLUMN,
  SET_SORT_COLUMN,
  SET_PRODUCTS_LOADING_DATA_BUSTER,
  UPDATE_SUPPLIER_PRODUCT,
  SET_PF_PAGE_NO,
  SET_PF_PAGE_SIZE,
  SET_PF_PAGE_COUNT,
  SET_PF_PAGE_LOADING,
  FETCH_PF_FILTERS,
  LOADING_PF_FILTERS,
  SET_PF_SORT,
  SET_PF_SORT_DIRECTION,
  SET_PF_COUNT,
  SET_PF_ACTIVE_FILTERS,
  SET_PF_PRESET_FILTERS,
} from '../../constants/Suppliers';
import { SET_PROGRESS, SET_SPEED, SET_ETA } from '../../constants/UploadSupplier';
import { Product, ProfitFinderResponse } from '../../interfaces/Product';
import { success, error } from '../../utils/notifications';
import { updateTrackedProduct, setMenuItem, removeTrackedProduct } from './../ProductTracker';
import { UntrackSuccess } from '../../components/ToastMessages';
import { timeout } from '../../utils/timeout';
import { leads } from '../../selectors/LeadsTracker';
import { setLeads } from '../LeadsTracker';
import { variationsSelector } from '../../selectors/UploadSupplier';
import { ProfitFinderFilters } from '../../interfaces/Filters';

export interface Suppliers {
  supplierIds: number[];
  suppliersById: { [key: number]: Supplier };
}

export const setSuppliers = (suppliers: Suppliers) => ({
  type: SET_SUPPLIERS,
  payload: suppliers,
});

export const setLatestSupplier = (supplier: Supplier) => {
  localStorage.setItem('LATEST_SUPPLIER', JSON.stringify(supplier));
};

export const getLatestSupplier = () => {
  const latest = localStorage.getItem('LATEST_SUPPLIER');
  return latest ? JSON.parse(latest) : null;
};

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
    response.data[0].id = supplierID;
    response.data[0].file_status = 'completed';
    dispatch(updateSupplier(response.data[0]));
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

export const setLeadsTracker = (sellerId: number, supplierId: number) => async (
  dispatch: any,
  getState: () => any
) => {
  const existingSupplier = suppliersByIdSelector(getState())[supplierId];
  return Axios.post(
    AppConfig.BASE_URL_API + `sellers/${sellerId}/suppliers/${supplierId}/leads-tracker`
  )
    .then(json => {
      dispatch(
        updateSupplier({ ...existingSupplier, ...{ leads_tracker_status: json.data.status } })
      );
      dispatch(fetchSupplierDetails(supplierId));
      if (json.data.status === 'active') {
        success('Your unprofitable products are now being tracked in the background.');
      }
    })
    .catch(err => {
      // display error
      const { data, status } = err.response;
      if (status === 400 && data) {
        error(data);
      }
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
  const get_variations = variationsSelector(getState());

  const bodyFormData = new FormData();
  bodyFormData.set('get_variations', get_variations ? 'True' : 'False');
  bodyFormData.set('synthesis_file_id', String(synthesisId));
  return Axios.post(
    AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplierID}/synthesis/run`,
    bodyFormData
  )
    .then(() => {
      dispatch(updateSupplier({ ...existingSupplier, ...{ file_status: 'pending' } }));
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
      supplier.file_status !== 'completed' &&
      supplier.file_status !== 'inactive' &&
      supplier.file_status !== 'failed'
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

    await timeout(5000);
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

export const updateProductCost = (payload: any) => async (dispatch: any, getState: () => any) => {
  const { product_id, product_cost, id, product_track_id, supplierID } = payload;
  const sellerID = sellerIDSelector();
  const products = profitFinderProducts(getState());
  const bodyFormData = new FormData();
  bodyFormData.set('product_id', product_id);
  bodyFormData.set('product_cost', product_cost);
  bodyFormData.set('psd_id', id);
  if (product_track_id) {
    bodyFormData.set('product_track_id', product_track_id);
  }

  return Axios.post(
    AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplierID}/product/cost`,
    bodyFormData
  )
    .then(({ data }) => {
      success(`Product cost successfully updated!`);
      if (data) {
        const updated = products.map((p: any) => {
          if (p.id === id) {
            p = { ...p, ...data };
          }
          return p;
        });

        dispatch(updateProfitFinderProducts(updated));
      }
    })
    .catch(() => {
      error(`Failed to update product cost`);
    });
};

export const fetchSupplierProducts = (payload: ProfitFinderFilters) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  if (!payload.pagination) {
    dispatch(isLoadingSupplierProducts(true));
  }

  dispatch(setProfitFinderPageLoading(true));
  const sellerID = sellerIDSelector();
  const {
    per_page = 50,
    page = 1,
    query = '',
    params = {},
    sort = 'price',
    sortDirection = 'asc',
    search,
    activeFilters = [],
  } = payload;

  const pagination = `?page=${page}&per_page=${per_page}`;
  let sorting = '';
  let searching = '';
  if (sort) {
    sorting = `&sort=${sort}&sort_direction=${sortDirection}`;
  }
  if (search) {
    searching = `&search=${search}`;
  }

  const response: ProfitFinderResponse = await Axios.get(
    AppConfig.BASE_URL_API +
      `sellers/${sellerID}/suppliers/${payload.supplierID}/synthesis-data${pagination}${query}${sorting}${searching}`,
    { params }
  );
  const data = response.data;
  if (data && data.results) {
    const products: Product[] = data.results;
    dispatch(setSupplierProducts(products));
    dispatch(updateSupplierFilterRanges(findMinMaxRange(products)));
    dispatch(setProfitFinderPageNo(data.current_page));
    dispatch(setProfitFinderPageSize(data.per_page));
    dispatch(setProfitFinderPageCount(data.total_pages));
    dispatch(setProfitFinderSort(sort));
    dispatch(setProfitFinderSortDirection(sortDirection));
    dispatch(setProfitFinderTotalRecords(data.count));
    dispatch(setProfitFinderActiveFilters(activeFilters));
    dispatch(isLoadingSupplierProducts(false));
    dispatch(setProfitFinderPageLoading(false));

    return products;
  } else {
    dispatch(isLoadingSupplierProducts(false));
    dispatch(setProfitFinderPageLoading(false));

    error('Data not found');
  }
};

export const fetchProfitFinderFilters = (payload: any) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  try {
    dispatch(setFetchingProfitFinderFilters(true));
    const response = await getFilters(payload);
    if (!!response && response.status === 200) {
      dispatch(setProfitFinderFilters(response.data));
      dispatch(setFetchingProfitFinderFilters(false));
    }
  } catch (e) {
    dispatch(setFetchingProfitFinderFilters(false));
  }
};

const getFilters = async (payload: any) => {
  try {
    const sellerID = sellerIDSelector();
    return await Axios.get(
      AppConfig.BASE_URL_API +
        `sellers/${sellerID}/suppliers/${payload.supplierID}/synthesis-data?${payload.query}`
    );
  } catch (e) {
    console.log(e);
  }
};

export const setSupplierDetails = (supplier: Supplier) => ({
  type: SET_SUPPLIER_DETAILS,
  payload: supplier,
});

export const fetchSupplierDetails = (supplierID: any) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  const sellerID = sellerIDSelector();
  const response = await Axios.get(
    `${AppConfig.BASE_URL_API}sellers/${String(
      sellerID
    )}/suppliers-compact?supplier_id=${supplierID}`
  );
  if (response.data.length) {
    const supplier: Supplier = response.data[0];
    dispatch(setSupplierDetails(supplier));
    return supplier;
  }
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
    productTracker: { menuItem },
  } = getState();
  const sellerID = sellerIDSelector();
  const bodyFormData = new FormData();

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
          success(json.data.message);
          dispatch(updateSupplierProductTrack(json.data.object));
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
              dispatch(removeTrackedProduct(json.data.object.id));
            } else if (type === 'move-group') {
              if (json.data.message.length > 0) {
                success(json.data.message);
              }
              dispatch(updateTrackedProduct(json.data.object));
              dispatch(setMenuItem(menuItem));
            }
          } else {
            success(json.data.message);
            dispatch(updateSupplierProductTrack(json.data.object));
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

export const requestProductBulkTracking = (products: { product_id: number }[]) => (
  dispatch: any,
  getState: () => any
) => {
  const sellerID = sellerIDSelector();
  Axios.post(AppConfig.BASE_URL_API + `sellers/${sellerID}/bulk-track/products`, products)
    .then(json => {
      success('Request succeeded');
      dispatch(getSellerQuota());
      dispatch(updateSupplierProductTracks(json.data));
      const leadsData = leads(getState());
      if (leadsData) {
        const results = leadsData.map((lead: any) => {
          const p = json.data.find(
            (r: any) => r.product_id === lead.product_id && r.supplier_id === lead.supplier_id
          );
          let data = lead;
          if (p) {
            data = { ...data, tracking_status: p.status };
          }
          return data;
        });
        dispatch(setLeads({ results }));
      }
    })
    .catch(err => {
      console.log('err.response', err.response);
      if (err.response && err.response.status === 401) {
        dispatch(handleUnauthorizedMwsAuth());
      } else if (err.response && (err.response.status !== 200 || err.response.status !== 201)) {
        error(err.response.data.message);
      }
    });
};

export const requestProductBulkUnTracking = (products: { product_id: number }[]) => (
  dispatch: any,
  getState: () => any
) => {
  const sellerID = sellerIDSelector();
  Axios.post(AppConfig.BASE_URL_API + `sellers/${sellerID}/bulk-untrack/products`, products)
    .then(json => {
      success('Request succeeded');
      dispatch(getSellerQuota());
      dispatch(updateSupplierProductTracks(json.data));
      const leadsData = leads(getState());
      if (leadsData) {
        const results = leadsData.map((lead: any) => {
          const p = json.data.find(
            (r: any) => r.product_id === lead.product_id && r.supplier_id === lead.supplier_id
          );
          let data = lead;
          if (p) {
            data = { ...data, tracking_status: p.status };
          }
          return data;
        });
        dispatch(setLeads({ results }));
      }
    })
    .catch(err => {
      console.log('err.response', err.response);
      if (err.response && err.response.status === 401) {
        dispatch(handleUnauthorizedMwsAuth());
      } else if (err.response && err.response.status !== 200) {
        error(err.response.data.message);
      }
    });
};

export const updateSupplierProductTrack = (data: any) => ({
  type: UPDATE_SUPPLIER_PRODUCT_TRACK,
  payload: data,
});

export const updateSupplierProductTracks = (data: any) => ({
  type: UPDATE_SUPPLIER_PRODUCT_TRACKS,
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

export const updateSupplierSinglePageItemsCount = () => {
  const count = localStorage.getItem('supplierPageItemsCount');
  return {
    type: SET_SUPPLIER_SINGLE_PAGE_ITEMS_COUNT,
    payload: count ? parseInt(count) : 50,
  };
};

export const setSupplierPageNumber = (pageNumber: number) => ({
  type: SET_SUPPLIER_PAGE_NUMBER,
  payload: pageNumber,
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

export const saveSupplierDetails = (details: any) => (dispatch: any) => {
  return new Promise(resolve => {
    const sellerID = sellerIDSelector();
    const bodyFormData = new FormData();
    for (const param in details) {
      bodyFormData.set(param, details[param]);
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

export const updateSupplierDetails = (supplierID: string, details: any) => (dispatch: any) => {
  return new Promise(resolve => {
    const sellerID = sellerIDSelector();
    const bodyFormData = new FormData();
    bodyFormData.set('id', supplierID);
    for (const param in details) {
      bodyFormData.set(param, details[param]);
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

export const setStickyChart = (value: any) => ({
  type: SET_STICKY_CHART,
  payload: value,
});

export const setContextScroll = (value: any) => ({
  type: SET_CONTEXT_SCROLL,
  payload: value,
});

export const setScrollTop = (value: any) => ({
  type: SET_SCROLL_TOP,
  payload: value,
});

export const setIsScroll = (value: any) => ({
  type: SET_IS_SCROLL,
  payload: value,
});

export const setActiveColumn = (value?: string) => ({
  type: SET_ACTIVE_COLUMN,
  payload: value,
});

export const setSortColumn = (value?: string) => ({
  type: SET_SORT_COLUMN,
  payload: value,
});

export const triggerDataBuster = (synthesisFileID: number, productIDs: number[]) => (
  dispatch: any,
  getState: any
) => {
  const sellerID = sellerIDSelector();
  const productsLoadingDataBuster = productsLoadingDataBusterSelector(getState());
  const supplier = supplierDetailsSelector(getState());

  const bodyFormData = new FormData();
  bodyFormData.set('product_ids', String(productIDs.join(',')));
  bodyFormData.set('synthesis_file_id', String(synthesisFileID));

  dispatch(setProductsLoadingDataBuster([...productsLoadingDataBuster, ...productIDs]));
  return Axios.post(
    AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplier.supplier_id}/data-buster`,
    bodyFormData
  )
    .then(() => dispatch(pollDataBuster(productIDs)))
    .catch(err => {
      error(err.response.data.message);
    });
};

export const pollDataBuster = (productIDs?: number[]) => async (dispatch: any, getState: any) => {
  const sellerID = sellerIDSelector();
  const supplier = supplierDetailsSelector(getState());
  let productsToPoll = productIDs ? productIDs : productsLoadingDataBusterSelector(getState());

  do {
    const requests = productsToPoll.map(productId => {
      return Axios.get(
        AppConfig.BASE_URL_API +
          `sellers/${sellerID}/suppliers/${supplier.supplier_id}/data-buster/progress` +
          `?synthesis_file_id=${supplier.synthesis_file_id}&product_id=${productId}`
      );
    });

    const responses = await Promise.all(requests);
    responses.forEach(response => {
      if (response.data.data_buster_status !== 'processing') {
        dispatch(updateSupplierProduct(response.data));
        const productsLoadingDataBuster = productsLoadingDataBusterSelector(getState());
        dispatch(
          setProductsLoadingDataBuster(
            productsLoadingDataBuster.filter(i => i !== response.data.product_id)
          )
        );
        productsToPoll = productsToPoll.filter(i => i !== response.data.product_id);
      } else if (response.status !== 200) {
        error(response.data.message);
      }
    });

    await timeout(1000);
  } while (productsToPoll.length > 0);
};

export const setProductsLoadingDataBuster = (value: number[]) => ({
  type: SET_PRODUCTS_LOADING_DATA_BUSTER,
  payload: value,
});

export const updateSupplierProduct = (data: any) => ({
  type: UPDATE_SUPPLIER_PRODUCT,
  payload: data,
});

const setProfitFinderPageNo = (pageNo: number) => ({
  type: SET_PF_PAGE_NO,
  payload: pageNo,
});

const setProfitFinderPageSize = (pageSize: number) => ({
  type: SET_PF_PAGE_SIZE,
  payload: pageSize,
});

const setProfitFinderPageCount = (pageCount: number) => ({
  type: SET_PF_PAGE_COUNT,
  payload: pageCount,
});

const setProfitFinderPageLoading = (loading: boolean) => ({
  type: SET_PF_PAGE_LOADING,
  payload: loading,
});

const setProfitFinderFilters = (filters: any) => ({
  type: FETCH_PF_FILTERS,
  payload: filters,
});

const setFetchingProfitFinderFilters = (loading: boolean) => ({
  type: LOADING_PF_FILTERS,
  payload: loading,
});

const setProfitFinderSort = (sort: string) => ({
  type: SET_PF_SORT,
  payload: sort,
});

const setProfitFinderSortDirection = (sortDirection: string) => ({
  type: SET_PF_SORT_DIRECTION,
  payload: sortDirection,
});

const setProfitFinderTotalRecords = (count: number) => ({
  type: SET_PF_COUNT,
  payload: count,
});

const setProfitFinderActiveFilters = (filters: any[]) => ({
  type: SET_PF_ACTIVE_FILTERS,
  payload: filters,
});

export const setPresetFilters = (filterState: any) => async (dispatch: any) => {
  dispatch(setPresetFiltersState(filterState));
};

const setPresetFiltersState = (state: any) => ({
  type: SET_PF_PRESET_FILTERS,
  payload: state,
});
