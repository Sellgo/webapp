export const onlyNumber = value =>
  value && !/^[0-9]$/i.test(value) ? 'Does not accept negative value' : undefined;

export const onlyChar = value =>
  value && !/^[a-zA-Z ]*$/i.test(value) ? 'Use Characters only' : undefined;
