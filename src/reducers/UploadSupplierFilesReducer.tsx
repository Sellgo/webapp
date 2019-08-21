import {
  SET_UPLOAD_SUPPLIER_STEP,
  SET_CSV,
  SET_RAW_CSV,
  MAP_COLUMN,
  CLEANUP_UPLOAD_SUPPLIER,
  REMOVE_COLUMN_MAPPINGS,
} from '../constant/constant';
import { setIn } from '../utils/immutablity';
import { AnyAction, Reducer } from 'redux';

interface UploadSupplierFilesState {
  readonly currentStep: number;
  readonly csvString: string | null;
  readonly csvFile: File | null;
  readonly rawCsv: string | null;
  readonly csv: string[][] | null;
  readonly columnMappings: {};
}

const initialState: UploadSupplierFilesState = {
  currentStep: 0,
  csvString: null,
  csvFile: null,
  columnMappings: [],
  rawCsv: null,
  csv: null,
};

export const UploadSupplierFilesReducer = (
  state: UploadSupplierFilesState = initialState,
  action: AnyAction
): UploadSupplierFilesState => {
  switch (action.type) {
    case SET_CSV: {
      const newState = setIn(state, 'csv', action.payload);
      return setIn(newState, 'currentStep', 2);
    }
    case SET_RAW_CSV: {
      const newState = setIn(state, 'rawCsv', action.csvString);

      return setIn(newState, 'csvFile', action.csvFile ? { ...action.csvFile } : null);
    }
    case SET_UPLOAD_SUPPLIER_STEP:
      return setIn(state, 'currentStep', action.payload);

    case MAP_COLUMN: {
      return setIn(state, ['columnMappings', action.csvColumn], action.targetColumn);
    }

    case CLEANUP_UPLOAD_SUPPLIER: {
      return initialState;
    }

    case REMOVE_COLUMN_MAPPINGS:
      return setIn(state, 'columnMappings', []);

    default:
      return state;
  }
};

export default UploadSupplierFilesReducer;
