export interface FilterModel {
  label: string;
  dataKey: string;
  checked?: boolean;
  value?: number;
  operation?: string;
  targetValue?: string;
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

export interface CustomizableFilterModel {
  dataKey: string;
  operation: string;
  value: number;
  active: boolean;
}

export interface ShowOnlyFilterModel {
  dataKey: string;
  active: boolean;
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
  profitabilityFilter: {
    value: string;
    active: boolean;
  };
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
  customizable: CustomizableFilterModel[];
  showOnly: ShowOnlyFilterModel[];
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
  amazonChoice: string[];
  period: number;
  profitabilityFilter: {
    value: string;
    active: boolean;
  };
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
  customizable: CustomizableFilterModel[];
  showOnly: ShowOnlyFilterModel[];
}
