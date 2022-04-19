export const PERFECT_STOCK_PAGES = [
  '/aistock/home',
  '/aistock/sales',
  '/aistock/order',
  '/aistock/tpl',
  '/aistock/create-order',

  /* Cash flow page settings */
  '/aistock/home-expenses-settings',
  '/aistock/home-ppc-settings',
  '/aistock/home-launch-settings',
];

export const HIDE_TAB_PAGES = [
  '/aistock/create-order',
  '/aistock/home-expenses-settings',
  '/aistock/home-ppc-settings',
  '/aistock/home-launch-settings',
];
export const PERFECT_STOCK_PRODUCT_DETAILS = [
  {
    name: 'Cash Flow',
    desc: 'Cash flow analysis',
    settings: '/aistock/home-expenses-settings',
  },
  {
    name: 'Sales Forecasting',
    desc: 'Accurately project high seasonal sales',
    settings: '',
  },
  {
    name: 'Order Planning',
    desc: 'Easily create order planning',
    settings: '',
  },
  {
    name: '3PL Manager',
    desc: '3PL storage management solved',
    settings: '',
  },
  {
    name: 'Create Order',
    desc: 'Easily create order planning',
    settings: '',
  },
  {
    name: 'Employee Expenses',
    desc: 'Manage Employee Expenses',
    settings: '',
  },
  {
    name: 'PPC',
    desc: 'Manage PPC',
    settings: '',
  },
  {
    name: 'Launch Expenses',
    desc: 'Manage Launch Expenses',
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
