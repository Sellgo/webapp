import get from 'lodash/get';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import parse from 'csv-parse/lib/es5';
import Axios from 'axios';
import reduce from 'lodash/reduce';
import {
  isFirstRowHeaderSelector,
  saveColumnMappingSettingSelector,
  currentStepSelector,
  columnMappingsSelector,
  csvSelector,
  csvFileSelector,
} from '../../selectors/UploadSupplier/index';
import { error } from '../../utils/notifications';
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
  SET_SAVED_COLUMN_MAPPINGS,
  SET_SAVE_COLUMN_MAPPING_SETTING,
  SET_SKIP_COLUMN_MAPPING_CHECK,
  MAX_FILE_SIZE_BYTES,
} from '../../constants/UploadSupplier';
import { getStepSpecification, Step } from './StepSpecifications';
import { sellerIDSelector } from '../../selectors/Seller';
import { newSupplierIdSelector } from '../../selectors/Supplier';
import { AppConfig } from '../../config';
import { fetchSupplier, fetchSynthesisProgressUpdates } from '../Suppliers';
import { round } from 'lodash';

export const setUploadSupplierStep = (nextStep: number) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => any
) => {
  const isStepWithinRange = Object.values(UploadSteps).indexOf(nextStep) !== -1;

  if (!isStepWithinRange) {
    return Promise.reject();
  }

  const currentStep = currentStepSelector(getState());
  const stepSpecification: Step = new (getStepSpecification(currentStep))(dispatch, getState);

  // if step is increased we need to validate before moving on
  const validationRequired = currentStep < nextStep;
  const errorMessage = validationRequired ? stepSpecification.validate() : undefined;

  if (errorMessage) {
    error(errorMessage);
    return Promise.reject();
  }

  // if step is decreased we should clean up previous step
  const cleanUpRequired = currentStep > nextStep;

  if (cleanUpRequired) {
    stepSpecification.cleanUp(nextStep);
  }

  try {
    if (stepSpecification.finalizeStep) {
      await stepSpecification.finalizeStep(); // add loader
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

export const setRawCsv = (csvString: string | ArrayBuffer | null, csvFile: File | null) => {
  const csvJSONFile: any = {};
  if (csvFile !== null) {
    csvJSONFile.lastModified = csvFile.lastModified;
    csvJSONFile.name = csvFile.name;
  }
  return {
    type: SET_RAW_CSV,
    csvString,
    csvJSONFile,
  };
};

export const setCsv = (csv: string[][] | null) => ({
  type: SET_CSV,
  payload: csv,
});

export const parseCsv = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => any
): void => {
  const rawString = get(getState(), 'uploadSupplier.rawCsv');

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

  const getParsedCsv = (err: Error | undefined, output: string[][]) => {
    if (err) {
      error('File does not appear to be a valid csv file.');
      dispatch(setCsv(null));
      dispatch(setRawCsv(null, null));
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
      error('Error occurred while uploading csv.');
    } else {
      dispatch(setRawCsv(csvString, csvFile));
      dispatch(parseCsv());
    }
  };

  reader.readAsText(csvFile);
};

export const handleRejectedFile = (rejectedFile?: File) => {
  const fileExtension =
    rejectedFile && rejectedFile.name.split('.').length > 1 && rejectedFile.name.split('.').pop();
  if (!fileExtension || fileExtension.toLowerCase() !== 'csv') {
    error('Invalid file extension detected. File should be a csv file.');
    return;
  }

  if (rejectedFile && rejectedFile.size > MAX_FILE_SIZE_BYTES) {
    const mb = 1000 * 1000;
    const fileSizeInMegabytes = round(rejectedFile.size / mb, 1);
    const maxSizeInMegabytes = MAX_FILE_SIZE_BYTES / mb;
    error(`The file is too large (${fileSizeInMegabytes}MB). Max size: ${maxSizeInMegabytes}MB.`);
    return;
  }
};

export const parseArrayToCsvFile = (csvArray: string[][], csvFileDetails?: any): File => {
  const fileName = csvFileDetails && csvFileDetails.name ? csvFileDetails.name : '';

  // escape commas
  csvArray = csvArray.map((row: string[]) =>
    row.map((cell: string) => {
      cell = cell.replace(/"/g, '""');
      return cell.includes(',') ? `"${cell}"` : cell;
    })
  );
  const csvString = csvArray.join('\n');

  return new File([csvString], fileName, { type: 'text/csv' });
};

export const mapColumn = (csvColumn: string | number, targetColumn: string) => ({
  type: MAP_COLUMN,
  csvColumn,
  targetColumn,
});

export const setSavedColumnMappings = (savedColumnMappings: any) => ({
  type: SET_SAVED_COLUMN_MAPPINGS,
  payload: savedColumnMappings,
});

export const setSaveColumnMappingSetting = (checked: boolean) => ({
  type: SET_SAVE_COLUMN_MAPPING_SETTING,
  payload: checked,
});

export const setSkipColumnMappingCheck = (checked: boolean) => ({
  type: SET_SKIP_COLUMN_MAPPING_CHECK,
  payload: checked,
});

export const fetchColumnMappings = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const sellerID = sellerIDSelector();

  const response = await Axios.get(
    `${AppConfig.BASE_URL_API}sellers/${String(sellerID)}/csv-column-mapping`
  );
  if (response.data) {
    const { upc, product_cost, sku, title, msrp } = response.data;
    const columnMappings = [];
    if (upc !== null) columnMappings[upc] = 'upc';
    if (product_cost !== null) columnMappings[product_cost] = 'cost';
    if (sku !== null) columnMappings[sku] = 'sku';
    if (title !== null) columnMappings[title] = 'title';
    if (msrp !== null) columnMappings[msrp] = 'msrp';
    dispatch(setSavedColumnMappings(columnMappings));
    dispatch(setSkipColumnMappingCheck(true));
  } else {
    dispatch(removeColumnMappings());
  }
};

export const validateAndUploadCsv = () => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => any
) => {
  const sellerID = sellerIDSelector();
  const supplierID = newSupplierIdSelector(getState());
  const columnMappings = columnMappingsSelector(getState());
  const saveColumnMappingSetting = saveColumnMappingSettingSelector(getState());
  const csv = parseArrayToCsvFile(csvSelector(getState()), csvFileSelector(getState()));

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
  if (saveColumnMappingSetting) bodyFormData.set('save_data_mapping', 'True');
  if (Object.prototype.hasOwnProperty.call(reversedColumnMappings, 'title'))
    bodyFormData.set('title', reversedColumnMappings.title);
  if (Object.prototype.hasOwnProperty.call(reversedColumnMappings, 'sku'))
    bodyFormData.set('sku', reversedColumnMappings.sku);
  if (Object.prototype.hasOwnProperty.call(reversedColumnMappings, 'msrp'))
    bodyFormData.set('msrp', reversedColumnMappings.msrp);
  // correct this
  if (isFirstRowHeaderSelector(getState())) bodyFormData.set('has_header', 'True');

  await Axios.post(
    AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${String(supplierID)}/synthesis/upload`,
    bodyFormData
  );
  dispatch(finishUpload());
  await dispatch(fetchSupplier(supplierID));
  dispatch(fetchSynthesisProgressUpdates());
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
