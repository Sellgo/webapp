export type Location = [number, number];

export interface SellerMapPayload {
  resetMap?: boolean;
  enableLoader?: boolean;
}

export interface SellersListPayload {
  page?: number;
  sort?: string;
  enableLoader?: boolean;
  sortDir?: 'asc' | 'desc';
  marketplaceId?: string;
  isWholesale?: boolean;
  perPage?: number;
}

export interface SellersListPaginationInfo {
  count: number;
  current_page: number;
  total_pages: number;
  per_page?: number;
}

export interface SellerData {
  business_name: string;
  city: string;
  id: string;
  merchant_id: string;
  seller_link: string;
  seller_name: string;
  state: string;
  zip_code: string;
}

export interface Country {
  country: string;
  latitude: number;
  longitude: number;
  name: string;
}

export interface USState {
  state: string;
  latitude: number;
  longitude: number;
  name: string;
}

export interface UpdateSellerMapFilterPayload {
  keyName: string;
  value: any;
}
