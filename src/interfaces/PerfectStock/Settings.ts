type IOption = {
  key: string;
  text: string;
  value: string | number;
};

export interface NumberOptions {
  isInteger?: boolean;
  isPositiveOnly?: boolean;
  thousandSeperate?: boolean;
  allow5Decimal?: boolean;
}
export interface Column {
  title: string;
  dataKey: string;
  type: 'text' | 'number' | 'selection' | 'date';
  prepend?: string;
  append?: string;
  options?: IOption[];
  width: number;
  disabled?: boolean;
  optional?: boolean;
  numberOptions?: NumberOptions;
}
