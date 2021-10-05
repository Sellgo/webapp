export interface ProductTrackPayload {
  asin: string;
  keywords: string;
  trackParentsAndVariations: boolean;
}

/* Keyword Tracker Products  Table Interfaces */
export interface TrackerTableProductsPayload {
  resetFilters?: boolean;
  enableLoader?: boolean;
  perPage?: number;
  page?: number;
  sort?: string;
  sortDir?: 'asc' | 'desc';
  search?: string;
}

/* Keyword Tracker Table Competitors  */
export interface KeywordTrackerTableCompetitors {
  keyword_track_competitor_id: number;
  asin: string;
  title: string;
  image_url: string;
  status: 'active' | 'inactive';
}

/* Add Competitors */
export interface AddCompetitorsPayload {
  keywordTrackProductId: number;
  asins: string;
}

/* Remove Competitors */
export interface RemoveCompetitorPayload {
  keywordTrackCompetitorId: number;
  status: 'active' | 'inactive';
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

/* Track/untrack in BOOST keyword from products table*/
export interface TrackBoostProductsTableKeyword {
  keywordTrackId: number;
  is_boost: 'true' | 'false';
}

/* Add more keywords to keyword tracker table */
export interface AddTrackerProductKeyword {
  keywordTrackProductId: number;
  keywords: string;
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
