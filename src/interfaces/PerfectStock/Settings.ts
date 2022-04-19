type IOption = {
  key: string;
  text: string;
  value: string | number;
};

export interface Column {
  title: string;
  dataKey: string;
  type: 'text' | 'number' | 'selection' | 'date';
  prepend?: string;
  append?: string;
  options?: IOption[];
  width: number;
}
