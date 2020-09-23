import {
  SET_UPLOAD_SUPPLIER_STEP,
  SET_FILE_STRING_ARRAY,
  SET_RAW_FILE,
  MAP_COLUMN,
  CLEANUP_UPLOAD_SUPPLIER,
  REMOVE_COLUMN_MAPPINGS,
  FINISH_UPLOAD,
  TOGGLE_FIRST_ROW_HEADER,
  SET_COLUMN_MAPPINGS,
  SET_COLUMN_MAPPING_SETTING,
  SET_RESULT_UPLOAD,
  SET_SYNTHESIS_ID,
  SET_SPEED,
  SET_ERROR_FILE,
  SET_PROGRESS_SHOW,
  SHOW_CONFIRMATION,
  SET_ETA,
  SET_VALID_ROWS,
  SET_ERROR_ROWS,
  SET_PROGRESS,
  SET_LOADING,
  SET_PRIMARY_ID_TYPE,
  PRODUCT_ID_TYPES,
} from '../../constants/UploadSupplier';
import { setIn } from '../../utils/immutablity';
import { AnyAction } from 'redux';

interface UploadSupplierState {
  readonly currentStep: number;
  readonly fileString: string | null;
  /** Gotcha: you actually can't store a complete File object in redux because it's non-serializable,
   * but you can store the details like name, lastModified, ... */
  readonly fileDetails: File | null;
  readonly rawFile: string | null;
  readonly fileStringArray: string[][] | null;
  readonly columnMappings: [];
  readonly primaryIdType: string;
  readonly setProgress: number;
  readonly setSpeed: number;
  readonly setEta: number;
  readonly setProgressShow: boolean;
  readonly confirmationShow: boolean;
  readonly setLoadingShow: boolean;
  readonly completed: boolean;
  readonly isFirstRowHeader: boolean;
  readonly resultUpload: string | null;
  readonly resultErrorFile: string | null;
  readonly resultVal: string | null;
  readonly resultError: string | null;
  readonly synthesisId: string | null;
}

const initialState: UploadSupplierState = {
  setProgressShow: false,
  confirmationShow: false,
  setLoadingShow: false,
  completed: false,
  isFirstRowHeader: true,
  currentStep: 0,
  setSpeed: 0,
  setEta: 0,
  setProgress: 0,
  fileString: null,
  fileDetails: null,
  columnMappings: [],
  primaryIdType: PRODUCT_ID_TYPES[0].value, //UPC
  rawFile: null,
  fileStringArray: [],
  resultErrorFile: null,
  resultUpload: null,
  synthesisId: null,
  resultVal: null,
  resultError: null,
};

export default (
  state: UploadSupplierState = initialState,
  action: AnyAction
): UploadSupplierState => {
  switch (action.type) {
    case SET_FILE_STRING_ARRAY: {
      return setIn(state, 'fileStringArray', action.payload);
    }

    case SET_RAW_FILE: {
      const newState = setIn(state, 'rawFile', action.fileString);
      return setIn(newState, 'fileDetails', action.newFileDetails ? action.newFileDetails : null);
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
      if (action.fileColumn !== -1) {
        newColumnMappings[action.fileColumn] = action.targetColumn;
      }
      return setIn(state, 'columnMappings', newColumnMappings);
    }

    case SET_COLUMN_MAPPING_SETTING: {
      return setIn(state, 'columnMappingSetting', action.payload);
    }

    case SET_COLUMN_MAPPINGS: {
      return setIn(state, 'columnMappings', action.payload);
    }

    case SET_PRIMARY_ID_TYPE: {
      return setIn(state, 'primaryIdType', action.payload);
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

    case SHOW_CONFIRMATION: {
      return setIn(state, 'confirmationShow', action.payload);
    }

    case SET_ETA: {
      return setIn(state, 'setEta', action.payload);
    }

    case SET_ERROR_FILE: {
      return setIn(state, 'resultErrorFile', action.payload);
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

    case SET_VALID_ROWS: {
      return setIn(state, 'resultVal', action.payload);
    }

    case SET_ERROR_ROWS: {
      return setIn(state, 'resultError', action.payload);
    }

    default:
      return state;
  }
};
