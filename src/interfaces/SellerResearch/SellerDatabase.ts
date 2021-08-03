export interface SellerDatabasePayload {
  filter?: boolean;
  resetFilter?: boolean;
  enabledLoader?: boolean;
}

export interface ShowFilterMessage {
  type: 'info' | 'error';
  message: string;
  show: boolean;
}
