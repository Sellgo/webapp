import { Location } from '../../interfaces/SellerMap';

export const INITIAL_CENTER: Location = [37.09024, -95.712891];
export const INITIAL_ZOOM = 4.8;
export const MIN_ZOOM = 2.5;
export const MAX_ZOOM = 8.7;
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
