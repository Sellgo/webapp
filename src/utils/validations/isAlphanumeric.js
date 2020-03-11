import isAlphanumeric from 'validator/lib/isAlphanumeric';

export default (errorMessage = 'Alphanumeric error') => value => {
  if (value && !isAlphanumeric(value)) return errorMessage;

  return undefined;
};
