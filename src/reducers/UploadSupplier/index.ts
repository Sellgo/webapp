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
  UPDATE_DATA_QUALITY_REPORT,
} from '../../constants/UploadSupplier';
import { setIn } from '../../utils/immutablity';
import { AnyAction } from 'redux';
import { DataQualityReport } from '../../interfaces/UploadSupplier';

interface UploadSupplierState {
  readonly currentStep: number;
  readonly csvString: string | null;
  readonly csvFile: File | null;
  readonly rawCsv: string | null;
  readonly csv: string[][] | null;
  readonly columnMappings: [];
  readonly completed: boolean;
  readonly isFirstRowHeader: boolean;
  readonly dataQualityReport: DataQualityReport;
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
  dataQualityReport: {
    upcMissing: 0,
    upcNonNumeric: 0,
    costMissing: 0,
    costInvalid: 0,
    msrpMissing: 0,
    msrpInvalid: 0,
    errorCells: [],
    totalValidProducts: 0,
  },
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
      let newColumnMappings = [];
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

    case UPDATE_DATA_QUALITY_REPORT:
      return setIn(state, 'dataQualityReport', action.payload);

    default:
      return state;
  }
};
