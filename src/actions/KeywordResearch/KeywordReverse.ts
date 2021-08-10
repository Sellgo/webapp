import { v4 as uuid } from 'uuid';

/* Action to generate to give the unique session based tab id */
export const makeOrGetUniqueTabID = () => {
  let value = window.sessionStorage.getItem('unique-session-tab-id');

  if (!value || !window.name) {
    value = uuid();
    window.sessionStorage.setItem('unique-session-tab-id', value);
  }

  window.name = value;
  return value;
};
