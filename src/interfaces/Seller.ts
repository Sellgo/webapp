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
  daily_price: number;
}

export interface SellerSubscription {
  id: number;
  cdate: string;
  udate: string;
  expiry_date: string | null;
  trial_left?: number;
  payment_mode: string;
  seller_id: number;
  status: string;
  stripe_subscription_id: string | null;
  subscription_id: number;
  seller_map_overview_display_limit?: number;
  is_beta?: boolean;
  is_aistock_on_boarding_survey_filled?: boolean;
  is_payment_pending?: boolean;
  is_aistock?: boolean;
  is_aistock_survey_filled?: boolean;
  is_aistock_feedback_filled: boolean;
  is_aistock_testimonial_filled: boolean;
  trial_start_date: string;
  paid_start_date: string;
  perfect_stock_status: string;
  is_trial_expired?: boolean;
}

export interface Merchant {
  address: any;
  asins: string;
  brands: string;
  business_name: any;
  city: any;
  count_12_month: any;
  count_30_days: any;
  count_90_days: any;
  count_lifetime: any;
  country: any;
  feedback: string;
  id: number;
  inventory_count: string;
  inventory_link: string;
  launched: any;
  marketplace_id: any;
  merchant_group: any;
  merchant_id: any;
  merchant_name: any;
  negative_12_month: any;
  negative_30_days: any;
  negative_90_days: any;
  negative_lifetime: any;
  neutral_12_month: any;
  neutral_30_days: any;
  neutral_90_days: any;
  neutral_lifetime: any;
  positive_12_month: any;
  positive_30_days: any;
  positive_90_days: any;
  positive_lifetime: any;
  review_ratings: any;
  scrapy_job_id: number;
  seller: number;
  seller_rating: any;
  state: any;
  status: string;
  track_status: string;
  udate: string;
}
