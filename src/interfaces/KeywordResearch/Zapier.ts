export interface Rule {
  field_name: string;
  condition: string;
  value: any;
  logical_operator?: 'or' | 'and';
}

export interface Trigger {
  name?: string;
  rules: Rule[];
  assignments: any[];
}

export interface TriggerMetaData {
  id: number;
  name: string;
  status: string;
  is_assigned?: boolean;
}

export interface SelectionKeyword {
  is_assigned: boolean;
  keyword_track_id: number;
  phrase: string;
  title: string;
}
