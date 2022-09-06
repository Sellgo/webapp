import axios from 'axios';
import { AppConfig } from '../../../config';
import { sellerIDSelector } from '../../../selectors/Seller';

export const getOrderProducts = async () => {
  try {
    const { status, data } = await axios.get(
      `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/purchase-orders/products`
    );

    if (status === 200) {
      return {
        hasError: false,
        err: null,
        data: data,
      };
    } else {
      return {
        hasError: true,
        err: 'Cannot fetch products',
        data: null,
      };
    }
  } catch (err) {
    return {
      hasError: true,
      err: err,
      data: null,
    };
  }
};
