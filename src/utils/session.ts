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

export const isSellgoSession = () => {
  if (process.env.REACT_APP_ENV === 'production' || process.env.REACT_APP_ENV === 'development') {
    return window.location.href.includes('sellgo');
  }

  // Default to aistock for local testing
  return false;
};
