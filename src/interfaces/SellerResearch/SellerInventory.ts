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

/* ============================================ */
/* ====== SELLER INVENTORY PRODUCTS TABLE ====== */
/* ============================================ */

export interface SellerInventoryProductsTablePayload {
  rowId: number;
  page?: number;
  perPage?: number;
  enableLoader?: boolean;
}

export interface SellerInventoryProductsTablePaginationInfo {
  count: number;
  num_pages: number;
  per_page: number;
  min_max?: any;
}

/* Track un track products for sellers */
export interface TrackUntrackProduct {
  status: string;
  productId: number;
  productTrackId: null | number;
}

/* ==================================================== */
/* ====== SELLER INVENTORY PRODUCTS SELLER TABLE ====== */
/* ===================================================== */
export interface SellerInventoryProductsTableSellersPayload {
  parentAsin: string;
  enableLoader?: boolean;
  page?: number;
  perPage?: number;
}

export interface SellerInventoryProductsTableSellersPaginationInfo {
  count: number;
  current_page: number;
  per_page: number;
  total_pages: number;
  next?: string;
  prev?: string;
}

/* Track un track products for sellers */
export interface TrackUntrackProductSeller {
  sellerMerchantId: number;
  amazonMerchantId: number;
}
