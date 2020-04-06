import {
  SET_UPLOAD_SUPPLIER_STEP,
  SET_CSV,
  SET_RAW_CSV,
  MAP_COLUMN,
  CLEANUP_UPLOAD_SUPPLIER,
  REMOVE_COLUMN_MAPPINGS,
  FINISH_UPLOAD,
  TOGGLE_FIRST_ROW_HEADER,
  SET_SAVED_COLUMN_MAPPINGS,
  SET_SAVE_COLUMN_MAPPING_SETTING,
  SET_SKIP_COLUMN_MAPPING_CHECK,
  SET_SYNTHESIS_FILE_ID,
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
  readonly completed: boolean;
  readonly isFirstRowHeader: boolean;
  readonly synthesisFileId: string | number | null;
}

const initialState: UploadSupplierState = {
  completed: false,
  isFirstRowHeader: true,
  currentStep: 0,
  csvString: null,
  csvFile: null,
  columnMappings: [],
  rawCsv: null,
  csv: null,
  synthesisFileId: null,
};

export default (
  state: UploadSupplierState = initialState,
  action: AnyAction
): UploadSupplierState => {
  switch (action.type) {
    case SET_SYNTHESIS_FILE_ID: {
      return setIn(state, 'synthesisFileId', action.payload);
    }
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

    case SET_SAVE_COLUMN_MAPPING_SETTING: {
      return setIn(state, 'saveColumnMappingSetting', action.payload);
    }

    case SET_SKIP_COLUMN_MAPPING_CHECK: {
      return setIn(state, 'skipColumnMappingCheck', action.payload);
    }

    case SET_SAVED_COLUMN_MAPPINGS: {
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

    default:
      return state;
  }
};
