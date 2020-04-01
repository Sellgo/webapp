export interface FilterModel {
  label: string;
  dataKey: string;
  checked?: boolean;
}

export interface RangeModel {
  label: string;
  dataKey: string;
  minPlaceholder: string;
  maxPlaceholder: string;
  range: {
    min: number;
    max: number;
  };
  filterRange: {
    min: number;
    max: number;
  };
  removeNegative?: boolean;
  sign?: string;
}

export interface FilterData {
  label: string;
  dataKey: string;
  checkedValue?: string;
  radio: boolean;
  data: FilterModel[];
}

export interface SupplierFilter {
  allFilter: FilterData[];
  filterRanges: RangeModel[];
}

export interface FilterState {
  supplierID: string;
  allFilter: string[];
  productSize: string;
  price: {
    min: number;
    max: number;
  };
  profit: {
    min: number;
    max: number;
  };
  margin: {
    min: number;
    max: number;
  };
  roi: {
    min: number;
    max: number;
  };
  sales_monthly: {
    min: number;
    max: number;
  };
  rank: {
    min: number;
    max: number;
  };
}
