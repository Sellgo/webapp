import Axios from 'axios';
import { sellerIDSelector } from '../../selectors/Seller';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppConfig } from '../../config';
import { IS_LOADING_TRACKER_PRODUCTS, SET_TRACKER_PRODUCTS } from '../../constants/Tracker';
import { Product } from '../../interfaces/Product';
import { success, error } from '../../utils/notifications';

export const isLoadingTrackerProducts = (value: boolean) => ({
  type: IS_LOADING_TRACKER_PRODUCTS,
  payload: value,
});

export const setTrackerProducts = (products: Product[]) => ({
  type: SET_TRACKER_PRODUCTS,
  payload: products,
});

export const fetchTrackerProducts = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  console.log('!!! fetchTrackerProducts !!!');

  dispatch(isLoadingTrackerProducts(true));

  const sellerID = sellerIDSelector();
  const response = await Axios.get(
    AppConfig.BASE_URL_API + `sellers/${sellerID}/product-track-data?per_page=5&page=1&period=60`
  );

  console.log('fetchTrackerProducts response', response);

  if (response.data) {
    dispatch(isLoadingTrackerProducts(false));
    const products = response.data;

    dispatch(setTrackerProducts(products));
    //dispatch(updateTrackerFilterRanges(findMinMaxRange(products)));
  } else {
    dispatch(isLoadingTrackerProducts(false));
    error('Data not found');
  }
};
