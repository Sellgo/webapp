import axios from 'axios';
import { AppConfig } from '../../../../config';
import { sellerIDSelector } from '../../../../selectors/Seller';

export const fetchPerfectStockConfig = async () => {
  const sellerID = sellerIDSelector();
  try {
    const { status, data } = await axios.get(
      `${AppConfig.BASE_URL_API}sellers/${sellerID}/perfect-stock/config`
    );

    if (status === 200) {
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

export const updatePerfectStockConfig = async (payload: {}) => {
  const sellerID = sellerIDSelector();
  try {
    const { status, data } = await axios.patch(
      `${AppConfig.BASE_URL_API}sellers/${sellerID}/perfect-stock/config`,
      payload
    );

    if (status === 200) {
      if (!(data && data.length > 0)) {
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
