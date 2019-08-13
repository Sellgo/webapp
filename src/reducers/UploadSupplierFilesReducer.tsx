import { SET_UPLOAD_SUPPLIER_STEP } from '../constant/constant';
import { setIn } from '../utils/immutablity';
import { AnyAction, Reducer } from 'redux';

interface UploadSupplierFilesState {
  readonly currentStep: number;
}

const initialState: UploadSupplierFilesState = {
  currentStep: 0,
};

export const UploadSupplierFilesReducer = (
  state: UploadSupplierFilesState = initialState,
  action: AnyAction
): UploadSupplierFilesState => {
  switch (action.type) {
    case SET_UPLOAD_SUPPLIER_STEP:
      return setIn(state, 'currentStep', action.payload);
    default:
      return state;
  }
};

export default UploadSupplierFilesReducer;
