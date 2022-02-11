export const PERFECT_STOCK_PAGES = [
  '/perfect-stock/sales-estimation',
  '/perfect-stock/inventory',
  '/perfect-stock/order-planning',
];
export const PERFECT_STOCK_PRODUCT_DETAILS = [
  {
    name: 'Sales Estimation',
    desc: 'Sales Estimation.',
  },
  {
    name: 'Inventory',
    desc: 'Inventory.',
  },
  {
    name: 'Order Planning',
    desc: 'Order Planning.',
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
    color: '#349AF8',
  },
  {
    key: 'Ocean Freight',
    value: 'ocean_freight',
    text: 'Ocean Freight',
    color: '#5DC560',
  },
  {
    key: 'Ground Freight',
    value: 'ground_freight',
    text: 'Ground Freight',
    color: '#7ED1DC',
  },
  // {
  //   key: '3PL Warehouse',
  //   value: '3_pl_warehouse',
  //   text: '3PL Warehouse',
  //   color: '#AE8BE7',
  // },
  {
    key: 'FBA Check-in',
    value: 'fba_checkin',
    text: 'FBA Check-in',
    color: '#EA8731',
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
