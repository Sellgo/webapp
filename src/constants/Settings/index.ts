import { MarketplaceFields } from '../../interfaces/MarketplaceFields';

export const SET_BASIC_INFO_SELLER = 'SET_BASIC_INFO_SELLER';
export const UPDATE_BASIC_INFO_SELLER = 'UPDATE_BASIC_INFO_SELLER';
export const GET_BASIC_INFO_SELLER = 'GET_BASIC_INFO_SELLER';
export const SET_AMAZON_MWS = 'SET_AMAZON_MWS';
export const GET_AMAZON_MWS = 'GET_AMAZON_MWS';
export const PATCH_AMAZON_MWS = 'PATCH_AMAZON_MWS';
export const UPLOAD_SELLER_IMAGE = 'UPLOAD_SELLER_IMAGE';
export const SET_PAGE_HISTORY_COUNTER = 'SET_PAGE_HISTORY_COUNTER';
export const SET_PRICING_SUBSCRIPTIONS = 'SET_PRICING_SUBSCRIPTIONS';
export const SET_SELLER_SUBSCRIPTION = 'SET_SELLER_SUBSCRIPTION';
export const SET_AMAZON_MWS_AUTHORIZED = 'SET_AMAZON_MWS_AUTHORIZED';

export const marketPlace: MarketplaceFields[] = [
  { name: 'Brazil', id: 'A2Q3Y263D00KWC', code: 'BR', link: 'amazon.com' },
  { name: 'Canada', id: 'A2EUQ1WTGCTBG2', code: 'CA', link: 'amazon.ca' },
  { name: 'Mexico', id: 'A1AM78C64UM0Y8', code: 'MX', link: 'amazon.com.mx' },
  { name: 'US', id: 'ATVPDKIKX0DER', code: 'US', link: 'amazon.com' },
  { name: 'United Arab Emirates', id: 'A2VIGQ35RCS4UG', code: 'AE', link: 'amazon.ae' },
  { name: 'Germany', id: 'A1PA6795UKMFR9', code: 'DE', link: 'amazon.de' },
  { name: 'Spain', id: 'A1RKKUPIHCS9HS', code: 'ES', link: 'amazon.com' },
  { name: 'France', id: 'A13V1IB3VIYZZH', code: 'FR', link: 'amazon.com' },
  { name: 'UK', id: 'A1F83G8C2ARO7P', code: 'GB', link: 'amazon.com' },
  { name: 'India', id: 'A21TJRUUN4KGV', code: 'IN', link: 'amazon.in' },
  { name: 'Italy', id: 'APJ6JRA9NG5V4', code: 'IT', link: 'amazon.com' },
  { name: 'Turkey', id: 'APJ6JRA9NG5V4', code: 'TR', link: 'amazon.com' },
];
