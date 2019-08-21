import get from 'lodash/get';
import reduce from 'lodash/reduce';
import { createSelector } from 'reselect';

export const currentStepSelector = (state: object): number =>
  get(state, 'uploadSupplierFiles.currentStep', 0);

export const csvSelector = (state: object): string[][] =>
  get(state, 'uploadSupplierFiles.csv', null);

export const columnMappingsSelector = (state: object): [] =>
  get(state, 'uploadSupplierFiles.columnMappings', []);

export const csvFileSelector = (state: object): File => get(state, 'uploadSupplierFiles.csvFile');

export const reversedColumnMappingsSelector = createSelector(
  [columnMappingsSelector],
  (columnMappings): { [key: string]: string } => {
    return reduce(
      columnMappings,
      (result: {}, value, key) => {
        return {
          ...result,
          [value]: key,
        };
      },
      {}
    );
  }
);
