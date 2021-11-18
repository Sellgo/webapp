import { Rule, Trigger } from '../../interfaces/KeywordResearch/Zapier';

export const DEFAULT_RULE: Rule = {
  field_name: '',
  condition: '',
  value: '',
};

export const DEFAULT_TRIGGER: Trigger = {
  name: 'Default Trigger',
  rules: [],
  assignments: [],
};

export const CONDITIONS = {
  text: [
    {
      text: 'Contain',
      key: 'Contain',
      value: 'contains',
    },
    {
      text: 'Does not contain',
      key: 'Does not contain',
      value: 'not_contains',
    },
    {
      text: 'Exactly matches',
      key: 'Exactly matches',
      value: 'equal',
    },
    {
      text: 'Does not exactly match',
      key: 'Does not exactly match',
      value: 'not_equal',
    },
    {
      text: 'Is in',
      key: 'Is in',
      value: 'in',
    },
    {
      text: 'Is not in',
      key: 'Is not in',
      value: 'not_in',
    },
    {
      text: 'Starts with',
      key: 'Starts with',
      value: 'starts_with',
    },
    {
      text: 'Does not start with',
      key: 'Does not start with',
      value: 'not_starts_with',
    },
    {
      text: 'Ends with',
      key: 'Ends with',
      value: 'ends_with',
    },
    {
      text: 'Does not end with',
      key: 'Does not end with',
      value: 'not_ends_with',
    },
  ],

  number: [
    {
      text: 'Greater than',
      key: 'gt',
      value: 'gt',
    },
    {
      text: 'Less than',
      key: 'lt',
      value: 'lt',
    },
  ],

  date: [
    {
      text: 'After',
      key: 'After',
      value: 'gt',
    },
    {
      text: 'Before',
      key: 'Before',
      value: 'lt',
    },
    {
      text: 'Equals',
      key: 'Equals',
      value: 'equal',
    },
  ],

  boolean: [
    {
      text: 'Is true',
      key: 'exact',
      value: 'equal',
    },
    {
      text: 'Is true',
      key: 'exact',
      value: 'equal',
    },
  ],
};

export const KEYWORD_KPIS: {
  key: string;
  value: string;
  text: string;
  type?: 'number' | 'text' | 'date' | 'boolean';
}[] = [
  {
    text: 'Search Volume',
    value: 'search_volume',
    key: 'Search Volume',
    type: 'number',
  },
  {
    text: 'Competing Products',
    value: 'competing_products',
    key: 'Competing Products',
    type: 'number',
  },
  {
    text: 'Organic Rank',
    value: 'position_rank',
    key: 'Organic Rank',
    type: 'number',
  },
  {
    text: 'Relative Rank',
    value: 'relative_rank',
    key: 'Relative Rank',
    type: 'number',
  },
  {
    text: 'Rank Avg',
    value: 'average_rank',
    key: 'Rank Avg',
    type: 'number',
  },
  {
    text: 'Ranking ASINs',
    value: 'ranking_asins',
    key: 'Ranking ASINs',
    type: 'number',
  },
  {
    text: 'Sponsored Rank',
    value: 'sponsored_rank',
    key: 'Sponsored Rank',
    type: 'number',
  },
  {
    text: 'Drop/ Raise Index',
    value: 'index',
    key: 'Drop/ Raise Index',
    type: 'number',
  },
];

export const getType = (kpiValue: string): 'number' | 'text' | 'date' | 'boolean' => {
  const kpi = KEYWORD_KPIS.find(kpi => kpi.value === kpiValue);

  if (kpi && kpi.type) {
    return kpi.type;
  } else {
    return 'number';
  }
};
