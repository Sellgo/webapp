export interface Product {
  amazon_url: string;
  amazon_category_name: string;
  asin: string;
  id: number;
  image_url: string;
  last_syn: string;
  margin: string;
  product_id: number;
  profit_monthly: string;
  sales_monthly: string;
  title: string;
  tracking_status: string;
  profit: string;
  product_track_id: string;
  roi: string;
  product_cost: string;
  fees: string;
  // Extra fields not returned by API but used by new products table design
  // For now we hardcode this data
  ratings: number;
  unitSoldPerDay: number;
  unitSoldPerMonth: number;
  // Extra fields not returned by API but used in new filters design
  // Hardcoding this data for now so that filters work
  monthly_revenue: number;
  roi_inventory: number;
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
