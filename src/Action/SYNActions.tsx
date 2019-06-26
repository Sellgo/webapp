import axios from 'axios';
import {
  URLS,
  SET_SELLERS
} from '../constant/constant';

// export interface Field {
//   key: string;
//   value: any;
// }

// export interface SellField {
//   name?: string;
//   id: string;
//   email?: string;
//   auth0_user_id?: string;
//   firstName?: string;
//   lastName?: string;
// }
// export interface MWSinfo {
//   marketplace_id: string;
//   seller_id: string;
//   token: string;
// }

const headers = {
  Authorization: `Bearer ${localStorage.getItem('idToken')}`,
  'Content-Type': 'application/json',
};

// export const updateBasicInfoSeller = (data: SellField) => (dispatch: any) => {
//   return axios({
//     method: 'PATCH',
//     url: URLS.BASE_URL_API + `seller/`,
//     data,
//     headers,
//   })
//     .then(json => {
//       return json.data;
//     })
//     .catch(error => { });
// };

export const getSellers = () => (dispatch: any) => {
  return axios({
    method: 'get',
    url: URLS.BASE_URL_API + 'seller/1000000001/supplier/',
    headers,
  })
    .then(json => {
      console.log(json.data)
      dispatch(setSellers(json.data));
      // return json.data;
    })
    .catch(error => { });
};

// export const updateAmazoneMWS = (id: string, data: MWSinfo) => (dispatch: any) => {
//   return axios({
//     method: 'POST',
//     url: URLS.BASE_URL_API + `seller/${id}/mws_auth/`,
//     data,
//     headers,
//   })
//     .then(json => {
//       return json.data;
//     })
//     .catch(error => { });
// };

export const setSellers = (data: {}) => ({
  type: SET_SELLERS,
  data,
});

// export const setAmazoneMWS = (data: Field) => ({
//   type: SET_AMAZONE_MWS,
//   aData: data,
// });
