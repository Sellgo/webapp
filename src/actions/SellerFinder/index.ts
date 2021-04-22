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
  SET_ACTIVE_PRODUCT,
  SET_PRODUCT_SELLERS,
  SET_SELLER_PRODUCTS_COUNT,
  SET_SELLER_PRODUCTS_PAGE_COUNT,
  SET_SELLER_PRODUCTS_PAGE_NO,
  SET_SELLER_PRODUCTS_PAGE_SIZE,
} from '../../constants/SellerFinder';
import { sellerIDSelector } from '../../selectors/Seller';
import { AppConfig } from '../../config';
export interface SellersPayload {
  enableLoader: boolean;
}
export interface SellersProductsPayload {
  enableLoader: boolean;
  merchantId: string;
  pageSize: number;
  pageNo: number;
}

export interface ProductSellersPayload {
  enableLoader: boolean;
  merchantId: any;
  asin: string;
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

export const setActiveProductSellerStatus = (data: any) => async (dispatch: any) => {
  await dispatch(setProductData(data));
};
export const setActiveProduct = (data: any) => async (dispatch: any) => {
  await dispatch(setActiveProductData(data));
};

export const fetchSellerProducts = (payload: SellersProductsPayload) => async (dispatch: any) => {
  try {
    const sellerID = sellerIDSelector();
    const pagination = `page=${payload.pageNo}&per_page=${payload.pageSize}`;
    const url =
      AppConfig.BASE_URL_API +
      `sellers/${sellerID}/merchants/${payload.merchantId}/products?${pagination}`;
    if (payload.enableLoader) {
      await dispatch(fetchingSellerProducts(true));
    }
    const res = await Axios.get(url);
    if (res) {
      const { results, count, current_page, per_page, total_pages } = res.data;
      await dispatch(setSellerProducts(results));
      await dispatch(setProductsCount(count));
      await dispatch(setProductsPageCount(total_pages));
      await dispatch(setProductsPageSize(per_page));
      await dispatch(setProductsPageNo(current_page));
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
      AppConfig.BASE_URL_API +
      `sellers/${sellerID}/merchants/${payload.merchantId}/children?parent_asin=${payload.asin}`;
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
    await dispatch(fetchingProductSellers(false));
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

const setProductsCount = (count: number) => ({
  type: SET_SELLER_PRODUCTS_COUNT,
  data: count,
});

const setProductsPageCount = (count: number) => ({
  type: SET_SELLER_PRODUCTS_PAGE_COUNT,
  data: count,
});

const setProductsPageSize = (size: number) => ({
  type: SET_SELLER_PRODUCTS_PAGE_SIZE,
  data: size,
});

const setProductsPageNo = (page: number) => ({
  type: SET_SELLER_PRODUCTS_PAGE_NO,
  data: page,
});

const setProductData = (data: any) => ({
  type: SET_PRODUCT_SELLERS,
  data: data,
});
const setActiveProductData = (data: any) => ({
  type: SET_ACTIVE_PRODUCT,
  data: data,
});
