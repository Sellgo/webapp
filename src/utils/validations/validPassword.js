const deafultErrorMessages = {
  length: 'use 8 characters or more',
  case: 'use upper & lower cases',
  number: 'use at least 1 number',
};

export default (errors = deafultErrorMessages) => value => {
  // length check
  if (value.length < 8) return errors.length;
  // upper lower case check
  if (!/^(?=.*?[A-Z])(?=.*?[a-z]).*$/.test(value)) return errors.case;
  // number check
  if (!/^(?=.*?[0-9]).*$/.test(value)) return errors.number;

  return undefined;
};
