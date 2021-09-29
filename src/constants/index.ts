import validator from 'validator';

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

/* Asin validations */
export const asinRegex = RegExp('([A-Z0-9]{10})');

export const isValidAsin = (asin: string) => {
  const formattedAsin = asin.trim().toUpperCase();

  return (
    asinRegex.test(formattedAsin) &&
    validator.isAlphanumeric(formattedAsin) &&
    formattedAsin.length === 10
  );
};

/* Amazon Seller ID validation */
export const isValidAmazonSellerId = (sellerId: string) => {
  const formatSellerId = sellerId.toUpperCase();

  /* Always starts with a */
  const startsWithValidation = formatSellerId.startsWith('A');

  /* Length>=14 and <=21 */
  const length = formatSellerId.length;
  const lengthValidation = length >= 14 && length <= 21;

  /* Only alphanumeric chacters */
  const alphaNumericValidation = validator.isAlphanumeric(formatSellerId);

  return startsWithValidation && lengthValidation && alphaNumericValidation;
};
