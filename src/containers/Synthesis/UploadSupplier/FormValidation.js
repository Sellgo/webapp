export const onlyNumber = value =>
  value && !/^[0-9]$/i.test(value) ? 'Does not accept negative value' : undefined;
