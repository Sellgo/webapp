import { SubChartSettings } from '../../interfaces/PerfectStock/Home';
import { Column } from '../../interfaces/PerfectStock/Settings';
import { getDateOnly } from '../../utils/date';
import { CURRENCY_OPTIONS, REPEAT_OPTIONS } from '.';

/* All action types */
export const actionTypes = {
  IS_LOADING_MAIN_CHART: 'IS_LOADING_MAIN_CHART',
  IS_LOADING_SUB_CHARTS: 'IS_LOADING_SUB_CHARTS',
  SET_MAIN_CHART: 'SET_MAIN_CHART',
  SET_SUB_CHART: 'SET_SUB_CHART',
  SET_SUB_CHART_SETTINGS: 'SET_SUB_CHART_SETTINGS',
  SET_CASHFLOW_ONBOARDING_STATUS: 'SET_CASHFLOW_ONBOARDING_STATUS',
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
  LAUNCH_EXPENSES: 'launch',
  ORDER_VOLUME: 'order_volume',
  PROFIT: 'profit',
  STORAGE_COST: 'storage',
  MISC_COST: 'misc',
};

export const CASH_FLOW_CHART_DETAILS = {
  [CASH_FLOW_CHART_TYPE.ORDER_COST]: {
    title: 'Order Cost',
    unitPrepend: '$',
    unitAppend: '',
  },
  [CASH_FLOW_CHART_TYPE.FREIGHT_COST]: {
    title: 'Freight Cost',
    unitPrepend: '$',
    unitAppend: '',
  },
  [CASH_FLOW_CHART_TYPE.DUTY]: {
    title: 'Duty',
    unitPrepend: '$',
    unitAppend: '',
  },
  [CASH_FLOW_CHART_TYPE.IMPORT_COST]: {
    title: 'Import Cost',
    unitPrepend: '$',
    unitAppend: '',
  },
  [CASH_FLOW_CHART_TYPE.DEPOSITS]: {
    title: 'Deposits',
    unitPrepend: '$',
    unitAppend: '',
  },
  [CASH_FLOW_CHART_TYPE.PAID_FULL]: {
    title: 'Paid Full',
    unitPrepend: '$',
    unitAppend: '',
  },
  [CASH_FLOW_CHART_TYPE.AMAZON_PAYMENTS]: {
    title: 'Amazon Payments',
    unitPrepend: '$',
    unitAppend: '',
  },
  [CASH_FLOW_CHART_TYPE.REVENUE]: {
    title: 'Revenue',
    unitPrepend: '$',
    unitAppend: '',
  },
  [CASH_FLOW_CHART_TYPE.AMAZON_FEES]: {
    title: 'Amazon Fees',
    unitPrepend: '$',
    unitAppend: '',
  },
  [CASH_FLOW_CHART_TYPE.LAST_LEG]: {
    title: 'Last Leg',
    unitPrepend: '$',
    unitAppend: '',
  },
  [CASH_FLOW_CHART_TYPE.MID_PAYMENTS]: {
    title: 'Mid Payments',
    unitPrepend: '$',
    unitAppend: '',
  },
  [CASH_FLOW_CHART_TYPE.EMPLOYEE_EXPENSES]: {
    title: 'Employee Expenses',
    unitPrepend: '$',
    unitAppend: '',
  },
  [CASH_FLOW_CHART_TYPE.PPC_EXPENSES]: {
    title: 'PPC Expenses',
    unitPrepend: '$',
    unitAppend: '',
  },
  [CASH_FLOW_CHART_TYPE.LAUNCH_EXPENSES]: {
    title: 'Launch Expenses',
    unitPrepend: '$',
    unitAppend: '',
  },
  [CASH_FLOW_CHART_TYPE.ORDER_VOLUME]: {
    title: 'Order Volume',
    unitPrepend: '',
    unitAppend: 'CBM',
  },
  [CASH_FLOW_CHART_TYPE.PROFIT]: {
    title: 'Profit',
    unitPrepend: '$',
    unitAppend: '',
  },
  [CASH_FLOW_CHART_TYPE.STORAGE_COST]: {
    title: 'Storage Cost',
    unitPrepend: '$',
    unitAppend: '',
  },
  [CASH_FLOW_CHART_TYPE.MISC_COST]: {
    title: 'Misc Cost',
    unitPrepend: '$',
    unitAppend: '',
  },
};

