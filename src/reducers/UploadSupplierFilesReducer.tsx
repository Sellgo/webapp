import { SET_UPLOAD_SUPPLIER_STEP, SET_CSV, SET_RAW_CSV } from '../constant/constant';
import { setIn } from '../utils/immutablity';
import { AnyAction, Reducer } from 'redux';

interface UploadSupplierFilesState {
  readonly currentStep: number;
  readonly csvString: string | null;
  readonly csvFile: File | null;
}

const initialState: UploadSupplierFilesState = {
  currentStep: 0,
  csvString: null,
  csvFile: null,
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
      return setIn(newState, 'csvFile', { ...action.csvFile });
    }
    case SET_UPLOAD_SUPPLIER_STEP:
      return setIn(state, 'currentStep', action.payload);
    default:
      return state;
  }
};

export default UploadSupplierFilesReducer;
