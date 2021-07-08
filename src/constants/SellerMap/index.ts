import { Location } from '../../interfaces/SellerMap';

/* Actions */
export const actionTypes = {
  LOADING_SELLERS_FOR_MAP: 'LOADING_SELLERS_FOR_MAP',
  SET_SELLERS_FOR_MAP: 'SET_SELLERS_FOR_MAP',
  // Sellers details for cards
  LOADING_SELLER_DETAILS_FOR_MAP: 'LOADING_SELLER_DETAILS_FOR_MAP',
  SET_SELLER_DETAILS_FOR_MAP: 'SET_SELLER_DETAILS_FOR_MAP',
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
