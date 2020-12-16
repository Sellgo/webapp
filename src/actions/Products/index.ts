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
  SET_FETCHING_RANK,
  SET_FETCHING_PRICE,
  SET_FETCHING_INVENTORY,
  SET_FETCHING_RATING,
  SET_FETCHING_REVIEW,
  SET_FETCHING_KPI,
  SET_FETCHING_SELLER_INVENTORY,
  SET_SUPPLIER_PRODUCT_DETAIL_CHART_SELLER_INVENTORY,
  SET_ACTIVE_EXPORT_FILES,
  FETCHING_ACTIVE_EXPORTS,
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
  dispatch(setSupplierProductDetails(response.data[0]));
};

export const fetchSupplierProductDetailChartRank = (productID: string, period?: number) => async (
  dispatch: any
) => {
  let queryString = '?';
  if (period) {
    queryString += 'period=' + period;
  }
  dispatch(setFetchingRank(true));
  const response = await Axios.get(
    AppConfig.BASE_URL_API + `products/${productID}/history/rank${queryString}`
  );
  dispatch(setSupplierProductDetailChartRank(response.data));
  dispatch(setFetchingRank(false));
};

export const fetchSupplierProductDetailChartPrice = (productID: string, period?: number) => async (
  dispatch: any
) => {
  let queryString = '?';
  if (period) {
    queryString += 'period=' + period;
  }
  dispatch(setFetchingPrice(true));
  const response = await Axios.get(
    AppConfig.BASE_URL_API + `products/${productID}/history/price${queryString}`
  );
  dispatch(setSupplierProductDetailChartPrice(response.data));
  dispatch(setFetchingPrice(false));
};

export const fetchSupplierProductDetailChartInventory = (
  productID: string,
  period?: number
) => async (dispatch: any) => {
  let queryString = '?';
  if (period) {
    queryString += 'period=' + period;
  }
  dispatch(setFetchingInventory(true));
  const response = await Axios.get(
    AppConfig.BASE_URL_API + `products/${productID}/history/inventory${queryString}`
  );
  dispatch(setSupplierProductDetailChartInventory(response.data));
  dispatch(setFetchingInventory(false));
};

export const fetchSupplierProductDetailChartRating = (productID: string, period?: number) => async (
  dispatch: any
) => {
  let queryString = '?';
  if (period) {
    queryString += 'period=' + period;
  }
  dispatch(setFetchingRating(true));
  const response = await Axios.get(
    AppConfig.BASE_URL_API + `products/${productID}/history/rating${queryString}`
  );
  dispatch(setSupplierProductDetailChartRating(response.data));
  dispatch(setFetchingRating(false));
};

export const fetchSupplierProductDetailChartReview = (productID: string, period?: number) => async (
  dispatch: any
) => {
  let queryString = '?';
  if (period) {
    queryString += 'period=' + period;
  }
  dispatch(setFetchingReview(true));
  const response = await Axios.get(
    AppConfig.BASE_URL_API + `products/${productID}/history/review-count${queryString}`
  );
  dispatch(setFetchingReview(false));
  dispatch(setSupplierProductDetailChartReview(response.data));
};

export const fetchSupplierProductDetailChartSellerInventory = (
  productID: string,
  period?: number
) => async (dispatch: any) => {
  let queryString = '?';
  if (period) {
    queryString += 'period=' + period;
  }
  dispatch(setFetchingSellerInventory(true));
  const response = await Axios.get(
    AppConfig.BASE_URL_API + `products/${productID}/history/seller-inventory${queryString}`
  );
  dispatch(setSupplierProductDetailChartSellerInventory(response.data));
  dispatch(setFetchingSellerInventory(false));
};

export const fetchSupplierProductDetailChartKPI = (
  supplierID: any,
  productID: string,
  period?: number
) => async (dispatch: any) => {
  let queryString = '?';

  if (period) {
    queryString += 'period=' + period;
  }

  if (supplierID) {
    queryString += 'supplier_id' + supplierID;
  }

  dispatch(setFetchingKpi(true));
  const response = await Axios.post(
    AppConfig.BASE_URL_API + `products/${productID}/history/kpi${queryString}`
  );
  dispatch(setSupplierProductDetailChartKPI(response.data));
  dispatch(setFetchingKpi(false));
};

export const setFetchingRank = (isFetching: boolean) => ({
  type: SET_FETCHING_RANK,
  payload: isFetching,
});

export const setFetchingPrice = (isFetching: boolean) => ({
  type: SET_FETCHING_PRICE,
  payload: isFetching,
});

export const setFetchingInventory = (isFetching: boolean) => ({
  type: SET_FETCHING_INVENTORY,
  payload: isFetching,
});

export const setFetchingRating = (isFetching: boolean) => ({
  type: SET_FETCHING_RATING,
  payload: isFetching,
});

export const setFetchingReview = (isFetching: boolean) => ({
  type: SET_FETCHING_REVIEW,
  payload: isFetching,
});

export const setFetchingSellerInventory = (isFetching: boolean) => ({
  type: SET_FETCHING_SELLER_INVENTORY,
  payload: isFetching,
});

export const setFetchingKpi = (isFetching: boolean) => ({
  type: SET_FETCHING_KPI,
  payload: isFetching,
});

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

export const setSupplierProductDetailChartSellerInventory = (data: any) => ({
  type: SET_SUPPLIER_PRODUCT_DETAIL_CHART_SELLER_INVENTORY,
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

export const exportResults = async (payload: any, supplierID: any) => {
  try {
    const sellerID = sellerIDSelector();

    const res = await Axios.post(
      AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${supplierID}/synthesis/export`,
      payload,
      {
        responseType: 'blob',
      }
    );
    return res.data;
  } catch (e) {
    console.log('error', e);
  }
};

export const fetchActiveExportFiles = () => async (dispatch: any) => {
  try {
    const sellerID = sellerIDSelector();
    dispatch(setFetchingActiveExports(true));
    const res = await Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}/active-exports`);
    dispatch(setActiveExportFiles(res.data));
    dispatch(setFetchingActiveExports(false));
  } catch (e) {
    console.log('error', e);
  }
};

export const setActiveExportFiles = (data: any) => ({
  type: SET_ACTIVE_EXPORT_FILES,
  payload: data,
});

export const setFetchingActiveExports = (loading: boolean) => ({
  type: FETCHING_ACTIVE_EXPORTS,
  payload: loading,
});
