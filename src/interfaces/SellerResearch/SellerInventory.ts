/* ============================================ */
/* ====== SELLER INVENTORY MAIN TABLE ========= */
/* ============================================ */
export interface SellerInventoryTablePayload {
  resetFilter?: boolean;
  enableLoader?: boolean;
  page?: number;
  perPage?: number;
  sort?: string;
  sortDir?: 'asc' | 'desc';
  marketplaceId?: string;
}

export interface SellerInventoryTablePaginationInfo {
  count: number;
  current_page: number;
  per_page: number;
  total_pages: number;
  previous?: string;
  next?: string;
}
