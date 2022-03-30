import { SubChartSettings } from '../../interfaces/PerfectStock/Home';
import { getDateOnly } from '../../utils/date';

/* All action types */
export const actionTypes = {
  IS_LOADING_MAIN_CHART: 'IS_LOADING_MAIN_CHART',
  IS_LOADING_SUB_CHARTS: 'IS_LOADING_SUB_CHARTS',
  SET_MAIN_CHART: 'SET_MAIN_CHART',
  SET_SUB_CHART: 'SET_SUB_CHART',
  SET_SUB_CHART_SETTINGS: 'SET_SUB_CHART_SETTINGS',
};

export const TIME_RANGE_OPTIONS = [
  {
    key: 'Next 7 days',
    value: '7',
    text: 'Next 7 days',
  },
  {
    key: 'Next 4 weeks',
    value: '28',
    text: 'Next 4 weeks',
  },
  {
    key: 'Next 3 months',
    value: '91',
    text: 'Next 3 months',
  },
  {
    key: 'Next 12 months',
    value: '365',
    text: 'Next 12 months',
  },
  {
    key: 'Next 24 months',
    value: '730',
    text: 'Next 24 months',
  },
  {
    key: 'Next 36 months',
    value: '1095',
    text: 'Next 36 months',
  },
  {
    key: 'Other',
    value: '0',
    text: 'Other',
  },
];

export const VALID_PRESET_TIME_RANGE = [7, 28, 91, 365, 730, 1095];

export const GRANULARITIES = [
  {
    key: 'Daily',
    value: 1,
    text: 'Daily',
  },
  {
    key: 'Weekly',
    value: 7,
    text: 'Weekly',
  },
  {
    key: 'Biweekly',
    value: 14,
    text: 'Biweekly',
  },
  {
    key: 'Monthly',
    value: 30,
    text: 'Monthly',
  },
];

export const getGranularityLabel = (granularity: number) => {
  const granularityObj = GRANULARITIES.find(item => item.value === granularity);
  return granularityObj ? granularityObj.text : '';
};

export const getGranularityValue = (granularity: string) => {
  const granularityObj = GRANULARITIES.find(item => item.text === granularity);
  return granularityObj ? granularityObj.value : 0;
};

export const CASH_FLOW_CHART_TYPE = {
  ORDER_COST: 'order_cost',
  FREIGHT_COST: 'freight_cost',
  DUTY: 'duty',
  IMPORT_COST: 'import_cost',
  DEPOSITS: 'deposits',
  PAID_FULL: 'paid_full',
  AMAZON_PAYMENTS: 'amz_payments',
  REVENUE: 'revenue',
  AMAZON_FEES: 'amz_fees',
  LAST_LEG: 'last_leg',
  MID_PAYMENTS: 'mid_payments',
  EMPLOYEE_EXPENSES: 'employees',
  PPC_EXPENSES: 'ppc',
};

export const CASH_FLOW_CHART_TITLES = {
  [CASH_FLOW_CHART_TYPE.ORDER_COST]: 'Order Cost',
  [CASH_FLOW_CHART_TYPE.FREIGHT_COST]: 'Freight Cost',
  [CASH_FLOW_CHART_TYPE.DUTY]: 'Duty',
  [CASH_FLOW_CHART_TYPE.IMPORT_COST]: 'Import Cost',
  [CASH_FLOW_CHART_TYPE.DEPOSITS]: 'Deposits',
  [CASH_FLOW_CHART_TYPE.PAID_FULL]: 'Paid Full',
  [CASH_FLOW_CHART_TYPE.AMAZON_PAYMENTS]: 'Amazon Payments',
  [CASH_FLOW_CHART_TYPE.REVENUE]: 'Revenue',
  [CASH_FLOW_CHART_TYPE.AMAZON_FEES]: 'Amazon Fees',
  [CASH_FLOW_CHART_TYPE.LAST_LEG]: 'Last Leg',
  [CASH_FLOW_CHART_TYPE.MID_PAYMENTS]: 'Mid Payments',
  [CASH_FLOW_CHART_TYPE.EMPLOYEE_EXPENSES]: 'Employee Expenses',
  [CASH_FLOW_CHART_TYPE.PPC_EXPENSES]: 'PPC Expenses',
};

export const DEFAULT_SUB_CHARTS_TO_SHOW = [
  CASH_FLOW_CHART_TYPE.ORDER_COST,
  CASH_FLOW_CHART_TYPE.FREIGHT_COST,
  CASH_FLOW_CHART_TYPE.DUTY,
  CASH_FLOW_CHART_TYPE.IMPORT_COST,
  CASH_FLOW_CHART_TYPE.DEPOSITS,
  CASH_FLOW_CHART_TYPE.PAID_FULL,
  CASH_FLOW_CHART_TYPE.AMAZON_PAYMENTS,
  CASH_FLOW_CHART_TYPE.REVENUE,
  CASH_FLOW_CHART_TYPE.AMAZON_FEES,
  CASH_FLOW_CHART_TYPE.LAST_LEG,
  CASH_FLOW_CHART_TYPE.MID_PAYMENTS,
  CASH_FLOW_CHART_TYPE.EMPLOYEE_EXPENSES,
  CASH_FLOW_CHART_TYPE.PPC_EXPENSES,
];

export const DEFAULT_SUB_CHART_SETTINGS: SubChartSettings = {
  types: DEFAULT_SUB_CHARTS_TO_SHOW,
  start_date: getDateOnly(new Date()),
  end_date: getDateOnly(new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)),
  granularity: 1,
};
