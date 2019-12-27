export const isNumber = value =>
  value && !/^\+?1 ?((\([0-9]{3}\)) |[0-9]{3}-)?[\0-9]{3}-?[0-9]{4}$/i.test(value)
    ? 'Please use US phone number format'
    : undefined;
