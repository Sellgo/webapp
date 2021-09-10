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
