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
  price: number;
  synthesis_limit: number;
  track_limit: number;
}
