import get from 'lodash/get';

export const notifyIdSelector = (state: {}) => get(state, 'userOnboarding.notifyId');

/* Selector to get current user onboarding state */
export const getUserOnboarding = (state: any) => get(state, 'userOnboarding.setUserOnboarding');

/* Selector to get current user onboarding resources state */
export const getUserOnboardingResources = (state: any) =>
  get(state, 'userOnboarding.userOnboardingResources');

/* Selector to get AiStock get started status */
export const getPerfectStockGetStartedStatus = (state: any) =>
  get(state, 'userOnboarding.perfectStockGetStartedStatus');
