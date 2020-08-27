export const OPEN = 'OPEN';
export const CLOSE = 'CLOSE';

export const numberWithCommas = (x: any) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export const defaultSelect = {
  value: '',
  key: '',
  text: '',
};

export const selectItemsCountList = [
  {
    key: '50',
    text: '50',
    value: '50',
  },
  {
    key: '100',
    text: '100',
    value: '100',
  },
  {
    key: '200',
    text: '200',
    value: '200',
  },
];

export const tableKeys = {
  SUPPLIERS: 'supplier_list',
  PRODUCTS: 'product_list',
  LEADS: 'leads_list',
};
