import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import csvParse from 'csv-parse/lib/es5';
import Axios from 'axios';
import XLSX from 'xlsx';
import reduce from 'lodash/reduce';
import {
  isFirstRowHeaderSelector,
  columnMappingSettingSelector,
  currentStepSelector,
  columnMappingsSelector,
  fileStringArraySelector,
  fileDetailsSelector,
  rawFileSelector,
} from '../../selectors/UploadSupplier/index';
import { error } from '../../utils/notifications';
import {
  SET_UPLOAD_SUPPLIER_STEP,
  SET_FILE_STRING_ARRAY,
  SET_RAW_FILE,
  MAP_COLUMN,
  CLEANUP_UPLOAD_SUPPLIER,
  REMOVE_COLUMN_MAPPINGS,
  UploadSteps,
  FINISH_UPLOAD,
  TOGGLE_FIRST_ROW_HEADER,
  SET_COLUMN_MAPPINGS,
  SET_COLUMN_MAPPING_SETTING,
  SET_SKIP_COLUMN_MAPPING_CHECK,
  MAX_FILE_SIZE_BYTES,
  SET_RESULT_UPLOAD,
  SET_SYNTHESIS_ID,
  SET_ERROR_FILE,
  SET_PROGRESS_SHOW,
  SHOW_CONFIRMATION,
  SET_VALID_ROWS,
  SET_ERROR_ROWS,
  SET_LOADING,
} from '../../constants/UploadSupplier';
import { getStepSpecification, Step } from './StepSpecifications';
import { sellerIDSelector } from '../../selectors/Seller';
import { newSupplierIdSelector } from '../../selectors/Supplier';
import { AppConfig } from '../../config';
import { fetchSupplier } from '../Suppliers';
import { round } from 'lodash';
import { acceptedFileFormats } from '../../containers/Synthesis/UploadSupplier/SelectFile';
import { getFileExtension, excelExtensions, csvExtensions } from '../../utils/file';

// store File in memory as it is non-serializable
let supplierFile: File = new File([], '');

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

export const setRawFile = (fileString: string | ArrayBuffer | null, file: File | null) => {
  const newFileDetails: any = {};
  if (file !== null) {
    newFileDetails.lastModified = file.lastModified;
    newFileDetails.name = file.name;
  }
  return {
    type: SET_RAW_FILE,
    fileString,
    newFileDetails,
  };
};

export const setFileStringArray = (fileStringArray: string[][] | null) => ({
  type: SET_FILE_STRING_ARRAY,
  payload: fileStringArray,
});

/** parser for csv */
export const parseCsv = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => any
): void => {
  const rawFileString = rawFileSelector(getState());
  if (!rawFileString) {
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
      dispatch(setFileStringArray(null));
      dispatch(setRawFile(null, null));
    } else {
      dispatch(setFileStringArray(output));
    }
  };

  // to ensure loader is visible delay execution by placing parse in async queue
  Promise.resolve().then(() => {
    csvParse(rawFileString, parseOption, getParsedCsv);
  });
};

/** parser for excel */
export const parseExcel = (readOptions: any) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => any
): void => {
  const rawFileString = rawFileSelector(getState());
  if (!rawFileString) {
    return;
  }

  Promise.resolve().then(() => {
    try {
      const wb = XLSX.read(rawFileString, readOptions);
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, defval: '' });
      dispatch(setFileStringArray(data));
    } catch {
      error('File does not appear to be a valid Excel file.');
    }
  });
};

/** read and parse given File */
export const prepareFile = (file?: File) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  if (!file) {
    return;
  }

  const reader = new FileReader();
  let parseFile: any = null;
  let readerReadAsFunction: any = null;
  const rABS = !!reader.readAsBinaryString;

  // detect file type and update the appropriate read/parse functions
  const fileExtension = getFileExtension(file);
  if (excelExtensions.includes(fileExtension)) {
    readerReadAsFunction = rABS ? reader.readAsBinaryString : reader.readAsArrayBuffer;
    parseFile = () => parseExcel({ type: rABS ? 'binary' : 'array' });
  } else if (csvExtensions.includes(fileExtension)) {
    readerReadAsFunction = reader.readAsText;
    parseFile = () => parseCsv();
  } else {
    return;
  }

  reader.onloadend = () => {
    const fileString = reader.result;

    if (!fileString || reader.error) {
      error('Error occurred while uploading file.');
    } else {
      dispatch(setRawFile(fileString, file));
      dispatch(parseFile());
    }
  };

  supplierFile = file;
  readerReadAsFunction.apply(reader, [file]);
};

