import get from 'lodash/get';
import reduce from 'lodash/reduce';
import { createSelector } from 'reselect';
import numberToLetter from '../../utils/numberToLetter';

export const currentStepSelector = (state: object): number =>
  get(state, 'uploadSupplierFiles.currentStep', 0);

export const csvSelector = (state: object): string[][] =>
  get(state, 'uploadSupplierFiles.csv', null);

export const columnMappingsSelector = (state: object): [] =>
  get(state, 'uploadSupplierFiles.columnMappings', []);

export const saveColumnMappingSettingSelector = (state: object): boolean =>
  get(state, 'uploadSupplierFiles.saveColumnMappingSetting', false);

export const skipColumnMappingCheckSelector = (state: object): boolean =>
  get(state, 'uploadSupplierFiles.skipColumnMappingCheck', false);

export const csvHeaderSelector = createSelector(
  [csvSelector],
  csv => {
    const headerRow = csv.length > 0 ? csv[0] : [];

    // convert header to alphabet
    const alphabeticHeader = headerRow.map((data, index) => numberToLetter(index));

    return alphabeticHeader;
  }
);

export const csvFileSelector = (state: object): File => get(state, 'uploadSupplierFiles.csvFile');

export const reversedColumnMappingsSelector = createSelector(
  [columnMappingsSelector],
  (columnMappings): { [key: string]: number } => {
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

export const processCompletedSelector = (state: object): boolean =>
  get(state, 'uploadSupplierFiles.completed', false);

export const isFirstRowHeaderSelector = (state: object): boolean =>
  get(state, 'uploadSupplierFiles.isFirstRowHeader', false);
