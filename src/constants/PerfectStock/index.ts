export const PERFECT_STOCK_PAGES = [
  '/perfect-stock/order-planning',
  '/perfect-stock/sales-estimation',
];
export const PERFECT_STOCK_PRODUCT_DETAILS = [
  {
    name: 'Order Planning',
    desc: 'Order Planning.',
  },
  {
    name: 'Sales Estimation',
    desc: 'Sales Estimation.',
  },
];

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
