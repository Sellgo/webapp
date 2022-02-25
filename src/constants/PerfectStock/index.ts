export const PERFECT_STOCK_PAGES = ['/aistock/sales', '/aistock/order', '/aistock/create-order'];
export const PERFECT_STOCK_PRODUCT_DETAILS = [
  {
    name: 'Sales Forecasting',
    desc: 'Accurately project high seasonal sales',
  },
  {
    name: 'Order Planning',
    desc: 'Easily create order planning',
  },
  {
    name: 'Order Planning',
    desc: 'Easily create order planning',
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
  // {
  //   key: 'Cargo Ready Date',
  //   value: 'cargo_ready_date',
  //   text: 'Cargo Ready Date',
  //   color: '#5dc560',
  // },
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
    text: 'FBA Check-in',
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
