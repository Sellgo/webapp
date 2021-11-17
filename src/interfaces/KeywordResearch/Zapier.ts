export interface Rule {
  kpi: string;
  condition: string;
  value: any;
  operator?: 'or' | 'and';
}

export interface Trigger {
  name: string;
  rules: Rule[];
  assignments: any[];
}
