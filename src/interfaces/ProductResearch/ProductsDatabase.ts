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
}
