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
    avg_l7d_included?: boolean;
    avg_l30d_included?: boolean;
    avg_l90d_included?: boolean;
    avg_n30d_ly_included?: boolean;
    avg_n90d_ly_included?: boolean;
    predictive_sales?: number;
    manual_sales?: number;
    projection_mode?: 'manual' | 'predictive';
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
