export const onlyNumber = value =>
  value && !/^[0-9]+(\.[0-9]{1,5})?$/i.test(value) ? 'Does not accept negative value' : undefined;
