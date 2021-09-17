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

/* Products Research */
import productsDatabaseReducer from './ProductResearch/ProductsDatabase';

/* Seller Research */
import sellerDatabaseReducer from './SellerResearch/SellerDatabase';
import sellerMapReducer from './SellerResearch/SellerMap';
import sellerInventoryReducer from './SellerResearch/SellerInventory';

/* Keyword Research */
import keywordReverseReducer from './KeywordResearch/KeywordReverse';
import keywordDatabaseReducer from './KeywordResearch/KeywordDatabase';
import keywordTrackerReducer from './KeywordResearch/KeywordTracker';

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

  // seller research
  sellerDatabase: sellerDatabaseReducer,
  sellerMap: sellerMapReducer,
  sellerInventory: sellerInventoryReducer,

  // product research
  productsDatabase: productsDatabaseReducer,

  // keyword reverse
  keywordReverse: keywordReverseReducer,
  // keyword database
  keywordDatabase: keywordDatabaseReducer,
  // keyword tracker
  keywordTracker: keywordTrackerReducer,
});

export default rootReducer;
