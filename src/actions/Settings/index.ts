import Axios from 'axios';
import {
  SET_SELLER_AMAZON_MWS_AUTH,
  SET_AMAZON_MWS_AUTHORIZED,
  UPDATE_SELLER_AMAZON_MWS_AUTH,
  SET_SELLER_PROFILE_IMAGE,
  SET_SELLER_INFO,
  DELETE_SELLER_AMAZON_MWS_AUTH,
  SET_SELLER_QUOTA,
} from '../../constants/Settings';
import { AppConfig } from '../../config';
import { AmazonMWS, Seller } from '../../interfaces/Seller';
import { sellerIDSelector } from '../../selectors/Seller';
import { success, error } from '../../utils/notifications';
import isName from '../../utils/validations/isName';
import history from '../../history';
import { fetchSellerSubscription } from './Subscription';

export const getSellerAmazonMWSAuth = () => (dispatch: any) => {
  const sellerID = sellerIDSelector();
  return Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}/mws-auth`)
    .then(json => {
      if (json.data.length) dispatch(setSellerAmazonMWSAuth(json.data));
    })
    .catch(() => {
      // display error
    });
};

export const setSellerAmazonMWSAuth = (data: any) => ({
  type: SET_SELLER_AMAZON_MWS_AUTH,
  payload: data,
});

export const updateSellerAmazonMWSAuth = (data: AmazonMWS) => (dispatch: any) => {
  const sellerID = sellerIDSelector();
  const bodyFormData = new FormData();
  bodyFormData.append('marketplace_id', data.marketplace_id);
  bodyFormData.append('amazon_seller_id', data.amazon_seller_id);
  bodyFormData.append('token', data.token);

  return Axios.post(AppConfig.BASE_URL_API + `sellers/${sellerID}/mws-auth`, bodyFormData)
    .then(json => {
      dispatch(updateAmazonMWSAuth(json.data));
      dispatch(fetchSellerSubscription());
      success('Seller Amazon MWS Updated!');
    })
    .catch(err => {
      error(err.response.data.message || 'Invalid Credentials. Please try again!');
    });
};

export const updateAmazonMWSAuth = (data: any) => ({
  type: UPDATE_SELLER_AMAZON_MWS_AUTH,
  payload: data,
});

export const deleteAmazonMWSAuth = (data?: any) => ({
  type: DELETE_SELLER_AMAZON_MWS_AUTH,
  payload: data,
});

export const deleteSellerAmazonMWSAuth = (mwsAuthID: any) => (dispatch: any) => {
  const sellerID = sellerIDSelector();
  const bodyFormData = new FormData();
  bodyFormData.append('id', mwsAuthID);
  bodyFormData.append('status', 'inactive');
  return Axios.patch(AppConfig.BASE_URL_API + `sellers/${sellerID}/mws-auth`, bodyFormData)
    .then(() => {
      dispatch(deleteAmazonMWSAuth(mwsAuthID));
      dispatch(fetchSellerSubscription());
      success('Seller Amazon MWS deleted!');
    })
    .catch(() => {
      // display error
    });
};

export const getAmazonMWSAuthorized = () => (dispatch: any) => {
  const sellerID = sellerIDSelector();
  return Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}/mws-authorized`)
    .then(json => {
      dispatch(setAmazonMWSAuthorized(json.data.is_mws_authorized));
    })
    .catch(() => {
      // display error
    });
};
export const setAmazonMWSAuthorized = (amazonMWSAuthorized: boolean) => ({
  type: SET_AMAZON_MWS_AUTHORIZED,
  payload: amazonMWSAuthorized,
});

export const updateSellerProfileImage = (imageType: string, imagePath: any) => (dispatch: any) => {
  const bodyFormData = new FormData();
  bodyFormData.append('image_type', imageType);
  bodyFormData.append('image', imagePath);
  const sellerID = sellerIDSelector();

  return Axios.post(AppConfig.BASE_URL_API + `sellers/${sellerID}/image`, bodyFormData)
    .then(json => {
      dispatch(setSellerProfileImage(json.data));
      success('Seller Information Updated!');
    })
    .catch(() => {
      // display error
    });
};

export const deleteSellerProfileImage = (imageID: string) => (dispatch: any) => {
  const bodyFormData: any = new FormData();
  bodyFormData.append('id', imageID);
  const sellerID = sellerIDSelector();

  return Axios.delete(AppConfig.BASE_URL_API + `sellers/${sellerID}/image`, {
    data: { id: imageID },
  })
    .then(json => {
      dispatch(setSellerProfileImage(json.data));
      success(`Successfully deleted`);
    })
    .catch(() => {
      error(`There was an error deleting your profile image`);
    });
};

export const setSellerProfileImage = (data: any) => ({
  type: SET_SELLER_PROFILE_IMAGE,
  payload: data,
});

export const getSellerprofileImage = () => (dispatch: any) => {
  const sellerID = sellerIDSelector();
  return Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}/image`)
    .then(json => {
      dispatch(setSellerProfileImage(json.data));
    })
    .catch(() => {
      // display error
    });
};

export const getSellerInfo = () => (dispatch: any) => {
  const sellerID = sellerIDSelector();
  return Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}`)
    .then(json => {
      dispatch(setSellerInfo(json.data));
    })
    .catch(() => {
      // display error
    });
};

export const updateSellerInfo = (data: Seller) => (dispatch: any) => {
  const sellerID = sellerIDSelector();
  if (isName()(data.name) !== 'Invalid characters') {
    const bodyFormData = new FormData();
    bodyFormData.append('name', data.name);
    bodyFormData.append('email', data.email);
    return Axios.patch(AppConfig.BASE_URL_API + `sellers/${sellerID}`, bodyFormData)
      .then(json => {
        dispatch(setSellerInfo(json.data));
        success('Seller Information Updated!');
      })
      .catch(() => {
        // display error
      });
  } else {
    error('Use characters only in full name');
  }
};

export const setSellerInfo = (data: any) => ({
  type: SET_SELLER_INFO,
  payload: data,
});

export const getSellerQuota = () => (dispatch: any) => {
  const sellerID = sellerIDSelector();
  return Axios.get(AppConfig.BASE_URL_API + `sellers/${sellerID}/quota-meter`)
    .then(json => {
      dispatch(setSellerQuota(json.data));
    })
    .catch(() => {
      // display error
    });
};

export const setSellerQuota = (data: any) => ({
  type: SET_SELLER_QUOTA,
  payload: data,
});

export const handleUnauthorizedMwsAuth = () => (dispatch: any) => {
  dispatch(deleteAmazonMWSAuth());
  error('Unauthorized access! Please add Amazon Seller Central credentials');
  history.push('/settings/connectivity');
};
