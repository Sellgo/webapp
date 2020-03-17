export interface FilterModelChild {
  label: string;
  dataKey: string;
  checked: boolean;
}

export interface FilterModel {
  label: string;
  dataKey: string;
  checked?: boolean;
  childData?: FilterModelChild[];
}

export interface FilterData {
  label: string;
  dataKey: string;
  checkedValue?: string;
  radio: boolean;
  data: FilterModel[];
}
