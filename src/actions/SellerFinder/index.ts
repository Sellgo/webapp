import Axios from 'axios';
import {
  FETCH_INVENTORY,
  FETCH_PRODUCT_SELLERS,
  FETCH_PRODUCT_SELLERS_ERROR,
  FETCH_PRODUCT_SELLERS_SUCCESS,
  FETCH_SELLER_PRODUCTS,
  FETCH_SELLER_PRODUCTS_ERROR,
  FETCH_SELLER_PRODUCTS_SUCCESS,
  FETCH_SELLERS,
  FETCH_SELLERS_ERROR,
  FETCH_SELLERS_SUCCESS,
} from '../../constants/SellerFinder';
import { sellerIDSelector } from '../../selectors/Seller';
import { AppConfig } from '../../config';
export interface SellersPayload {
  enableLoader: boolean;
}
export interface SellersProductsPayload {
  enableLoader: boolean;
  merchantId: string;
}

export interface ProductSellersPayload {
  enableLoader: boolean;
  merchantId: string;
}
export const fetchSellers = (payload: SellersPayload) => async (dispatch: any) => {
  try {
    const sellerID = sellerIDSelector();
    const url = AppConfig.BASE_URL_API + `sellers/${sellerID}/merchants`;
    if (payload.enableLoader) {
      await dispatch(fetchingSellers(true));
    }
    const res = await Axios.get(url);
    if (res) {
      dispatch(setSellers(res.data));
    }
    await dispatch(fetchingSellers(false));
  } catch (err) {
    await dispatch(fetchingSellers(false));
    await dispatch(fetchingError(err));
  }
};
export const fetchInventory = (data: any) => async (dispatch: any) => {
  await dispatch(fetchingInventory(data));
};

export const fetchSellerProducts = (payload: SellersProductsPayload) => async (dispatch: any) => {
  try {
    const sellerID = sellerIDSelector();
    const url =
      AppConfig.BASE_URL_API + `sellers/${sellerID}/merchants/${payload.merchantId}/products`;
    if (payload.enableLoader) {
      await dispatch(fetchingSellerProducts(true));
    }
    const res = await Axios.get(url);
    if (res) {
      console.log(res);
      await dispatch(setSellerProducts(res.data));
    }
    await dispatch(fetchingSellerProducts(false));
  } catch (err) {
    await dispatch(setSellerProductsError(err));
  }
};

export const fetchProductSellers = (payload: ProductSellersPayload) => async (dispatch: any) => {
  try {
    const sellerID = sellerIDSelector();
    const url =
      AppConfig.BASE_URL_API + `sellers/${sellerID}/merchants/${payload.merchantId}/products`;
    if (payload.enableLoader) {
      await dispatch(fetchingProductSellers(true));
    }
    const res = await Axios.get(url);
    if (res) {
      console.log(res);
      await dispatch(setProductSellers(res.data));
    }
    await dispatch(fetchingProductSellers(false));
  } catch (err) {
    await dispatch(setProductSellersError(err));
  }
};
const fetchingSellers = (fetching: boolean) => ({
  type: FETCH_SELLERS,
  data: fetching,
});

const setSellers = (data: any[]) => ({
  type: FETCH_SELLERS_SUCCESS,
  data,
});

const fetchingError = (error: any) => ({
  type: FETCH_SELLERS_ERROR,
  data: error,
});

const fetchingInventory = (data: any) => ({
  type: FETCH_INVENTORY,
  data,
});

const fetchingSellerProducts = (loading: boolean) => ({
  type: FETCH_SELLER_PRODUCTS,
  data: loading,
});

const setSellerProducts = (data: any) => ({
  type: FETCH_SELLER_PRODUCTS_SUCCESS,
  data,
});

const setSellerProductsError = (error: any) => ({
  type: FETCH_SELLER_PRODUCTS_ERROR,
  data: error,
});

const fetchingProductSellers = (loading: boolean) => ({
  type: FETCH_PRODUCT_SELLERS,
  data: loading,
});

const setProductSellers = (data: any) => ({
  type: FETCH_PRODUCT_SELLERS_SUCCESS,
  data,
});

const setProductSellersError = (error: any) => ({
  type: FETCH_PRODUCT_SELLERS_ERROR,
  data: error,
});
