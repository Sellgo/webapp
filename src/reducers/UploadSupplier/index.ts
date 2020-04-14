import {
  SET_UPLOAD_SUPPLIER_STEP,
  SET_CSV,
  SET_RAW_CSV,
  MAP_COLUMN,
  CLEANUP_UPLOAD_SUPPLIER,
  REMOVE_COLUMN_MAPPINGS,
  FINISH_UPLOAD,
  TOGGLE_FIRST_ROW_HEADER,
  SET_COLUMN_MAPPINGS,
  SET_COLUMN_MAPPING_SETTING,
  SET_SKIP_COLUMN_MAPPING_CHECK,
  SET_RESULT_UPLOAD,
  SET_SYNTHESIS_ID,
  SET_SPEED,
  SET_ERROR_FILE,
  SET_PROGRESS_SHOW,
  SET_ETA,
  SET_VALIDATION,
  SET_ERROR,
  SET_PROGRESS,
  SET_LOADING,
} from '../../constants/UploadSupplier';
import { setIn } from '../../utils/immutablity';
import { AnyAction } from 'redux';

interface UploadSupplierState {
  readonly currentStep: number;
  readonly csvString: string | null;
  readonly csvFile: File | null;
  readonly rawCsv: string | null;
  readonly csv: string[][] | null;
  readonly columnMappings: [];
  readonly setProgress: number;
  readonly setSpeed: number;
  readonly setEta: number;
  readonly setProgressShow: boolean;
  readonly setLoadingShow: boolean;
  readonly completed: boolean;
  readonly isFirstRowHeader: boolean;
  readonly resultUpload: string | null;
  readonly resultErrFile: string | null;
  readonly resultVal: string | null;
  readonly resultErr: string | null;
  readonly synthesisId: string | null;
}

const initialState: UploadSupplierState = {
  setProgressShow: false,
  setLoadingShow: false,
  completed: false,
  isFirstRowHeader: true,
  currentStep: 0,
  setSpeed: 0,
  setEta: 0,
  setProgress: 0,
  csvString: null,
  csvFile: null,
  columnMappings: [],
  rawCsv: null,
  csv: null,
  resultErrFile: null,
  resultUpload: null,
  synthesisId: null,
  resultVal: null,
  resultErr: null,
};

export default (
  state: UploadSupplierState = initialState,
  action: AnyAction
): UploadSupplierState => {
  switch (action.type) {
    case SET_CSV: {
      return setIn(state, 'csv', action.payload);
      // const newState = setIn(state, 'csv', action.payload);
      // return setIn(newState, 'currentStep', 2);
    }
    case SET_RAW_CSV: {
      const newState = setIn(state, 'rawCsv', action.csvString);
      return setIn(newState, 'csvFile', action.csvJSONFile ? action.csvJSONFile : null);
    }
    case SET_UPLOAD_SUPPLIER_STEP:
      return setIn(state, 'currentStep', action.payload);

    case MAP_COLUMN: {
      const newColumnMappings = [];
      state.columnMappings.forEach((e, i) => {
        if (e === action.targetColumn) {
          newColumnMappings[i] = undefined;
        } else {
          newColumnMappings[i] = e;
        }
      });
      if (action.csvColumn !== -1) {
        newColumnMappings[action.csvColumn] = action.targetColumn;
      }
      return setIn(state, 'columnMappings', newColumnMappings);
    }

    case SET_COLUMN_MAPPING_SETTING: {
      return setIn(state, 'saveColumnMappingSetting', action.payload);
    }

    case SET_SKIP_COLUMN_MAPPING_CHECK: {
      return setIn(state, 'skipColumnMappingCheck', action.payload);
    }

    case SET_COLUMN_MAPPINGS: {
      return setIn(state, 'columnMappings', action.payload);
    }

    case CLEANUP_UPLOAD_SUPPLIER: {
      return initialState;
    }

    case REMOVE_COLUMN_MAPPINGS:
      return setIn(state, 'columnMappings', []);

    case FINISH_UPLOAD:
      return setIn(state, 'completed', true);

    case TOGGLE_FIRST_ROW_HEADER:
      return setIn(state, 'isFirstRowHeader', !state.isFirstRowHeader);

    case SET_SPEED: {
      return setIn(state, 'setSpeed', action.payload);
    }

    case SET_PROGRESS_SHOW: {
      return setIn(state, 'setProgressShow', action.payload);
    }

    case SET_ETA: {
      return setIn(state, 'setEta', action.payload);
    }

    case SET_ERROR_FILE: {
      return setIn(state, 'resultErrFile', action.payload);
    }

    case SET_RESULT_UPLOAD: {
      return setIn(state, 'resultUpload', action.payload);
    }

    case SET_PROGRESS: {
      return setIn(state, 'setProgress', action.payload);
    }

    case SET_LOADING: {
      return setIn(state, 'setLoadingShow', action.payload);
    }

    case SET_SYNTHESIS_ID: {
      return setIn(state, 'synthesisId', action.payload);
    }

    case SET_VALIDATION: {
      return setIn(state, 'resultVal', action.payload);
    }

    case SET_ERROR: {
      return setIn(state, 'resultErr', action.payload);
    }

    default:
      return state;
  }
};
