
import isNumeric from 'validator/lib/isNumeric';
import { t } from 'i18next';

export default (errorMessage = t('common.numericError')) => (value) => {
  if (value && !isNumeric(value)) return errorMessage;

  return undefined;
};
