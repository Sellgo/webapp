import axios from 'axios';
import { AppConfig } from '../../../../config';
import { UpdateTplInboundPayload } from '../../../../interfaces/PerfectStock/Tpl';
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

export const fetchShippingInboundByVendorId = async (id: number) => {
  const sellerID = sellerIDSelector();
  try {
    const { status, data } = await axios.get(
      `${AppConfig.BASE_URL_API}sellers/${sellerID}/inbound-shippings?vendor_id=${id}`
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

export const updateInboundShippings = async (payload: UpdateTplInboundPayload) => {
  const sellerID = sellerIDSelector();
  try {
    const { status, data } = await axios.patch(
      `${AppConfig.BASE_URL_API}sellers/${sellerID}/inbound-shippings`,
      payload
    );

    if (status === 200) {
      return {
        hasError: false,
        err: null,
        data: data,
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
