export interface Product {
  amazon_url: string;
  amazon_category_name: string;
  asin: string;
  brand: string;
  id: number;
  fee: string;
  monthly_revenue: number;
  image_url: string;
  last_syn: string;
  margin: string;
  price: string;
  product_id: number;
  profit_monthly: string;
  sales_monthly: string;
  sellgo_score: number;
  title: string;
  tracking_status: string;
  profit: string;
  product_track_id: string;
  rank: number;
  roi: string;
  product_cost: string;
  default_cost: any;
  fees: string;
  upc: string;
  ean: string;
  isbn: string;
  dimension: string;
  weight: string;
  size_tier: string;
  fba_fee: string;
  referral_fee: string;
  variable_closing_fee: string;
  num_fba_new_offers: number;
  num_fbm_new_offers: number;
  low_new_fba_price: string;
  low_new_fbm_price: string;
  customer_reviews: number;
  rating: string;
  data_buster_status: string;
  is_amazon_selling: boolean;
  multipack_quantity: string;
  multipack_flag: boolean;
  multipack_profit: number;
  multipack_margin: number;
  multipack_roi: number;
  best_seller: boolean;
  subscribe_save: boolean;
  upcs: string;
  is_variation: boolean;
  amazon_price: number;
  number_of_sellers: number;
}

export interface ProductsTrackData {
  avg_price: string;
  daily_rank: number;
  daily_sales: string;
  date_range: number;
  fees: string;
  id: number;
  monthly_sales: string;
  product_track_group_id: number;
  profit: string;
  rating: string;
  review: number;
  roi: string;
  size_tier: string;
  weight: string;
}

export interface ProductsPaginated {
  count: number;
  num_pages: number;
  per_page: number;
  results: ProductTrackerDetails[];
  min_max: Record<string, any>;
}
export interface ProductDetail {
  asin: string;
  fees: string;
  id: number;
  inb_shipping_cost: string;
  margin: string;
  monthly_revenue: number;
  monthly_sales: string;
  oub_shipping_cost: string;
  price: string;
  product_cost: string;
  product_id: number;
  profit: string;
  profit_monthly: string;
  rank: string;
  roi: string;
  upc: string;
  amazon_url: string;
  image_url: string;
  title: string;
  package_quantity: string;
  total_cost: number;
}

export interface ProductChartDetailsRank {
  rank: number;
  cdate: string;
}

export interface ProductChartDetailsPrice {
  price: number;
  cdate: string;
}

export interface ProductChartDetailsKpi {
  profit: string;
  roi: string;
  cdate: string;
}

export interface ProductTrackerDetails {
  asin: string;
  amazon_url: string;
  avg_daily_revenue: string;
  avg_daily_sales: string;
  avg_margin: string;
  avg_price: string;
  avg_profit: string;
  avg_rank: number;
  customer_reviews: number;
  rating: string;
  avg_roi: string;
  dimension: string;
  id: number;
  image_url: string;
  product_id: number;
  supplier_id: number;
  title: string;
  weight: string;
  avg_inventory: number;
  avg_amazon_inventory: number;
  is_amazon_selling: boolean;
  source: string;
  amazon_oos_90: string;
  product_track_group_id: number;
  best_seller: boolean;
  subscribe_save: boolean;
  upcs: string;
  amazon_price: number;
  number_of_sellers: number;
}

export interface ProductsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
  current_page: number;
  total_pages: number;
  per_page: number;
}
export interface ProfitFinderResponse {
  data: ProductsResponse;
}
