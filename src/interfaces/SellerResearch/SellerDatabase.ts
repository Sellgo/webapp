export interface SellerDatabasePayload {
  filterPayload?: any;
  resetFilter?: boolean;
  enabledLoader?: boolean;
  page?: number;
  sort?: string;
  sortDir?: 'asc' | 'desc';
  marketplaceId?: string;
}

export interface ShowFilterMessage {
  type: 'info' | 'error';
  message: string;
  show: boolean;
}

export interface SellerDatabasePaginationInfo {
  count: number;
  current_page: number;
  total_pages: number;
  next?: string;
  per_page?: number;
  previous?: string;
}
