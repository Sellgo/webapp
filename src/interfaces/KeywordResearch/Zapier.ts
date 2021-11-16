export interface Trigger {
  rules: any[];
  assignments: any[];
}

export interface Rule {
  kpi: string;
  condition: string;
  value: any;
  operator?: 'or' | 'and';
}
