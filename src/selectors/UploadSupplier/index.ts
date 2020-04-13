import get from 'lodash/get';
import reduce from 'lodash/reduce';
import { createSelector } from 'reselect';
import numberToLetter from '../../utils/numberToLetter';

export const currentStepSelector = (state: object): number =>
  get(state, 'uploadSupplier.currentStep', 0);

export const currentResultErrFile = (state: object): [] =>
  get(state, 'uploadSupplier.resultErrFile', []);

export const currentProgressSpeed = (state: object): [] =>
  get(state, 'uploadSupplier.setProgressSpeed', []);

export const currentResultUpload = (state: object): [] =>
  get(state, 'uploadSupplier.resultUpload', []);

export const currentProgressShow = (state: object): [] =>
  get(state, 'uploadSupplier.setProgressShow', []);

export const currentProgressEta = (state: object): [] =>
  get(state, 'uploadSupplier.setProgressEta', []);

export const currentSynthesisId = (state: object): [] =>
  get(state, 'uploadSupplier.synthesisId', []);

export const currentLoadingShow = (state: object): [] =>
  get(state, 'uploadSupplier.setLoadingShow', []);

export const currentResultVal = (state: object): [] => get(state, 'uploadSupplier.resultVal', []);

export const currentProgress = (state: object): [] => get(state, 'uploadSupplier.setProgress', []);

export const currentSupplier = (state: object): [] => get(state, 'modals.uploadSupplier.meta', []);

export const currentErr = (state: object): [] => get(state, 'uploadSupplier.resultErr', []);

export const csvSelector = (state: object): string[][] => get(state, 'uploadSupplier.csv', null);

export const columnMappingsSelector = (state: object): [] =>
  get(state, 'uploadSupplier.columnMappings', []);

export const saveColumnMappingSettingSelector = (state: object): boolean =>
  get(state, 'uploadSupplier.saveColumnMappingSetting', false);

export const skipColumnMappingCheckSelector = (state: object): boolean =>
  get(state, 'uploadSupplier.skipColumnMappingCheck', false);

export const csvHeaderSelector = createSelector([csvSelector], csv => {
  const headerRow = csv.length > 0 ? csv[0] : [];

  // convert header to alphabet
  const alphabeticHeader = headerRow.map((data, index) => numberToLetter(index));

  return alphabeticHeader;
});

export const csvFileSelector = (state: object): File => get(state, 'uploadSupplier.csvFile');

export const reversedColumnMappingsSelector = createSelector(
  [columnMappingsSelector],
  (columnMappings): { [key: string]: number } => {
    return reduce(
      columnMappings,
      (result: {}, value, key) => {
        return value
          ? {
              ...result,
              [value]: key,
            }
          : result;
      },
      {}
    );
  }
);

export const processCompletedSelector = (state: object): boolean =>
  get(state, 'uploadSupplier.completed', false);

export const isFirstRowHeaderSelector = (state: object): boolean =>
  get(state, 'uploadSupplier.isFirstRowHeader', false);
