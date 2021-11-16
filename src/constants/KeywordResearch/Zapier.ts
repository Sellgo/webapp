import { Rule } from '../../interfaces/KeywordResearch/Zapier';

export const DEFAULT_RULE: Rule = {
  kpi: '',
  condition: '',
  value: '',
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
      value: 'contains',
    },
    {
      text: 'Exactly matches',
      key: 'Exactly matches',
      value: 'exact',
    },
    {
      text: 'Does not exactly match',
      key: 'Does not exactly match',
      value: 'exact',
    },
    {
      text: 'Is in',
      key: 'Is in',
      value: 'in',
    },
    {
      text: 'Is not in',
      key: 'Is not in',
      value: 'in',
    },
    {
      text: 'Starts with',
      key: 'Starts with',
      value: 'startswith',
    },
    {
      text: 'Does not start with',
      key: 'Does not start with',
      value: 'startswith',
    },
    {
      text: 'Ends with',
      key: 'Ends with',
      value: 'endswith',
    },
    {
      text: 'Does not end with',
      key: 'Does not end with',
      value: 'endswith',
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
      key: 'gt',
      value: 'gt',
    },
    {
      text: 'Before',
      key: 'lt',
      value: 'lt',
    },
    {
      text: 'Equals',
      key: 'exact',
      value: 'exact',
    },
  ],

  boolean: [
    {
      text: 'Is true',
      key: 'exact',
      value: 'exact',
    },
    {
      text: 'Is true',
      key: 'exact',
      value: 'exact',
    },
  ],
};

export const KEYWORD_KPIS: {
  key: string;
  value: string;
  text: string;
}[] = [
  {
    text: 'Search Volume',
    value: 'search_volume',
    key: 'Search Volume',
  },
  {
    text: 'Competing Products',
    value: 'competing_products',
    key: 'Competing Products',
  },
  {
    text: 'Trend',
    value: 'Trend',
    key: 'Trend',
  },
  {
    text: 'Organic Rank',
    value: 'organic_rank',
    key: 'Organic Rank',
  },
  {
    text: 'Relative Rank',
    value: 'relative_rank',
    key: 'Relative Rank',
  },
  {
    text: 'Rank Avg',
    value: 'average_rank',
    key: 'Rank Avg',
  },
  {
    text: 'Ranking ASINs',
    value: 'asins_rank',
    key: 'Ranking ASINs',
  },
  {
    text: 'Sponsored Rank',
    value: 'sponsored_rank',
    key: 'Sponsored Rank',
  },
  {
    text: 'Drop/ Raise Index',
    value: 'drop_raise_index',
    key: 'Drop/ Raise Index',
  },
];
