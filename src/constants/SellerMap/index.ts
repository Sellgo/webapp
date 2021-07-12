import { Location } from '../../interfaces/SellerMap';

/* Actions */
export const actionTypes = {
  LOADING_SELLERS_FOR_MAP: 'LOADING_SELLERS_FOR_MAP',
  SET_SELLERS_FOR_MAP: 'SET_SELLERS_FOR_MAP',
  // Sellers details for cards
  LOADING_SELLER_DETAILS_FOR_MAP: 'LOADING_SELLER_DETAILS_FOR_MAP',
  SET_SELLER_DETAILS_FOR_MAP: 'SET_SELLER_DETAILS_FOR_MAP',
  SHOW_SELLER_DETAILS_CARD: 'SHOW_SELLER_DETAILS_CARD',
};

export const INITIAL_CENTER: Location = [37.09024, -95.712891];
export const INITIAL_ZOOM = 4.8;
export const MIN_ZOOM = 2.5;
export const MAX_ZOOM = 10;
export const WORLD_MAP_BOUNDS: Location[] = [
  [-90, -180],
  [90, 180],
];

export const DEFAULT_SELLER_INFO = {
  business_name: '',
  city: '',
  id: '',
  merchant_id: '',
  seller_link: '',
  seller_name: '',
  state: '',
  zip_code: '',
};

// Seller Limit Options
export const SELLER_LIMIT_OPTIONS = [
  {
    key: '1000',
    value: 1000,
    text: '1k',
  },
  {
    key: '2000',
    value: 2000,
    text: '2k',
  },
  {
    key: '5000',
    value: 5000,
    text: '5k',
  },
  {
    key: '10000',
    value: 10000,
    text: '10k',
  },
  {
    key: '20000',
    value: 20000,
    text: '20k',
  },
  {
    key: '50000',
    value: 50000,
    text: '50k',
  },
];
