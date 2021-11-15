export type ProductsDatabaseFilterTypes = 'min_max' | 'text' | 'input' | 'checkbox';

export interface ProductsDatabaseFilters {
  type: ProductsDatabaseFilterTypes;
  name: string;
  value?: string;
  min?: string;
  max?: string;
  checkedItems?: any;
  active: boolean;
}

export interface ProductsDatabasePayload {
  resetFilters?: boolean;
  clearFiltersAfterSuccess?: boolean;
  page?: number;
  withoutLoader?: boolean;
  sort?: {
    field: string;
    by: 'ascending' | 'descending';
  };
  isExport?: boolean;
  fileFormat?: string;
  filterPayload?: any;
}

export interface ProductsDatabaseRow {
  asin: string;
  brand: string;
  monthly_revenue: number;
  price: number;
  rating: number;
  review_count: number;
  seller_count: number;
  title: string;
  weight_lbs: number;
}

export interface ShowFilterMessage {
  type: 'info' | 'error';
  message: string;
  show: boolean;
}
