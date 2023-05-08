import _ from 'lodash';
import numeral from 'numeral';
import countriesList from '../assets/countriesList.json';

export const formatCurrency = (num: any) =>
  Number(num).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumSignificantDigits: 2,
  });

export const formatNumber = (num: any) => {
  return Math.round(num).toLocaleString();
};

export const formatDecimal = (num: any) => {
  if (!num || num === 0 || num === '0') {
    return num;
  }

  return (
    parseFloat(num)
      .toLocaleString()
      .split('.')[0] +
    '.' +
    Number(num)
      .toFixed(2)
      .split('.')[1]
  );
};

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

export const showNAIfNull = (expression: any, value: any) => {
  if (expression === 0) {
    return value;
  }

  return expression && expression !== 'NaN' ? value : '-';
};

export const truncateString = (text: string, maxLength: number, trailing = '…') =>
  text && text.length > maxLength ? text.substring(0, maxLength) + trailing : text;

export const truncateIntoTwoLines = (text: string, lineLength: number, maxLength: number) => {
  if (!text) {
    return ['-', ''];
  }

  const sentence = text.split(' ');
  let exceededMaxLength = false;
  let wentToNextLine = false;
  let line1 = '';
  let line2 = '';
  sentence.map(word => {
    if (line1.length + word.length <= lineLength && !wentToNextLine && !exceededMaxLength) {
      line1 += `${word} `;
    } else if (
      line1.length + word.length + line2.length <= maxLength &&
      !exceededMaxLength &&
      line2.length + word.length <= lineLength
    ) {
      /* First time word enters into next line */
      wentToNextLine = true;
      line2 += `${word} `;
    } else {
      exceededMaxLength = true;
    }
    return word;
  });
  if (exceededMaxLength) {
    line2 += '...';
  }

  return [line1, line2];
};
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

export const prettyPrintNumber = (num: number | undefined) => {
  if (!num) {
    return 0;
  }
  const formattedNumber = numeral(num).format('0a');

  if (num < 9999) {
    const firstResult = formatNumber(num);
    return firstResult;
  }

  return formattedNumber;
};

export const prettyPrintDecimal = (num: number | undefined) => {
  if (!num) {
    return 0;
  }
  const formattedNumber = numeral(num).format('0.00a');
  if (num < 9999) {
    const firstResult = formatDecimal(num);
    return firstResult;
  }

  return formattedNumber;
};

export const parseKpiLists = (kpiList: any) => {
  if (!kpiList) {
    return [];
  }
  return JSON.parse(JSON.stringify(kpiList))
    .toString()
    .trim()
    .replace(/[" ' [\]/]/gi, '')
    .split(',')
    .filter((k: string) => k.length > 0);
};

export const capitalizeFirstLetter = (str: string) => {
  if (!str) {
    return '-';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/* Encode and decode to string (base64) */
export const encodeBase64 = (payload: string) => window.btoa(payload);
export const decodeBase64 = (payload: string) => window.atob(payload);

/* Remove special charactera freom keywords */
export const removeSpecialCharctersFromKeywords = (keywords: string) => {
  return keywords.replace(/[&/\\;#+()$~%'":*?^<>{}@!_=]/g, '');
};

export const prettyPrintDate = (date: Date) => {
  return `${date.getDate()} ${date.toLocaleString('default', {
    month: 'long',
  })} ${date.getFullYear()}`;
};

/* Convert to 2dp */
export const lbsToKg = (lbs: number) => {
  return parseFloat((lbs / 2.2046).toFixed(2));
};

export const kgToLbs = (kg: number) => {
  return parseFloat((kg * 2.2046).toFixed(2));
};

export const inchToCm = (inch: number) => {
  return parseFloat((inch * 2.54).toFixed(2));
};

export const cmToInch = (cm: number) => {
  return parseFloat((cm / 2.54).toFixed(2));
};

export const getNumberOfDps = (value: string) => {
  if (value.includes('.')) {
    if (value.split('.').length === 2) {
      return value.split('.')[1].length;
    }
  }
  return 0;
};

export const commify = (n: string) => {
  const valueWithoutCommas = n.toString().replace(/,/g, '');
  const parts = valueWithoutCommas.split('.');
  const numberPart = parts[0];
  if (parts.length >= 2) {
    const decimalPart = parts[1];
    return parseInt(numberPart).toLocaleString() + '.' + decimalPart;
  } else {
    return parseInt(numberPart).toLocaleString();
  }
};

export const stringToNumber = (value: string, isInteger?: boolean) => {
  if (!value) {
    return 0;
  }

  if (isInteger) {
    return parseInt(value.toString().replace(/[^0-9.-]+/g, ''));
  }
  return parseFloat(value.toString().replace(/[^0-9.-]+/g, ''));
};

export const isNumber = (value: string) => {
  if (!value) {
    return true;
  }
  const valueWithoutCommas = value.replace(/,/g, '');
  return (
    /^\d+\.\d+$/.test(valueWithoutCommas) ||
    /^\d+$/.test(valueWithoutCommas) ||
    /^\d+\.$/.test(valueWithoutCommas)
  );
};

export const checkIsInteger = (value: string) => {
  if (!value) {
    return true;
  }
  const valueWithoutCommas = value.replace(/,/g, '');
  return !isNaN(parseInt(valueWithoutCommas));
};

export const isPositive = (value: string) => {
  if (!value) {
    return true;
  }
  const valueWithoutCommas = value.replace(/,/g, '');
  return !isNaN(parseFloat(valueWithoutCommas)) && parseFloat(valueWithoutCommas) >= 0;
};

export const isLessThanFiveDecimalPoints = (value: string) => {
  if (!value) {
    return true;
  }
  const valueWithoutCommas = value.replace(/,/g, '');
  return !isNaN(parseFloat(valueWithoutCommas)) && getNumberOfDps(valueWithoutCommas) <= 5;
};

export const isLessThanTwoDecimalPoints = (value: string) => {
  if (!value) {
    return true;
  }
  const valueWithoutCommas = value.replace(/,/g, '');
  return !isNaN(parseFloat(valueWithoutCommas)) && getNumberOfDps(valueWithoutCommas) <= 2;
};

const getNumberOfCommasToBeIncluded = (number: number) => {
  const setsOfThousands = Math.floor(number.toString().length / 3);
  const isExcessNumber = number.toString().length % 3 === 0;
  return isExcessNumber ? setsOfThousands - 1 : setsOfThousands;
};

export const isThousandSeperated = (value: string) => {
  if (!value) {
    return true;
  }
  const number = stringToNumber(value, true);
  const numberOfCommasToBeIncluded = getNumberOfCommasToBeIncluded(number);
  const numberOfCommas = (value.toString().match(/,/g) || []).length;
  return numberOfCommas === numberOfCommasToBeIncluded;
};

/* Print date in MM/DD/YY, year in 2digits */
export const printShortDate = (date: Date) => {
  return `${date.getMonth() + 1}/${date.getDate() + 1}/${date
    .getFullYear()
    .toString()
    .substr(2)}`;
};

export const getCountryFullName = (identifier: string) => {
  const country = countriesList.find(singleCountry => singleCountry.country === identifier);
  return country?.name ?? '-';
};

export const capitalizeWords = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
