import _ from 'lodash';
import numeral from 'numeral';

export const formatCurrency = (num: any) =>
  Number(num).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

export const formatNumber = (num: any) => Math.round(num).toLocaleString();

export const formatRating = (num: any) => Number(num).toFixed(1);

export const formatPercent = (num: any) => Number(num).toFixed(2) + '%';

export const showNAIfZeroOrNull = (expression: any, value: any) =>
  expression &&
  expression !== '0' &&
  expression !== '0.0' &&
  expression !== '0.00' &&
  expression !== 0
    ? value
    : '-';

export const truncateString = (text: string, maxLength: number, trailing = '…') =>
  text && text.length > maxLength ? text.substring(0, maxLength) + trailing : text;

export const formatDimensionForSorting = (dimension: string): number => {
  return dimension
    .replace(/"/g, '')
    .split('x')
    .reduce((acc, val) => {
      if (val === '' || val === ' ') {
        // for null dimensions
        return acc * -Infinity;
      }
      return acc * Number(val);
    }, 1);
};

export const formatString = (value: any) => (!value || value === 'null' ? '-' : value);

export const formatBoolean = (value: boolean) => (value ? 'Yes' : 'No');

export const openLink = (link: string) => window.open(link, '_blank');

export const extractAsinFromUrl = (data: string) => {
  const regex = RegExp('(?:[/dp/]|$)([A-Z0-9]{10})');
  const asinData = data.split(' ');
  _.each(asinData, (item, index) => {
    const res = item.match(regex);
    if (res) {
      asinData[index] = res[1];
    }
  });
  return asinData.join();
};

export const removeSpecialChars = (str: any, deliminater?: string) => {
  if (Array.isArray(str)) {
    return str.join(`${deliminater ? deliminater : ','}`);
  }
  return str.trim().replace(/[" ' [\]/]/gi, '');
};

export const prettyPrintNumber = (num: number) => {
  const formattedNumber = numeral(num).format('0a');

  if (num < 9999) {
    const firstResult = formatNumber(num);
    return firstResult;
  }

  return formattedNumber;
};

export const parseKpiLists = (kpiList: any) => {
  return JSON.parse(JSON.stringify(kpiList))
    .toString()
    .trim()
    .replace(/[" ' [\]/]/gi, '')
    .split(',');
};
