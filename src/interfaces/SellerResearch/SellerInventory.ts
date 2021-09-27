/* ============================================ */
/* ====== CENTRAL EXPORT PROGRESS ====== */
/* ============================================ */
export interface CentralExportProgress {
  showProgress: boolean;
  progress: number;
  status: string;
  csv_path?: string;
  excel_path?: string;
}

/* ============================================ */
/* ====== CENTRAL SCRAPING PROGRESS ====== */
/* ============================================ */
export interface CentralScrapingProgress {
  job_id: string;
  status: 'string';
  progress: number;
}

/* ============================================ */
/* =================== SOCKETS============== */
/* ============================================ */
/* Socket Interfaces */
export interface ExportSocketMessage {
  message: string;
  status: string;
  progress: number;
  job_id?: string;
  excel_path?: string;
  csv_path?: string;
}

/* Check Inventory */
export interface CheckInventorySocketMessage {
  message: string;
  status: string;
  progress?: number;
  products_count?: number;
  is_top_level?: boolean;
  error_status?: boolean;
  job_id?: string;
}

/* Find/Refresh Seller */
export interface FindRefreshSellerSocketMessage {
  message: string;
  status: string;
  progress?: number;
  merchants_count?: number;
  is_top_level?: boolean;
  error_status?: boolean;
  job_id?: string;
}

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
  search?: string;
}

export interface SellerInventoryTablePaginationInfo {
  count: number;
  current_page: number;
  per_page: number;
  total_pages: number;
  previous?: string;
  next?: string;
}

/* Delete seller from table */
export interface DeleteSellerPayload {
  id: number;
}

/* ============================================ */
/* ====== SELLER INVENTORY  TABLE GROUPS ====== */
/* ============================================ */
export interface SellerInventoryTableGroup {
  id: number;
  name: string;
  status: string;
  seller_id?: number;
  udate?: string;
  cdate?: string;
}

export type SellerInventoryTableActiveGroupId = number | null;

export interface CreateSellerGroup {
  name: string;
}

export interface UpdateSellerGroup {
  id: number;
  name?: string;
  status?: string;
}

export interface DeleteSellergroup {
  id: number;
  refreshTable?: boolean;
}

export interface MoveMerchantToGroup {
  id: number;
  merchantId: number;
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
