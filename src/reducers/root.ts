import { combineReducers } from 'redux';

import settingsReducer from './Settings';
import subscriptionReducer from './Settings/Subscription';
import uploadSupplierReducer from './UploadSupplier';
import { reducer as formReducer } from 'redux-form';
import modalsReducer from './Modals';
import suppliersReducer from './Suppliers';
import supplierReducer from './Supplier';
import productReducer from './Products';
import productTrackerReducer from './ProductTracker';
import userOnboardingReducer from './UserOnboarding';
import leadsReducer from './LeadsTracker';
import sellerFinderReducer from './SellerFinder';

const rootReducer = combineReducers({
  settings: settingsReducer,
  subscription: subscriptionReducer,
  uploadSupplier: uploadSupplierReducer,
  form: formReducer,
  modals: modalsReducer,
  suppliers: suppliersReducer,
  supplier: supplierReducer,
  product: productReducer,
  productTracker: productTrackerReducer,
  userOnboarding: userOnboardingReducer,
  leads: leadsReducer,
  sellerFinder: sellerFinderReducer,
});

export default rootReducer;
