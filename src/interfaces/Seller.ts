export interface Seller {
  name: string;
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  cdate?: string;
}

export interface AmazonMWS {
  status: string;
  marketplace_id: string;
  amazon_seller_id: string;
  seller_id: string;
  token: string;
  id: any;
}

export interface Subscription {
  id: string;
  name: string;
  monthly_price: number;
  yearly_price: number;
  synthesis_limit: number;
  track_limit: number;
  leads_track_limit: number;
}

export interface SellerSubscription {
  id: number;
  cdate: string;
  udate: string;
  expiry_date: string | null;
  payment_mode: string;
  seller_id: number;
  status: string;
  stripe_subscription_id: string | null;
  subscription_id: number;
}
