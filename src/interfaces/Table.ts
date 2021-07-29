export interface TableAlignmentSettings {
  verticalAlign: 'top' | 'middle' | 'bottom';
  align: 'left' | 'center' | 'right';
}

export interface RowCell {
  rowData?: any;
  dataKey: string;
}
