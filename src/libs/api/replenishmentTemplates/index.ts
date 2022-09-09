import axios from 'axios';
import { AppConfig } from '../../../config';
import { sellerIDSelector } from '../../../selectors/Seller';

export const fetchReplishmentTemplates = async () => {
  const sellerID = sellerIDSelector();
  try {
    const { status, data } = await axios.get(
      `${AppConfig.BASE_URL_API}sellers/${sellerID}/tpl-replenishment-templates`
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
