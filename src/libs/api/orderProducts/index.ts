import axios from 'axios';
import { AppConfig } from '../../../config';
import { sellerIDSelector } from '../../../selectors/Seller';

export const getOrderProducts = async (vendorId = -1) => {
  let url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/tpl/products`;
  if (vendorId > -1) {
    url = `${url}?vendor_id=${vendorId}`;
  }
  try {
    const { status, data } = await axios.get(url);

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
