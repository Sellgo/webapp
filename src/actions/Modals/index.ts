import { OPEN, CLOSE } from '../../constants';
import { Supplier } from '../../interfaces/Supplier';
import { Product } from '../../interfaces/Product';

export interface ModalsAction {
  type: typeof OPEN | typeof CLOSE;
  key: string;
  meta?: {};
}

type ModalsActionCreator = (key: string, meta?: {}) => ModalsAction;

export const open: ModalsActionCreator = (key, meta) => ({ type: OPEN, key, meta });
export const close: ModalsActionCreator = key => ({ type: CLOSE, key });

export const openUploadSupplierModal = (supplier?: Supplier): ModalsAction =>
  open('uploadSupplier', supplier);

export const closeUploadSupplierModal = (): ModalsAction => close('uploadSupplier');

export const openUserOnboardingModal = (): ModalsAction => open('userOnboarding');

export const closeUserOnboardingModal = (): ModalsAction => close('userOnboarding');

export const openSupplierProductDetailModal = (product?: Product): ModalsAction =>
  open('supplierProductDetail', product);

export const closeSupplierProductDetailModal = (): ModalsAction => close('supplierProductDetail');
