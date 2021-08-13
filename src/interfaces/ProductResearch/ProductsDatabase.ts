export type ProductsDatabaseFilterTypes = 'min_max' | 'text' | 'input';

export interface ProductsDatabaseFilters {
  type: ProductsDatabaseFilterTypes;
  name: string;
  value?: string;
  min?: string;
  max?: string;
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
