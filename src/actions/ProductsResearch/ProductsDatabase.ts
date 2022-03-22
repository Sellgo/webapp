import axios from 'axios';

/* Config */
import { AppConfig } from '../../config';

/* Constants */
import {
  actionTypes,
  FILTER_QUERY_KEY_MAPPER,
  F_TYPES,
} from '../../constants/ProductResearch/ProductsDatabase';

/* Interfaces */
import {
  ProductsDatabaseFilters,
  ProductsDatabasePayload,
  ShowFilterMessage,
} from '../../interfaces/ProductResearch/ProductsDatabase';

/* Selectors */
import { sellerIDSelector } from '../../selectors/Seller';
import { error, success } from '../../utils/notifications';
import { downloadFile } from '../../utils/download';
import { getProductsDatabasePaginationInfo } from '../../selectors/ProductResearch/ProductsDatabase';

/* Action to update filters */
export const updateProductsDatabaseFilter = (payload: any) => {
  return {
    type: actionTypes.UPDATE_PRODUCTS_DATABASE_FILTER,
    payload,
  };
};

/* Action to set loading state for  products database */
export const isLoadingProductsDatabase = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_PRODUCTS_DATABASE,
    payload,
  };
};

/* Action to set products database */
export const setProductsDatabase = (payload: any) => {
  return {
    type: actionTypes.SET_PRODUCTS_DATABASE,
    payload,
  };
};

/* Action to set products database pagination info */
export const setProductsDatabasePaginationInfo = (payload: any) => {
  return {
    type: actionTypes.SET_PRODUCTS_DATABASE_PAGINATION_INFO,
    payload,
  };
};

/* Action to set filter state */
export const setProductsDatabaseFilters = (payload: ProductsDatabaseFilters[]) => {
  return {
    type: actionTypes.SET_PRODUCTS_DATABASE_FILTERS,
    payload,
  };
};

/* Action to set and show filter messages */
export const setProductsDatabaseFilterMessage = (payload: ShowFilterMessage) => {
  return {
    type: actionTypes.SHOW_FILTER_MESSAGE,
    payload,
  };
};

/* Parse the filter payload for reuqest */
export const parseFilterPayload = (productFilters: any) => {
  const filterPayloadKeys = Object.keys(productFilters);
  return filterPayloadKeys.reduce((acc: any, key: string) => {
    const f: any = productFilters[key];
    const { keyName, type } = FILTER_QUERY_KEY_MAPPER[key];
    if (type === F_TYPES.TEXT && f) {
      return {
        ...acc,
        [keyName]: f,
      };
    }

    if (type === F_TYPES.MIN_MAX) {
      if (f.min || f.max) {
        return {
          ...acc,
          [`min_${keyName}`]: Number(f.min) || null,
          [`max_${keyName}`]: Number(f.max) || null,
        };
      }
    }

    if (type === F_TYPES.MULTIPLE_CHECK_BOX && f && f.length > 0) {
      return {
        ...acc,
        [keyName]: f,
      };
    }

    if (type === F_TYPES.INPUT_INCLUDE_EXCLUDE) {
      let newAcc = acc;
      if (f.include) {
        newAcc = {
          ...newAcc,
          [`include_${keyName}`]: f.include.split(','),
        };
      }

      if (f.exclude) {
        newAcc = {
          ...newAcc,
          [`exclude_${keyName}`]: f.exclude.split(','),
        };
      }
      return newAcc;
    }

    if (type === F_TYPES.CHECK_BOX && Object.keys(f).length > 0) {
      // At least one checkbox is selected
      if (Object.keys(f).find(key => f[key])) {
        return {
          ...acc,
          [keyName]: f,
        };
      }
    }

    return acc;
  }, {});
};
/*********** Async Actions ************************ */

/* Export product database table */
export const exportProductDatabaseTable = (requestPayload: any, fileFormat: string) => async (
  dispatch: any,
  getState: any
) => {
  try {
    const sellerID = sellerIDSelector();
    const state = getState();
    const paginationInfo = getProductsDatabasePaginationInfo(state);
    const sort = paginationInfo.sort?.field && paginationInfo.sort?.by ? paginationInfo.sort : null;
    const { data } = await axios.post(`${AppConfig.BASE_URL_API}${sellerID}/products`, {
      ...requestPayload,
      page: paginationInfo.current_page,
      is_export: true,
      file_format: fileFormat,
      sort,
    });

    if (data) {
      const { url } = data;
      if (url) {
        await downloadFile(url);
        success('File successfully exported');
      } else {
        error('Export not available.');
      }
    }
  } catch (err) {
    const { status, data } = err.response;

    if (status === 403) {
      error(data.message);
    }
  }
};

/* Store filter in local storage */
export const storeProductDatabaseFilter = (sellerDatabaseFilter: any) => {
  localStorage.setItem('productDatabaseFilters', JSON.stringify(sellerDatabaseFilter));
};

/* Remove filter from local storage */
export const removeProductDatabaseFilters = () => {
  localStorage.removeItem('productDatabaseFilters');
};

/* Extract and parse filter from local storage */
export const extractProductDatabaseFilters = () => {
  const storedFilters = JSON.parse(localStorage.getItem('productDatabaseFilters') || '{}');
  return storedFilters;
};

/* Action to fetch products database */
export const fetchProductsDatabase = (payload: ProductsDatabasePayload) => async (
  dispatch: any
) => {
  try {
    const {
      resetFilters = false,
      page = 1,
      sort,
      withoutLoader = false,
      isExport = false,
      fileFormat = 'csv',
      filterPayload,
    } = payload;

    const sellerId = sellerIDSelector();

    // if passed with reset filters
    if (resetFilters) {
      dispatch(isLoadingProductsDatabase(false));
      dispatch(setProductsDatabase([]));
      dispatch(setProductsDatabasePaginationInfo({ total_pages: 0, current_page: 0, count: 0 }));
      removeProductDatabaseFilters();
      return;
    }

    // if fetch with filters
    let productsDatabaseFilters;
    if (filterPayload) {
      productsDatabaseFilters = parseFilterPayload(filterPayload);
      storeProductDatabaseFilter(productsDatabaseFilters);
    } else {
      productsDatabaseFilters = extractProductDatabaseFilters();
    }

    let requestPayload = {
      ...productsDatabaseFilters,
      page: page,
    };

    // add the sorting payload if applicable
    if (sort && sort.by && sort.field) {
      requestPayload = {
        ...requestPayload,
        sort: sort,
      };
    }

    const URL = `${AppConfig.BASE_URL_API}${sellerId}/products`;

    if (isExport && fileFormat) {
      dispatch(exportProductDatabaseTable(requestPayload, fileFormat));
      return;
    }

    dispatch(isLoadingProductsDatabase(!withoutLoader));

    const { data } = await axios.post(URL, requestPayload);

    if (data) {
      dispatch(setProductsDatabase(data.results));
      dispatch(setProductsDatabaseFilterMessage({ show: false, message: '', type: 'info' }));
      dispatch(setProductsDatabasePaginationInfo({ ...data.page_info, sort }));
      dispatch(isLoadingProductsDatabase(false));

      if (data.results.length === 0) {
        error('No products found');
      }
    }
  } catch (err) {
    dispatch(isLoadingProductsDatabase(false));
    dispatch(setProductsDatabase([]));

    const { response } = err as any;
    const { status, data } = response;

    if (status === 429) {
      error(data.message);
    }

    dispatch(
      setProductsDatabaseFilterMessage({
        show: status === 400,
        message: data.message || '',
        type: 'error',
      })
    );
    console.error('Error fetching seller database', err);
  }
};
