export interface ProductTrackPayload {
  asin: string;
  keywords: string;
}

export interface TrackerTableProductsPayload {
  resetFilters?: boolean;
  enableLoader?: boolean;
}

export interface TrackerProductKeywordsTablePayload {
  keywordTrackProductId: number;
  enableLoader?: boolean;
}
