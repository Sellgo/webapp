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
    key: '5',
    text: '5',
    value: '5',
  },
  {
    key: '10',
    text: '10',
    value: '10',
  },
  {
    key: '30',
    text: '30',
    value: '30',
  },
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
];

export const tableKeys = {
  SUPPLIERS: 'supplier_list',
  PRODUCTS: 'product_list',
};
