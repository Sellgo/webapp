import isNumeric from 'validator/lib/isNumeric';

export default (errorMessage = 'Numeric error') => value => {
  if (value && !isNumeric(value)) return errorMessage;

  return undefined;
};
