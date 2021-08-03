export interface SellerDatabasePayload {
  filterPayload?: any;
  resetFilter?: boolean;
  enabledLoader?: boolean;
  page?: number;
  sort?: string;
  sortDir?: 'asc' | 'desc';
}

export interface ShowFilterMessage {
  type: 'info' | 'error';
  message: string;
  show: boolean;
}

export interface SellerDatabasePaginationInfo {
  count: number;
  current_page: number;
  next: string;
  per_page: number;
  previous: string;
  total_pages: number;
}
