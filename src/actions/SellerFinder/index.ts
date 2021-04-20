import Axios from 'axios';
import {
  FETCH_INVENTORY,
  FETCH_SELLERS,
  FETCH_SELLERS_ERROR,
  FETCH_SELLERS_SUCCESS,
} from '../../constants/SellerFinder';
import { sellerIDSelector } from '../../selectors/Seller';
import { AppConfig } from '../../config';
export interface SellersPayload {
  enableLoader: boolean;
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
