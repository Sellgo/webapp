import get from 'lodash/get';
import reduce from 'lodash/reduce';
import { createSelector } from 'reselect';
import numberToLetter from '../../utils/numberToLetter';

export const currentStepSelector = (state: object): number =>
  get(state, 'uploadSupplier.currentStep', 0);

export const currentErrorFile = (state: object): [] =>
  get(state, 'uploadSupplier.resultErrorFile', []);

export const currentSpeed = (state: object): [] => get(state, 'uploadSupplier.setSpeed', []);

export const currentResultUpload = (state: object): [] =>
  get(state, 'uploadSupplier.resultUpload', []);

export const currentShowProgress = (state: object): [] =>
  get(state, 'uploadSupplier.setShowProgress', []);

export const currentEta = (state: object): [] => get(state, 'uploadSupplier.setEta', []);

export const currentSynthesisId = (state: object): [] =>
  get(state, 'uploadSupplier.synthesisId', []);

export const currentShowLoading = (state: object): [] =>
  get(state, 'uploadSupplier.setShowLoading', []);

export const currentResultValid = (state: object): [] =>
  get(state, 'uploadSupplier.resultValid', []);

export const currentProgress = (state: object): [] => get(state, 'uploadSupplier.setProgress', []);

export const currentSupplier = (state: object): [] => get(state, 'modals.uploadSupplier.meta', []);

export const currentResultError = (state: object): [] =>
  get(state, 'uploadSupplier.resultError', []);

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
