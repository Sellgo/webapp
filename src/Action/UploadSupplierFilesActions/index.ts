import get from 'lodash/get';
import {
  SET_UPLOAD_SUPPLIER_STEP,
  SET_CSV,
  SET_RAW_CSV,
  MAP_COLUMN,
  UploadSteps,
} from '../../constant/constant';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import parse from 'csv-parse/lib/es5/index';
import { currentStepSelector } from '../../selectors/UploadSupplierFiles';
import { getStepSpecification, Step } from './StepSpecifications';

export const setUploadSupplierStep = (nextStep: number) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => any
) => {
  const isStepWithinRange = Object.values(UploadSteps).indexOf(nextStep) !== -1;

  if (!isStepWithinRange) {
    return;
  }

  const currentStep = currentStepSelector(getState());
  const stepSpecification: Step = new (getStepSpecification(currentStep))(dispatch, getState);

  // if step is increased we need to validate before moving on
  const validationRequired = currentStep < nextStep;
  const isValid = !validationRequired || stepSpecification.validate();

  if (!isValid) {
    return;
  }

  // if step is decreased we should clean up previous step
  const cleanUpRequired = currentStep > nextStep;
  const cleaner = (dispatch: any, getState: any) => {};
  cleaner(dispatch, getState);

  dispatch({
    type: SET_UPLOAD_SUPPLIER_STEP,
    payload: nextStep,
  });
};

export const setRawCsv = (csvString: string | ArrayBuffer, csvFile: File) => ({
  type: SET_RAW_CSV,
  csvString,
  csvFile,
});

export const setCsv = (csv: string) => ({
  type: SET_CSV,
  payload: csv,
});

export const parseCsv = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => any
): void => {
  const rawString = get(getState(), 'uploadSupplierFiles.rawCsv');

  if (!rawString) {
    return;
  }

  const parseOption = {
    trim: true,
    relax: true,
    relax_column_count: true,
    // todo: switch to delimiter from state
    delimiter: ',',
  };

  const getParsedCsv = (err: Error | undefined, output: string) => {
    if (err) {
      // tslint:disable-next-line:no-console
      console.log({ err });
    } else {
      dispatch(setCsv(output));
    }
  };

  // to ensure loader is visible delay execution by placing parse in async queue
  Promise.resolve().then(() => {
    parse(rawString, parseOption, getParsedCsv);
  });
};

export const prepareCsv = (csvFile?: File) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  if (!csvFile) {
    return;
  }

  const reader = new FileReader();
  const statusFlag = 'csv_import';

  reader.onloadend = () => {
    const csvString = reader.result;

    if (!csvString || reader.error) {
      // handle error csv
    } else {
      dispatch(setRawCsv(csvString, csvFile));
      dispatch(parseCsv());
    }
  };

  reader.readAsText(csvFile);
};

export const mapColumn = (csvColumn: string | number, targetColumn: string) => ({
  type: MAP_COLUMN,
  csvColumn,
  targetColumn,
});

export const validateAndUploadCsv = () => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => any
) => {
  // integrate with backend
  await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};
