export const PERFECT_STOCK_PAGES = [
  '/aistock/sales',
  '/aistock/order',
  '/aistock/tpl',
  '/aistock/home',
  '/aistock/create-order',

  /* Cash flow page settings */
  /*global*/
  '/settings/aistock/sku-settings',
  /*sales*/
  /*order*/
  '/settings/aistock/days-of-inventory-settings',
  '/settings/aistock/payment-terms-settings',
  '/settings/aistock/duty-tax-settings',
  '/settings/aistock/container-settings',
  /*3PL*/
  /*cash flow*/
  '/settings/aistock/employee-expenses-settings',
  '/settings/aistock/product-launch-expenses-settings',
  '/settings/aistock/ppc-expenses-settings',
  '/settings/aistock/misc-expenses-settings',
  '/settings/aistock/cash-flow-reconcile-settings',
];

export const HIDE_TAB_PAGES = [
  '/aistock/create-order',
  /*global*/
  '/settings/aistock/sku-settings',
  /*sales*/
  /*order*/
  '/settings/aistock/days-of-inventory-settings',
  '/settings/aistock/payment-terms-settings',
  '/settings/aistock/duty-tax-settings',
  '/settings/aistock/container-settings',
  /*3PL*/
  /*cash flow*/
  '/settings/aistock/employee-expenses-settings',
  '/settings/aistock/product-launch-expenses-settings',
  '/settings/aistock/ppc-expenses-settings',
  '/settings/aistock/misc-expenses-settings',
  '/settings/aistock/cash-flow-reconcile-settings',
];

export const PERFECT_STOCK_PRODUCT_DETAILS = [
  {
    name: 'Sales Forecasting',
    desc: 'Accurately project high seasonal sales',
    settings: '',
  },
  {
    name: 'Order Planning',
    desc: 'Easily create order planning',
    settings: '/settings/aistock/days-of-inventory-settings',
  },
  {
    name: '3PL Manager',
    desc: '3PL storage management solved',
    settings: '',
  },
  {
    name: 'Cash Flow',
    desc: 'Cash flow analysis',
    settings: '/settings/aistock/employee-expenses-settings',
  },
  {
    name: 'Create Order',
    desc: 'Easily create order planning',
    settings: '',
  },
  {
    name: 'Days of Inventory',
    desc: 'Set up days of inventory',
    settings: '',
  },
  {
    name: 'Shipping Containers',
    desc: 'Set up shipping containers',
    settings: '',
  },
  {
    name: 'SKU Settings',
    desc: 'Set up SKU settings',
    settings: '',
  },
  {
    name: 'Duty Settings',
    desc: 'Set up duty settings',
    settings: '',
  },
  {
    name: 'Payment Terms',
    desc: 'Set up payment terms',
    settings: '',
  },
  {
    name: 'Employee Expenses',
    desc: 'Manage Employee Expenses',
    settings: '',
  },
  {
    name: 'PPC Expenses',
    desc: 'Manage PPC expenses',
    settings: '',
  },
  {
    name: 'Misc Expenses',
    desc: 'Manage misc Expenses',
    settings: '',
  },
  {
    name: 'Reconcile Settings',
    desc: 'Add reconcile',
    settings: '',
  },
];

export const PERFECT_STOCK_SELLER_STATUS = {
  SP_API_FAILED: 'amz_connect_failed',
  SP_API_CONNECTED: 'amz_connect_success',
  MIGRATION_IN_PROGRESS: 'migration_in_progress',
  MIGRATION_SUCCESS: 'migration_success',
  MIGRATION_FAILED: 'migration_failed',
};

export const LEAD_TIME_OPTIONS = [
  {
    key: 'In Production',
    value: 'in_production',
    text: 'In Production',
    color: '#349af8',
  },
  {
    key: 'Cargo Ready Date',
    value: 'crd',
    text: 'CRD',
    color: '#5dc560',
  },
  {
    key: 'En Route',
    value: 'en_route',
    text: 'En Route',
    color: '#fc7900',
  },
  {
    key: 'Port Arrival',
    value: 'port_arrival',
    text: 'Port Arrival',
    color: '#eb675e',
  },
  {
    key: 'Ground Shipping',
    value: 'ground_freight',
    text: 'Ground Shipping',
    color: '#b318f1',
  },
  {
    key: '3PL Check In',
    value: 'warehouse_3pl',
    text: '3PL Check In',
    color: '#5381db',
  },
  {
    key: 'FBA Check-in',
    value: 'fba_checkin',
    text: '1st FBA Check-in',
    color: '#5dc560',
  },
];

export const GRAPH_SETTING_OPTIONS: { [key: string]: 'line' | 'bar' } = {
  LINE: 'line',
  BAR: 'bar',
};

export const getLeadTimeName = (value: string) => {
  const leadTime = LEAD_TIME_OPTIONS.find(item => item.value === value);
  return leadTime ? leadTime.text : '';
};

export const getLeadTimeColor = (value: string) => {
  const leadTime = LEAD_TIME_OPTIONS.find(item => item.value === value);
  return leadTime ? leadTime.color : '';
};

export const SETTINGS_REPEAT_OPTIONS = [
  {
    key: 'Does not repeat',
    value: 0,
    text: 'Does not repeat',
  },
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
  {
    key: 'Annually',
    value: 365,
    text: 'Annually',
  },
];

export const REPEAT_OPTIONS = [
  {
    key: 'Does not repeat',
    value: 0,
    text: 'Does not repeat',
  },
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
  {
    key: 'Annually',
    value: 365,
    text: 'Annually',
  },
];

export const STATUS_OPTIONS = [
  {
    key: 'Active',
    value: 'Active',
    text: 'Active',
  },
  {
    key: 'Inactive',
    value: 'Inactive',
    text: 'Inactive',
  },
];

export const DIMENSION_UNIT_OPTIONS = [
  {
    key: 'cm',
    value: 'cm',
    text: 'cm',
  },
  {
    key: 'inches',
    value: 'inch',
    text: 'inches',
  },
];

export const WEIGHT_UNIT_OPTIONS = [
  {
    key: 'kg',
    value: 'kg',
    text: 'kg',
  },
  {
    key: 'pounds',
    value: 'lbs',
    text: 'pounds',
  },
];

export const CURRENCY_OPTIONS = [
  {
    key: 'usd',
    value: 'usd',
    text: 'USD',
  },
];
