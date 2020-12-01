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

export interface NewFilterModel {
  label: string;
  dataKey: string;
  type: string;
  isActive: boolean;
  dateModified: any;
  checked?: boolean;
  value?: any;
  currency?: string;
  operation?: string;
  defaultValue?: any;
  defaultOperation?: any;
  targetValue?: string;
  minPlaceholder?: string;
  maxPlaceholder?: string;
  presetKey?: string;
  range?: {
    min: number;
    max: number;
  };
  sign?: string;
}
