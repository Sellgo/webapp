import { SET_UPLOAD_SUPPLIER_STEP } from '../constant/constant';

export const setUploadSupplierStep = (
  nextStep: number
): {
  type: string;
  payload: number;
} => ({
  type: SET_UPLOAD_SUPPLIER_STEP,
  payload: nextStep,
});
