import { combineReducers } from 'redux';

import settingsReducer from './Settings';
import subscriptionReducer from './Settings/Subscription';
import uploadSupplierReducer from './UploadSupplier';
import { reducer as formReducer } from 'redux-form';
import modalsReducer from './Modals';
import suppliersReducer from './Suppliers';
import supplierReducer from './Supplier';
import productReducer from './Products';

const rootReducer = combineReducers({
  settings: settingsReducer,
  subscription: subscriptionReducer,
  uploadSupplierFiles: uploadSupplierReducer,
  form: formReducer,
  modals: modalsReducer,
  suppliers: suppliersReducer,
  supplier: supplierReducer,
  product: productReducer,
});

export default rootReducer;
