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

export const currentProgressShow = (state: object): [] =>
  get(state, 'uploadSupplier.setProgressShow', []);

export const currentEta = (state: object): [] => get(state, 'uploadSupplier.setEta', []);

export const currentSynthesisId = (state: object): [] =>
  get(state, 'uploadSupplier.synthesisId', []);

export const currentLoadingShow = (state: object): [] =>
  get(state, 'uploadSupplier.setLoadingShow', []);

export const currentConfirmationShow = (state: object): boolean =>
  get(state, 'uploadSupplier.confirmationShow', false);

export const currentValid = (state: object): [] => get(state, 'uploadSupplier.resultVal', []);

export const currentProgress = (state: object): [] => get(state, 'uploadSupplier.setProgress', []);

export const currentSupplier = (state: object): [] => get(state, 'modals.uploadSupplier.meta', []);

export const currentError = (state: object): [] => get(state, 'uploadSupplier.resultError', []);

export const fileStringArraySelector = (state: object): string[][] =>
  get(state, 'uploadSupplier.fileStringArray', []);

export const primaryIdTypeSelector = (state: object): string =>
  get(state, 'uploadSupplier.primaryIdType', '');

export const columnMappingsSelector = (state: object): [] =>
  get(state, 'uploadSupplier.columnMappings', []);

export const columnMappingSettingSelector = (state: object): boolean =>
  get(state, 'uploadSupplier.columnMappingSetting', false);

export const skipColumnMappingCheckSelector = (state: object): boolean =>
  get(state, 'uploadSupplier.skipColumnMappingCheck', false);

export const fileHeaderSelector = createSelector([fileStringArraySelector], fileStringArray => {
  const headerRow = fileStringArray.length > 0 ? fileStringArray[0] : [];

  // convert header to alphabet
  const alphabeticHeader = headerRow.map((data, index) => numberToLetter(index));

  return alphabeticHeader;
});

export const fileDetailsSelector = (state: object): File =>
  get(state, 'uploadSupplier.fileDetails');

export const rawFileSelector = (state: object): string => get(state, 'uploadSupplier.rawFile');

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
