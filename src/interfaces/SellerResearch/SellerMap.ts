export type Location = [number, number];

export interface SellerMapPayload {
  resetMap?: boolean;
  marketplaceId?: string;
  country?: string;
  state?: string;
  zipCode?: string;
  merchantName?: string;
  categories?: string;
  minMonthlyRevenue?: string;
  maxMonthlyRevenue?: string;
  maxCount?: number;
  launched?: string;
  sellerType?: string;
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
