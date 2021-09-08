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

export interface KeywordReverseAsinProduct {
  id: number;
  keyword_request: number;
  seller: number;
  asin: string;
  title: string;
  rank: number;
  sales_monthly: number;
  image_url: string;
  position: number;
}
