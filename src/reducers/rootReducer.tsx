import { combineReducers } from 'redux';

import settingReducer from './SettingReducer';
import { SubscriptionReducer } from './SubscriptionReducer';
import { SYNReducer } from './SYNReducer';
import UploadSupplierFilesReducer from './UploadSupplierFilesReducer';

const rootReducer = combineReducers({
  settings: settingReducer,
  synReducer: SYNReducer,
  subscription: SubscriptionReducer,
  uploadSupplierFiles: UploadSupplierFilesReducer,
});

export default rootReducer;
