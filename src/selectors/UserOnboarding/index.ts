import get from 'lodash/get';

export const notifyIdSelector = (state: {}) => get(state, 'userOnboarding.notifyId');
