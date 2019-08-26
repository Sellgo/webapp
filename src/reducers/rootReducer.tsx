import { combineReducers } from 'redux';

import settingReducer from './SettingReducer';
import { SubscriptionReducer } from './SubscriptionReducer';
import { SYNReducer } from './SYNReducer';
import UploadSupplierFilesReducer from './UploadSupplierFilesReducer';
import { reducer as formReducer } from 'redux-form';
import modalsReducer from './modals';
import suppliersReducer from './suppliers';

const rootReducer = combineReducers({
  settings: settingReducer,
  synReducer: SYNReducer,
  subscription: SubscriptionReducer,
  uploadSupplierFiles: UploadSupplierFilesReducer,
  form: formReducer,
  modals: modalsReducer,
  suppliers: suppliersReducer,
});

export default rootReducer;
