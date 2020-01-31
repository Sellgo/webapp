export interface Product {
  amazon_url: string;
  amazon_category_name: string;
  asin: string;
  brand: string;
  id: number;
  image_url: string;
  last_syn: string;
  margin: string;
  price: number;
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
  fees: string;
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
  min_max: Object;
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
  avg_roi: string;
  dimension: string;
  id: number;
  image_url: string;
  product_id: number;
  supplier_id: number;
  title: string;
  weight: string;
}
