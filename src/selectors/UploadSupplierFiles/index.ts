import get from 'lodash/get';

export const currentStepSelector = (state: object): number =>
  get(state, 'uploadSupplierFiles.currentStep', 0);
