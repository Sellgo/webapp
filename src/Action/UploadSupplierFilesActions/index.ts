import { isFirstRowHeaderSelector } from './../../selectors/UploadSupplierFiles/index';
import { error } from './../../utils/notifications';
import get from 'lodash/get';
import {
  SET_UPLOAD_SUPPLIER_STEP,
  SET_CSV,
  SET_RAW_CSV,
  MAP_COLUMN,
  CLEANUP_UPLOAD_SUPPLIER,
  REMOVE_COLUMN_MAPPINGS,
  UploadSteps,
  FINISH_UPLOAD,
  TOGGLE_FIRST_ROW_HEADER,
} from '../../constant/constant';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import parse from 'csv-parse/lib/es5/index';
import {
  currentStepSelector,
  csvFileSelector,
  columnMappingsSelector,
} from '../../selectors/UploadSupplierFiles';
import { getStepSpecification, Step } from './StepSpecifications';
import { sellerIDSelector } from '../../selectors/user';
import { newSupplierIdSelector } from '../../selectors/syn';
import { AppConfig } from '../../config';
import Axios from 'axios';
import reduce from 'lodash/reduce';

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('idToken')}`,
  'Content-Type': `multipart/form-data`,
});

// we need a better way to store file
// sadly redux store doesn't allow storage of files
let csv: File | null;

export const setUploadSupplierStep = (nextStep: number) => async (
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
  const errorMessage = validationRequired ? stepSpecification.validate() : undefined;

  if (errorMessage) {
    error(errorMessage);
    return;
  }

  // if step is decreased we should clean up previous step
  const cleanUpRequired = currentStep > nextStep;

  if (cleanUpRequired) {
    stepSpecification.cleanUp(nextStep);
  }

  try {
    if (stepSpecification.finalizeStep) {
      // add loader
      await stepSpecification.finalizeStep();
    }

    dispatch({
      type: SET_UPLOAD_SUPPLIER_STEP,
      payload: nextStep,
    });
  } catch (err) {
    error('Something went wrong');
    // display error ?
  }
};

export const setRawCsv = (csvString: string | ArrayBuffer, csvFile: File | null) => {
  csv = csvFile;

  return {
    type: SET_RAW_CSV,
    csvString,
    csvFile,
  };
};

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

  reader.onloadend = () => {
    const csvString = reader.result;

    if (!csvString || reader.error) {
      error('Error occurred while uploading csv. Please try again later.');
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
  const sellerID = sellerIDSelector();
  const supplierID = newSupplierIdSelector(getState());
  const columnMappings = columnMappingsSelector(getState());

  const reversedColumnMappings: any = reduce(
    columnMappings,
    (result: {}, value, key) => {
      return {
        ...result,
        [value]: key,
      };
    },
    {}
  );

  if (!csv) {
    throw new Error('please upload a csv file');
  }

  const bodyFormData = new FormData();
  bodyFormData.set('seller_id', String(sellerID));
  bodyFormData.set('file', csv);
  bodyFormData.set('cost', reversedColumnMappings.cost);
  bodyFormData.set('upc', reversedColumnMappings.upc);
  bodyFormData.set('title', reversedColumnMappings.title);
  // correct this
  bodyFormData.set('has_header', isFirstRowHeaderSelector(getState()).toString());

  await Axios({
    method: 'POST',
    url: AppConfig.BASE_URL_API + `supplier/${String(supplierID)}/synthesis/upload/`,
    data: bodyFormData,
    headers: getHeaders(),
  });
  dispatch(finishUpload());
};

export const cleanupUploadSupplier = () => ({
  type: CLEANUP_UPLOAD_SUPPLIER,
});

export const removeColumnMappings = () => ({
  type: REMOVE_COLUMN_MAPPINGS,
});

export const finishUpload = () => ({
  type: FINISH_UPLOAD,
});

export const toggleFirstRowHeader = () => ({
  type: TOGGLE_FIRST_ROW_HEADER,
});
