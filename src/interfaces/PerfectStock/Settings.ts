type IOption = {
  key: string | number | null;
  text: string;
  value: string | number | null;
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
  type: 'text' | 'number' | 'selection' | 'date' | 'checkbox' | 'toggle' | 'label';
  prepend?: string;
  append?: string;
  options?: IOption[];
  width: number;
  disabled?: boolean;
  optional?: boolean;
  numberOptions?: NumberOptions;
}
