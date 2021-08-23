import { v4 as uuid } from 'uuid';

/* Generate a unique session ID  */
export const makeOrGetUniqueTabID = () => {
  let value = window.sessionStorage.getItem('unique-session-tab-id');

  if (!value || !window.name) {
    value = uuid();
    window.sessionStorage.setItem('unique-session-tab-id', value);
  }

  window.name = value;
  return value;
};
