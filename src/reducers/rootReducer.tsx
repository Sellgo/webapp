import { combineReducers } from 'redux';

import settingReducer from './SettingReducer';
import { SubscriptionReducer } from './SubscriptionReducer';
import { SYNReducer } from './SYNReducer';

const rootReducer = combineReducers({
  settings: settingReducer,
  synReducer: SYNReducer,
  subscription: SubscriptionReducer,
});

export default rootReducer;
