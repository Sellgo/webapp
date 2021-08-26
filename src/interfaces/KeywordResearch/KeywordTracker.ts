export interface TrackerTableProductsPayload {
  resetFilters?: boolean;
  enableLoader?: boolean;
}

export interface ProductTrackPayload {
  asin: string;
  keywords: string;
}