export const handleRejectedFile = (rejectedFile?: File) => async () => {
  const fileExtension = rejectedFile && getFileExtension(rejectedFile);
  if (!fileExtension || !acceptedFileFormats.includes(fileExtension)) {
    error('Invalid file extension detected.');
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

export const parseCsvArrayToFile = (fileStringArray: string[][], fileDetails?: File): File => {
  const fileName = fileDetails && fileDetails.name ? fileDetails.name : '';

  // escape commas
  fileStringArray = fileStringArray.map((row: string[]) =>
    row.map((cell: string) => {
      cell = cell.replace(/"/g, '""');
      return cell.includes(',') ? `"${cell}"` : cell;
    })
  );
  const fileString = fileStringArray.join('\n');

  return new File([fileString], fileName, { type: 'text/csv' });
};

export const mapColumn = (fileColumn: string | number, targetColumn: string) => ({
  type: MAP_COLUMN,
  fileColumn,
  targetColumn,
});

export const setColumnMappings = (columnMapping: any) => ({
  type: SET_COLUMN_MAPPINGS,
  payload: columnMapping,
});

export const setResultUpload = (resultUpload: any) => ({
  type: SET_RESULT_UPLOAD,
  payload: resultUpload,
});

export const setErrorFile = (errorFile: any) => ({
  type: SET_ERROR_FILE,
  payload: errorFile,
});

export const setSynthesisId = (synthesisId: any) => ({
  type: SET_SYNTHESIS_ID,
  payload: synthesisId,
});

export const validRows = (valid: any) => ({
  type: SET_VALID_ROWS,
  payload: valid,
});

export const setError = (error: any) => ({
  type: SET_ERROR_ROWS,
  payload: error,
});

export const setProgressShow = (check: boolean) => ({
  type: SET_PROGRESS_SHOW,
  payload: check,
});

export const setConfirmationShow = (check: boolean) => ({
  type: SHOW_CONFIRMATION,
  payload: check,
});

export const setLoadingShow = (check: boolean) => ({
  type: SET_LOADING,
  payload: check,
});

export const setColumnMappingSetting = (checked: boolean) => ({
  type: SET_COLUMN_MAPPING_SETTING,
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
    dispatch(setColumnMappings(columnMappings));
  } else {
    dispatch(removeColumnMappings());
  }
};

export const validateAndUploadFile = () => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => any
) => {
  const sellerID = sellerIDSelector();
  const supplierID = newSupplierIdSelector(getState());
  const columnMappings = columnMappingsSelector(getState());
  const columnMappingSetting = columnMappingSettingSelector(getState());
  const file = fileDetailsSelector(getState());
  let uploadFile;
  if (csvExtensions.includes(getFileExtension(file))) {
    uploadFile = parseCsvArrayToFile(
      fileStringArraySelector(getState()),
      fileDetailsSelector(getState())
    );
  } else {
    // get original file in memory
    uploadFile = supplierFile;
  }

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

  if (!file) {
    throw new Error('please upload a valid file');
  }

  const bodyFormData = new FormData();
  bodyFormData.set('seller_id', String(sellerID));
  bodyFormData.set('file', uploadFile);
  bodyFormData.set('cost', reversedColumnMappings.cost);
  bodyFormData.set('upc', reversedColumnMappings.upc);
  if (columnMappingSetting) bodyFormData.set('save_data_mapping', 'True');
  if (Object.prototype.hasOwnProperty.call(reversedColumnMappings, 'title'))
    bodyFormData.set('title', reversedColumnMappings.title);
  if (Object.prototype.hasOwnProperty.call(reversedColumnMappings, 'sku'))
    bodyFormData.set('sku', reversedColumnMappings.sku);
  if (Object.prototype.hasOwnProperty.call(reversedColumnMappings, 'msrp'))
    bodyFormData.set('msrp', reversedColumnMappings.msrp);
  // correct this
  if (isFirstRowHeaderSelector(getState())) bodyFormData.set('has_header', 'True');

  const response = await Axios.post(
    AppConfig.BASE_URL_API + `sellers/${sellerID}/suppliers/${String(supplierID)}/synthesis/upload`,
    bodyFormData
  );

  if (response.data) {
    dispatch(setResultUpload(response.data.response_type));
    dispatch(setErrorFile(response.data.error_file_url));
    dispatch(validRows(response.data.num_valid_rows));
    dispatch(setError(response.data.num_error_rows));
    dispatch(setSynthesisId(response.data.synthesis_file_id));
  }
  dispatch(finishUpload());
  await dispatch(fetchSupplier(supplierID));
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
