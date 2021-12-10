export interface KeywordDatabaseTablePayload {
  page?: number;
  per_page?: number;
  sort?: string;
  sortDir?: 'asc' | 'desc';
  resetFilter?: boolean;
  filterPayload?: any;
  enableLoader?: boolean;
}

export interface KeywordDatabasePaginationInfo {
  count: number;
  total_pages: number;
  per_page: number;
  current_page: number;
  next?: string;
  previous?: string;
}

export interface KeywordDatabaseProgressData {
  id: number;
  seller: number;
  progress: string;
  status: string;
  report_xlsx_url?: string;
}

export interface KeywordDatabaseWordFreqSummary {
  word: string;
  frequency: number;
}

export interface KeywordDatabaseAggSummary {
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
