import { OPEN, CLOSE } from '../constant/constant';
import { AnyAction } from 'redux';

export interface ModalsAction {
  type: typeof OPEN | typeof CLOSE;
  key: string;
}

type ModalsActionCreator = (key: string) => ModalsAction;

export const open: ModalsActionCreator = key => ({ type: OPEN, key });
export const close: ModalsActionCreator = key => ({ type: CLOSE, key });

export const openUploadSupplierModal = (): ModalsAction => open('uploadSupplier');
export const closeUploadSupplierModal = (): ModalsAction => close('uploadSupplier');
