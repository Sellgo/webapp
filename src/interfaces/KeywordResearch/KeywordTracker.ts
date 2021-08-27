export interface ProductTrackPayload {
  asin: string;
  keywords: string;
}

export interface TrackerTableProductsPayload {
  resetFilters?: boolean;
  enableLoader?: boolean;
  perPage?: number;
  page?: number;
  sort?: string;
  sortDir?: 'asc' | 'desc';
}

export interface TrackerProductKeywordsTablePayload {
  keywordTrackProductId: number;
  enableLoader?: boolean;
  page?: number;
  per_page?: number;
  sort?: string;
  sortDir?: 'asc' | 'desc';
}

export interface TrackerProductKeywordsTablePaginationInfo {
  count: number;
  total_pages: number;
  per_page: number;
  current_page: number;
  next?: string;
  previous?: string;
}
