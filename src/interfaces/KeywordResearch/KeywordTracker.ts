export interface ProductTrackPayload {
  asin: string;
  keywords: string;
}

/* Keyword Tracker Products  Table Interfaces */
export interface TrackerTableProductsPayload {
  resetFilters?: boolean;
  enableLoader?: boolean;
  perPage?: number;
  page?: number;
  sort?: string;
  sortDir?: 'asc' | 'desc';
}

/* Keyword Tracker Products table pagination */
export interface KeywordTrackerProductsTablePaginationInfo {
  count: number;
  total_pages: number;
  per_page: number;
  current_page: number;
  next?: string;
  previous?: string;
}

/* Untrack/ delete payload for product on keyword tracker product table */
export interface UnTrackKeywordTrackerTableProduct {
  keywordTrackProductId: number;
}

/* Tracker Products Keyword Table Interfaces */
export interface TrackerProductKeywordsTablePayload {
  keywordTrackProductId: number;
  enableLoader?: boolean;
  page?: number;
  perPage?: number;
  sort?: string;
  sortDir?: 'asc' | 'desc';
}

/* Tracker Product Keywords Table Pagination */
export interface TrackerProductKeywordsTablePaginationInfo {
  count: number;
  total_pages: number;
  per_page: number;
  current_page: number;
  next?: string;
  previous?: string;
}

/* Untrack keyword from products table*/
export interface UnTrackProductsTableKeyword {
  keywordTrackId: number;
}

/* Keywords History */
export interface TrackerProductKeywordsHistory {
  keywordTrackId: number;
}

export interface TrackerProductsKeywordsHistoryExportProgress {
  keyword_track_id: number;
  export_progress: string;
  export_status: string;
  report_xlsx_url: string;
}
