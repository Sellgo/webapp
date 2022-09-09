import axios from 'axios';
import { AppConfig } from '../../../../config';
import { sellerIDSelector } from '../../../../selectors/Seller';

export const fetchAllPackingTemplates = async () => {
  const sellerID = sellerIDSelector();
  try {
    const { status, data } = await axios.get(
      `${AppConfig.BASE_URL_API}sellers/${sellerID}/tpl-packing-templates`
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

export const fetchPackingTemplateById = async (id: number) => {
  const sellerID = sellerIDSelector();
  try {
    const { status, data } = await axios.get(
      `${AppConfig.BASE_URL_API}sellers/${sellerID}/tpl-packing-templates/${id}`
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
