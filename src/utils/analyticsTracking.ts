import axios from 'axios';
import { AppConfig } from '../config';
import { sellerIDSelector } from '../selectors/Seller';

export const trackEvent = (payload: any) => {
  // @ts-ignore
  if (window.dataLayer) {
    // @ts-ignore
    const dataLayer = window.dataLayer;
    dataLayer.push({ ecommerce: null });
    dataLayer.push(payload);
  } else {
    console.log('no data layer?');
  }
};

export const trackDripDropOff = async (page: string) => {
  try {
    const payload = {
      drop_off_point: page,
    };
    await axios.post(`${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/drip/fields`, payload);
  } catch (e) {
    console.log(e);
  }
};
