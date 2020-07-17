export interface FilterModel {
  label: string;
  dataKey: string;
  checked?: boolean;
  value?: number;
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

//Supplier
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
  presets: FilterData[];
}

export interface FilterState {
  supplierID: string;
  allFilter: string[];
  profitability: string;
  amazonChoice: string[];
  removeNegative: string[];
  sizeTierFilter: string[];
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

//Product Tracker

export interface ProductTrackerFilterInterface {
  all: {
    filterRanges: RangeModel[];
    reviews: FilterData;
  };
  period: FilterData;
  presets: FilterData[];
}

export interface ProductTrackerFilterState {
  supplierID: string;
  removeNegative: string[];
  reviews: string[];
  period: number;
  profitability: string;
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
