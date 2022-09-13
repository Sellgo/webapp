import axios from 'axios';
import { AppConfig } from '../../../config';
import { sellerIDSelector } from '../../../selectors/Seller';

export const calculateTplShipmentQuantities = async (payload: any) => {
  const sellerID = sellerIDSelector();
  try {
    const { status, data } = await axios.post(
      `${AppConfig.BASE_URL_API}sellers/${sellerID}/tpl/calculate-quantity`,
      payload
    );

    if (status === 200) {
      if (!(data && data.length > 0)) {
        return {
          hasError: true,
          err: 'Cannot calculate data for the given ids',
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
