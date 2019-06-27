import { combineReducers } from 'redux';

import settingReducer from './SettingReducer';
import { SYNReducer, SYNProductsReducer } from './SYNReducer';

const rootReducer = combineReducers({
  settings: settingReducer,
  synReducer: SYNReducer,
  synProductsReducer: SYNProductsReducer,
});

export default rootReducer;
