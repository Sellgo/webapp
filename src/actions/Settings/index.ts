import Axios from 'axios';
import {
  SET_BASIC_INFO_SELLER,
  UPDATE_BASIC_INFO_SELLER,
  GET_BASIC_INFO_SELLER,
  SET_AMAZON_MWS,
  UPLOAD_SELLER_IMAGE,
  GET_AMAZON_MWS,
  PATCH_AMAZON_MWS,
  SIDE_BAR_EXPANDED,
  SET_AMAZON_MWS_AUTHORIZED,
} from '../../constants/constants';
import { AppConfig } from '../../config';
import { AmazonMWS, Seller } from '../../interfaces/Seller';

export const getMWSAuth = () => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  return Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}/mws-auth`)
    .then(json => {
      dispatch(reduceGetMWSAuth(json.data));
    })
    .catch(() => {});
};

export const deleteMWSAuth = (mws_auth_id: any) => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  const bodyFormData = new FormData();
  bodyFormData.append('id', mws_auth_id);
  bodyFormData.append('status', 'inactive');
  return Axios.patch(AppConfig.BASE_URL_API + `sellers/${sellerID}/mws-auth`, bodyFormData)
    .then(json => {
      dispatch(reduceDeleteMWSAuth(json.data));
    })
    .catch(() => {});
};

export const getAmazonMWSAuthorized = () => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  return Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}/mws-authorized`)
    .then(json => {
      dispatch(setAmazonMWSAuthorized(json.data.is_mws_authorized));
    })
    .catch(() => {});
};

export const postSellerImage = (imageType: string, imagePath: any) => (dispatch: any) => {
  const bodyFormData = new FormData();
  bodyFormData.append('image_type', imageType);
  bodyFormData.append('image', imagePath);
  const sellerID = localStorage.getItem('userId');

  return Axios.post(AppConfig.BASE_URL_API + `sellers/${sellerID}/image`, bodyFormData)
    .then(json => {
      dispatch(reduceUpdatedImage(json.data));
    })
    .catch(() => {});
};

export const getSellerImage = () => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');

  return Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}/image`)
    .then(json => {
      dispatch(reduceUpdatedImage(json.data));
    })
    .catch(() => {});
};

export const updateBasicInfoSeller = (data: Seller) => (dispatch: any) => {
  const sellerID = data.id;
  const bodyFormData = new FormData();
  bodyFormData.append('name', data.name);
  bodyFormData.append('email', data.email);

  return Axios.patch(AppConfig.BASE_URL_API + `sellers/${sellerID}`, bodyFormData)
    .then(json => {
      dispatch({
        type: UPDATE_BASIC_INFO_SELLER,
        data: { key: 'success', value: true },
      });
      setTimeout(() => {
        dispatch({
          type: UPDATE_BASIC_INFO_SELLER,
          data: { key: 'success', value: false },
        });
      }, 1000);

      return json.data;
    })
    .catch(() => {
      dispatch({
        type: UPDATE_BASIC_INFO_SELLER,
        data: { key: 'success', value: false },
      });
    });
};

export const getBasicInfoSeller = () => (dispatch: any) => {
  const sellerID = localStorage.getItem('userId');
  return Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}`)
    .then(json => {
      dispatch(getBasicInfoSellerDispatch(json.data));
      return json.data;
    })
    .catch(error => {});
};

export const updateAmazonMWS = (sellerID: string, data: AmazonMWS) => (dispatch: any) => {
  const bodyFormData = new FormData();
  bodyFormData.append('marketplace_id', data.marketplace_id);
  bodyFormData.append('amazon_seller_id', data.amazon_seller_id);
  bodyFormData.append('token', data.token);

  return Axios.post(AppConfig.BASE_URL_API + `sellers/${sellerID}/mws-auth`, bodyFormData)
    .then(json => {
      getMWSAuth()(dispatch);
      dispatch({
        type: UPDATE_BASIC_INFO_SELLER,
        data: { key: 'success', value: true },
      });
    })
    .catch(error => {
      setTimeout(() => {
        dispatch({
          type: UPDATE_BASIC_INFO_SELLER,
          data: { key: 'success', value: false },
        });
      }, 1000);
    });
};

export const reduceUpdatedImage = (data: any) => ({
  type: UPLOAD_SELLER_IMAGE,
  data,
});

export const reduceGetMWSAuth = (data: any) => ({
  type: GET_AMAZON_MWS,
  data,
});

export const reduceDeleteMWSAuth = (data: any) => ({
  type: PATCH_AMAZON_MWS,
  data,
});

export const getBasicInfoSellerDispatch = (data: any) => ({
  type: GET_BASIC_INFO_SELLER,
  data,
});

export const setBasicInfoSeller = (data: any) => ({
  type: SET_BASIC_INFO_SELLER,
  data,
});

export const setAmazonMWS = (data: any) => ({
  type: SET_AMAZON_MWS,
  data,
});

export const sideBarExpanded = (data: any) => ({
  type: SIDE_BAR_EXPANDED,
  data,
});

export const setAmazonMWSAuthorized = (amazonMWSAuthorized: boolean) => ({
  type: SET_AMAZON_MWS_AUTHORIZED,
  payload: amazonMWSAuthorized,
});
