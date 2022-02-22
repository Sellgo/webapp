export interface SalesProjectionPayload {
  page?: number;
  sort?: string;
  sortDir?: 'asc' | 'desc';
  isExport?: boolean;
  fileFormat?: 'csv' | 'xlsx';
}

export interface SalesProjectionUpdatePayload {
  id: number;
  updatePayload: {
    avg_l7d_included?: 'true' | 'false';
    avg_l7d_weight?: string;
    avg_l30d_included?: 'true' | 'false';
    avg_l30d_weight?: string;
    avg_l90d_included?: 'true' | 'false';
    avg_l90d_weight?: string;
    avg_n30d_ly_included?: 'true' | 'false';
    avg_n30d_ly_weight?: string;
    avg_n90d_ly_included?: 'true' | 'false';
    avg_n90d_ly_weight?: string;
    predictive_sales?: number;
    manual_sales?: number;
    projection_mode?: 'manual' | 'predictive';
    stockout_threshold_inventory?: number;
    stockout_threshold_inventory_included?: 'true' | 'false';
    weighted_average_included?: 'true' | 'false';
    seasonal_adjustment_included?: 'true' | 'false';
  };
}

export interface SalesProjectionProduct {
  id: number;
  asin: string;
  title: string;
  image_url: string;
  price: number;
  days_until_so: 777;
  predictive_sales: number;
  manual_sales: number;
  avg_l7d: number;
  avg_l30d: number;
  avg_l90d: number;
  avg_n30d_ly: number;
  avg_n90d_ly: number;
  avg_l7d_included: boolean;
  avg_l30d_included: boolean;
  avg_l90d_included: boolean;
  avg_n30d_ly_included: boolean;
  avg_n90d_ly_included: boolean;
  avg_l7d_weight: number;
  avg_l30d_weight: number;
  avg_l90d_weight: number;
  avg_n30d_ly_weight: number;
  avg_n90d_ly_weight: number;
  avg_l7d_total: number;
  avg_l30d_total: number;
  avg_l90d_total: number;
  avg_n30d_ly_total: number;
  avg_n90d_ly_total: number;
}

export interface WeightedAverageSettings {
  avg_l7d_weight: string;
  avg_l30d_weight: string;
  avg_l90d_weight: string;
  avg_n30d_ly_weight: string;
  avg_n90d_ly_weight: string;
  avg_61d_90d_weight: string;
  avg_31d_60d_weight: string;
}

export interface LeadTime {
  id?: number;
  type: string;
  duration: number;
}

export interface SingleLeadTimeGroup {
  id?: number;
  lead_times: LeadTime[];
  name: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface ProductProjectedSales {
  [date: string]: number;
}

export interface GraphDataSeries {
  name: string;
  type: 'line' | 'bar';
  data: number[];
}
