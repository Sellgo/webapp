export const isNumber = value =>
  value && !/^\+?1 |(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/i.test(value)
    ? 'Use US format'
    : undefined;
