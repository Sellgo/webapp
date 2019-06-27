import { combineReducers } from 'redux';

import settingReducer from './SettingReducer';
import { SYNReducer } from './SYNReducer';

const rootReducer = combineReducers({
  settings: settingReducer,
  synReducer: SYNReducer,
});

export default rootReducer;
