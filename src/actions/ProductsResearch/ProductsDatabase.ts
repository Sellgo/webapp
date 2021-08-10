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
} from '../../interfaces/ProductResearch/ProductsDatabase';

/* Selectors */
import { sellerIDSelector } from '../../selectors/Seller';
import { error, success } from '../../utils/notifications';
import { downloadFile } from '../../utils/download';

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

    if (type === F_TYPES.INPUT_INCLUDE_EXCLUDE) {
      let newAcc = acc;
      if (f.include) {
        newAcc = {
          ...acc,
          [`include_${keyName}`]: f.include.split(','),
        };
      }

      if (f.exclude) {
        newAcc = {
          ...acc,
          [`exclude_${keyName}`]: f.exclude.split(','),
        };
      }
      return newAcc;
    }

    if (type === F_TYPES.CHECK_BOX && f.checkedItems) {
      return {
        ...acc,
        [keyName]: f.checkedItems,
      };
    }

    return acc;
  }, {});
};
/*********** Async Actions ************************ */

/* Export seller database table */
export const exportProductDatabaseTable = (requestPayload: any) => async () => {
  try {
    const sellerID = sellerIDSelector();

    const { data } = await axios.post(
      `${AppConfig.BASE_URL_API}${sellerID}/products`,
      requestPayload
    );

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
      return;
    }

    // if fetch with filteres
    const productsDatabaseFilters = parseFilterPayload(filterPayload);

    let requestPayload = {
      ...productsDatabaseFilters,
      page,
    };

    // add the sorting payload if applicable
    if (sort && sort.by && sort.field) {
      requestPayload = {
        ...requestPayload,
        sort,
      };
    }
    const URL = `${AppConfig.BASE_URL_API}${sellerId}/products`;

    if (isExport && fileFormat) {
      dispatch(exportProductDatabaseTable(requestPayload));
      return;
    }

    dispatch(isLoadingProductsDatabase(!withoutLoader));

    const { data } = await axios.post(URL, requestPayload);

    if (data) {
      dispatch(setProductsDatabase(data.results));
      dispatch(setProductsDatabasePaginationInfo(data.page_info));
      dispatch(isLoadingProductsDatabase(false));
    }
  } catch (err) {
    dispatch(isLoadingProductsDatabase(false));
    setProductsDatabase([]);
  }
};
