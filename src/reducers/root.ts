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
import notificationReducer from './Notification';
import sellerFinderReducer from './SellerFinder';
import sellerDatabaseReducer from './SellerDatabase';
import sellerMapReducer from './SellerMap';

/* Products Research */
import productsDatabaseReducer from './ProductResearch/ProductsDatabase';

/* Seller Research */
import newSellerDatabaseReducer from './SellerResearch/SellerDatabase';

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
  notification: notificationReducer,
  sellerFinder: sellerFinderReducer,
  sellerDatabase: sellerDatabaseReducer,
  sellerMap: sellerMapReducer,
  productsDatabase: productsDatabaseReducer,
  newSellerDatabaseReducer: newSellerDatabaseReducer,
});

export default rootReducer;
