export interface NumberOptions {
  isInteger?: boolean;
  isPositiveOnly?: boolean;
}

export interface Column {
  title: string;
  dataKey: string;
  type: 'text' | 'number';
  align: 'center' | 'left' | 'right';
  prepend?: string;
  append?: string;
  width: number;
  isEditable?: boolean;
  isRadio?: boolean;
  numberOptions?: NumberOptions;
}
