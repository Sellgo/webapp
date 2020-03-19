export interface FilterModel {
  label: string;
  dataKey: string;
  checked?: boolean;
}

export interface RangeModel {
  dataKey: string;
  range: {
    min: number;
    max: number;
  };
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
  price: RangeModel;
  profitRoi: {
    profit: RangeModel;
    roi: RangeModel;
  };
  rankUnitSold: {
    unitSold: RangeModel;
    rank: RangeModel;
  };
}
