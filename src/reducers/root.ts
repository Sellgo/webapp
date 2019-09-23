import { combineReducers } from 'redux';

import settingsReducer from './Settings';
import subscriptionReducer from './Settings/Subscription';
import synthesisReducer from './Synthesis';
import uploadSupplierFilesReducer from './UploadSupplierFiles';
import { reducer as formReducer } from 'redux-form';
import modalsReducer from './Modals';
import suppliersReducer from './Suppliers';

const rootReducer = combineReducers({
  settings: settingsReducer,
  synthesis: synthesisReducer,
  subscription: subscriptionReducer,
  uploadSupplierFiles: uploadSupplierFilesReducer,
  form: formReducer,
  modals: modalsReducer,
  suppliers: suppliersReducer,
});

export default rootReducer;
