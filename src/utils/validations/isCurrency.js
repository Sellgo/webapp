import { t } from 'i18next';

export default (errorMessage = t('common.invalidCurrency')) => (value) => {
  // remove commas as they are allowed
  const convertedText = `${value}`.replace(',', '');

  // eslint-disable-next-line no-restricted-globals
  return !isNaN(convertedText) ? undefined : errorMessage;
};
