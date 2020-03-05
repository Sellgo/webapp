import isAlphanumeric from 'validator/lib/isAlphanumeric';
import { t } from 'i18next';

export default (errorMessage = t('common.alphanumericError')) => value => {
  if (value && !isAlphanumeric(value)) return errorMessage;

  return undefined;
};
