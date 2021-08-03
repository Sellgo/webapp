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
