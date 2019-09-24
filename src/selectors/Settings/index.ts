import get from 'lodash/get';

export const amazonMWSAuthorizedSelector = (state: {}) =>
  get(state, 'settings.amazonMWSAuthorized');
