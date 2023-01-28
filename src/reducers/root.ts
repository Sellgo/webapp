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
import notificationInboxReducer from './NotificationInbox';

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

/* AiStock */
import salesProjectionReducer from './PerfectStock/SalesProjection';
import orderPlanningReducer from './PerfectStock/OrderPlanning';
import tplReducer from './PerfectStock/Tpl';
import homeReducer from './PerfectStock/Home';
import LeadTimeReducer from './PerfectStock/LeadTime';

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
  notificationInbox: notificationInboxReducer,

  // seller research
  sellerDatabase: sellerDatabaseReducer,
  sellerMap: sellerMapReducer,
  sellerInventory: sellerInventoryReducer,

  // product research
  productsDatabase: productsDatabaseReducer,

  // keyword Research
  keywordReverse: keywordReverseReducer,
  keywordDatabase: keywordDatabaseReducer,
  keywordTracker: keywordTrackerReducer,

  // perfect stock
  salesProjection: salesProjectionReducer,
  orderPlanning: orderPlanningReducer,
  tpl: tplReducer,
  home: homeReducer,
  leadTime: LeadTimeReducer,
});

export default rootReducer;
