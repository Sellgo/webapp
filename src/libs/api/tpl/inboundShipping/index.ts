import axios from 'axios';
import { AppConfig } from '../../../../config';
import { sellerIDSelector } from '../../../../selectors/Seller';

export const createStreamLine = async (payload: {}) => {
  const sellerID = sellerIDSelector();
  try {
    const { status, data } = await axios.post(
      `${AppConfig.BASE_URL_API}sellers/${sellerID}/tpl/inbound-shipping`,
      payload
    );

    if (status === 201) {
      if (!(data && Object.keys(data).length > 0)) {
        return {
          hasError: true,
          err: 'No data found',
          data: null,
        };
      } else {
        return {
          hasError: false,
          err: null,
          data: data,
        };
      }
    }
  } catch (err) {
    return {
      hasError: true,
      err: err,
      data: null,
    };
  }
};
