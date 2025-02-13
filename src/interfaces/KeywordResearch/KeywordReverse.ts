export interface KeywordReverseTablePayload {
  page?: number;
  per_page?: number;
  sort?: string;
  sortDir?: 'asc' | 'desc';
  resetFilter?: boolean;
  filterPayload?: any;
  enableLoader?: boolean;
}

export interface KeywordReversePaginationInfo {
  count: number;
  total_pages: number;
  per_page: number;
  current_page: number;
  next?: string;
  previous?: string;
}

export interface KeywordReverseProgressData {
  id: number;
  seller: number;
  progress: string;
  status: string;
  report_xlsx_url?: string;
}

export interface KeywordReverseProductListPayload {
  enableLoader?: boolean;
  resetProducts?: boolean;
}

export interface KeywordReverseAsinProduct {
  id: number;
  asin: string;
  title: string;
  rank: number;
  sales_monthly: number;
  image_url: string;
  position: number;
  keywords_count: number;
}

export interface KeywordReverseWordFreqSummary {
  word: string;
  frequency: number;
}

export interface KeywordReverseAggSummary {
  total_keywords: number;
  total_search_volume: number;

  min_search_volume: number;
  max_search_volume: number;
  avg_search_volume: number;

  min_competing_products: number;
  max_competing_products: number;
  avg_competing_products: number;

  min_sponsored_asins: number;
  max_sponsored_asins: number;
  avg_sponsored_asins: number;
}