export const DEFAULT_SUB_CHARTS_TO_SHOW = [
  CASH_FLOW_CHART_TYPE.ORDER_COST,
  CASH_FLOW_CHART_TYPE.FREIGHT_COST,
  CASH_FLOW_CHART_TYPE.DUTY,
  CASH_FLOW_CHART_TYPE.IMPORT_COST,
  CASH_FLOW_CHART_TYPE.DEPOSITS,
  CASH_FLOW_CHART_TYPE.MID_PAYMENTS,
  CASH_FLOW_CHART_TYPE.PAID_FULL,
  CASH_FLOW_CHART_TYPE.AMAZON_PAYMENTS,
  CASH_FLOW_CHART_TYPE.REVENUE,
  CASH_FLOW_CHART_TYPE.AMAZON_FEES,
  CASH_FLOW_CHART_TYPE.EMPLOYEE_EXPENSES,
  CASH_FLOW_CHART_TYPE.PPC_EXPENSES,
  CASH_FLOW_CHART_TYPE.ORDER_VOLUME,
  CASH_FLOW_CHART_TYPE.PROFIT,
  CASH_FLOW_CHART_TYPE.STORAGE_COST,
  CASH_FLOW_CHART_TYPE.MISC_COST,
];

export const DEFAULT_SUB_CHART_SETTINGS: SubChartSettings = {
  types: DEFAULT_SUB_CHARTS_TO_SHOW,
  start_date: getDateOnly(new Date()),
  end_date: getDateOnly(new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)),
  granularity: 1,
};

export const PPC_SETTINGS_COLUMNS: Column[] = [
  {
    width: 200,
    dataKey: 'name',
    title: 'Description',
    type: 'text',
  },
  {
    width: 200,
    dataKey: 'start_date',
    title: 'Start Date',
    type: 'date',
  },
  {
    width: 130,
    dataKey: 'amount',
    title: 'Amount',
    type: 'number',
    prepend: '$',
  },
  {
    width: 200,
    dataKey: 'repeat_days',
    title: '',
    type: 'selection',
    options: REPEAT_OPTIONS,
  },
];

export const EXPENSES_SETTINGS_COLUMNS: Column[] = [
  {
    width: 200,
    dataKey: 'name',
    title: 'Name',
    type: 'text',
  },
  {
    width: 200,
    dataKey: 'start_date',
    title: 'Start Date',
    type: 'date',
  },
  {
    width: 130,
    dataKey: 'amount',
    title: 'Amount',
    type: 'number',
    prepend: '$',
  },
  {
    width: 200,
    dataKey: 'repeat_days',
    title: '',
    type: 'selection',
    options: REPEAT_OPTIONS,
  },
];

export const RECONCILE_SETTINGS_OPTIONS: Column[] = [
  {
    width: 200,
    dataKey: 'name',
    title: 'Name',
    type: 'text',
  },
  {
    width: 200,
    dataKey: 'date',
    title: 'Date',
    type: 'date',
  },
  {
    width: 130,
    dataKey: 'amount',
    title: 'Amount',
    type: 'number',
    prepend: '$',
  },
  {
    width: 200,
    dataKey: 'currency',
    title: 'Currency',
    type: 'selection',
    optional: true,
    options: CURRENCY_OPTIONS,
  },
];

export const SETTINGS_OPTIONS = [
  {
    name: 'Employee Expenses',
    url: '/settings/aistock/employee-expenses-settings',
    disabled: false,
  },
  {
    name: 'PPC',
    url: '/settings/aistock/ppc-expenses-settings',
    disabled: false,
  },
  {
    name: 'Misc Expenses',
    url: '/settings/aistock/misc-expenses-settings',
    disabled: false,
  },
  {
    name: 'Reconcile Expenses',
    url: '/settings/aistock/cash-flow-reconcile-settings',
    disabled: false,
  },
];

export const ONBOARDING_STATUS_MAPPING: any = {
  employee: {
    title: 'Employee Costs',
    to: '/settings/aistock/employee-expenses-settings',
  },
  ppc: {
    title: 'PPC Costs',
    to: '/settings/aistock/ppc-expenses-settings',
  },
  misc: {
    title: 'Misc Costs',
    to: '/settings/aistock/misc-expenses-settings',
  },
  sku: {
    title: 'Sku Settings',
    to: '/settings/aistock/sku-settings',
  },
  duty: {
    title: 'Duty Settings',
    to: '/settings/aistock/duty-tax-settings',
  },
  payment_terms: {
    title: 'Payment Terms',
    to: '/settings/aistock/payment-terms-settings',
  },
};
