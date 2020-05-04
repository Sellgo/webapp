import Axios from 'axios';
import { sellerIDSelector } from '../../selectors/Seller';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppConfig } from '../../config';
import { Product } from '../../interfaces/Product';
import {
  SET_SUPPLIER_PRODUCT_DETAILS,
  SET_SUPPLIER_PRODUCT_DETAIL_CHART_RANK,
  SET_SUPPLIER_PRODUCT_DETAIL_CHART_PRICE,
  SET_SUPPLIER_PRODUCT_DETAIL_CHART_INVENTORY,
  SET_SUPPLIER_PRODUCT_DETAIL_CHART_RATING,
  SET_SUPPLIER_PRODUCT_DETAIL_CHART_REVIEW,
  SET_PRODUCT_DETAIL_KPI,
  SET_SUPPLIER_PRODUCT_DETAIL_CHART_KPI,
  RESET_SUPPLIER_PRODUCT_DETAILS,
} from '../../constants/Products';

export const setSupplierProductDetails = (product: Product) => ({
  type: SET_SUPPLIER_PRODUCT_DETAILS,
  payload: product,
});

export const fetchSupplierProductDetails = (supplierID: any, productID: any) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  const sellerID = sellerIDSelector();
  const response = await Axios.get(
    AppConfig.BASE_URL_API +
      `sellers/${sellerID}/suppliers/${supplierID}/products/${productID}/detail`
  );
  if (response.data.length) {
    dispatch(setSupplierProductDetails(response.data[0]));
  }
};

export const fetchSupplierProductDetailChartRank = (productID: string) => async (dispatch: any) => {
  const response = await Axios.get(AppConfig.BASE_URL_API + `products/${productID}/history/rank`);
  if (response.data) {
    dispatch(setSupplierProductDetailChartRank(response.data));
  }
};

export const fetchSupplierProductDetailChartPrice = (productID: string) => async (
  dispatch: any
) => {
  const response = await Axios.get(AppConfig.BASE_URL_API + `products/${productID}/history/price`);
  if (response.data) {
    dispatch(setSupplierProductDetailChartPrice(response.data));
  }
};

export const fetchSupplierProductDetailChartInventory = (productID: string) => async (
  dispatch: any
) => {
  const response = await Axios.get(
    AppConfig.BASE_URL_API + `products/${productID}/history/inventory`
  );
  if (response.data) {
    dispatch(setSupplierProductDetailChartInventory(response.data));
  }
};

export const fetchSupplierProductDetailChartRating = (productID: string) => async (
  dispatch: any
) => {
  const response = await Axios.get(AppConfig.BASE_URL_API + `products/${productID}/history/rating`);
  if (response.data) {
    dispatch(setSupplierProductDetailChartRating(response.data));
  }
};

export const fetchSupplierProductDetailChartReview = (productID: string) => async (
  dispatch: any
) => {
  const response = await Axios.get(
    AppConfig.BASE_URL_API + `products/${productID}/history/review-count`
  );
  if (response.data) {
    dispatch(setSupplierProductDetailChartReview(response.data));
  }
};

export const fetchSupplierProductDetailChartKPI = (supplierID: any, productID: string) => async (
  dispatch: any
) => {
  const bodyFormData = new FormData();
  bodyFormData.set('supplier_id', supplierID);
  const response = await Axios.get(AppConfig.BASE_URL_API + `products/${productID}/history/kpi`);
  if (response.data) {
    dispatch(setSupplierProductDetailChartKPI(response.data));
  }
};

export const setSupplierProductDetailChartRank = (data: any) => ({
  type: SET_SUPPLIER_PRODUCT_DETAIL_CHART_RANK,
  payload: data,
});

export const setSupplierProductDetailChartPrice = (data: any) => ({
  type: SET_SUPPLIER_PRODUCT_DETAIL_CHART_PRICE,
  payload: data,
});

export const setSupplierProductDetailChartInventory = (data: any) => ({
  type: SET_SUPPLIER_PRODUCT_DETAIL_CHART_INVENTORY,
  payload: data,
});

export const setSupplierProductDetailChartRating = (data: any) => ({
  type: SET_SUPPLIER_PRODUCT_DETAIL_CHART_RATING,
  payload: data,
});

export const setSupplierProductDetailChartReview = (data: any) => ({
  type: SET_SUPPLIER_PRODUCT_DETAIL_CHART_REVIEW,
  payload: data,
});

export const setProductKPI = (data: any) => ({
  type: SET_PRODUCT_DETAIL_KPI,
  payload: data,
});

export const setSupplierProductDetailChartKPI = (data: any) => ({
  type: SET_SUPPLIER_PRODUCT_DETAIL_CHART_KPI,
  payload: data,
});

export const resetSupplierProductDetails = () => ({
  type: RESET_SUPPLIER_PRODUCT_DETAILS,
});
