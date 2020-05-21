import get from 'lodash/get';

export const fetchNotifyId = (state: {}) => get(state, 'userOnboarding.notifyId');
