export interface FilterModelChild {
  label: string;
  dataKey: string;
  checked: boolean;
}

export interface FilterModel {
  label: string;
  dataKey: string;
  checked: boolean;
  childData?: FilterModelChild[];
}

export interface AllFilters {
  sortBy: FilterModel[];
  sellers: FilterModel[];
  sellability: FilterModel[];
  productCategory: FilterModel[];
  dimensions: FilterModel[];
  weight: FilterModel[];
}
