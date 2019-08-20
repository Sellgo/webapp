import get from 'lodash/get';

export const currentStepSelector = (state: object): number =>
  get(state, 'uploadSupplierFiles.currentStep', 0);

export const csvSelector = (state: object): string[][] =>
  get(state, 'uploadSupplierFiles.csv', null);

export const columnMappingsSelector = (state: object): {} => get(state, 'uploadSupplierFiles.columnMappings', {});
