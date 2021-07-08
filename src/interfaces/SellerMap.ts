export type Location = [number, number];

export interface SellerMapPayload {
  resetMap?: boolean;
  state?: string;
  zipCode?: string;
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
