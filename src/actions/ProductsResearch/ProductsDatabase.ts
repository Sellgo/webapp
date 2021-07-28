import axios from 'axios';

/* Config */
import { AppConfig } from '../../config';

/* Constants */
import { actionTypes } from '../../constants/ProductResearch/ProductsDatabase';
import { ProductsDatabasePayload } from '../../interfaces/ProductResearch/ProductsDatabase';

/* Selectors */
import { sellerIDSelector } from '../../selectors/Seller';

/* Action to update filters */
export const updateProductsDatabaseFilter = (payload: any) => {
  return {
    type: actionTypes.UPDATE_PRODUCTS_DATABASE_FILTER,
    payload,
  };
};

/* Action to set loading state for  products database */
export const isLoadingProductsDatabase = (payload: any) => {
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

/* 

/*********** Async Actions ************************ */

/* Action to fetch products database */
export const fetchProductsDatabase = (payload: ProductsDatabasePayload) => async (
  dispatch: any
) => {
  const { resetFilters = false } = payload;

  const sellerId = sellerIDSelector();

  // if passed with reset filters
  if (resetFilters) {
    dispatch(isLoadingProductsDatabase(false));
    dispatch(setProductsDatabase([]));
    return;
  }

  // if fetch with filteres

  const URL = `${AppConfig.BASE_URL_API}${sellerId}/products`;

  const response = await axios.post(URL);

  if (response && response.data) {
    console.log(response.data);
  }

  dispatch(isLoadingProductsDatabase(false));
  dispatch(setProductsDatabase([]));
};
