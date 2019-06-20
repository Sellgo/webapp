import { combineReducers } from 'redux';

import settingReducer from './SettingReducer';

const rootReducer = combineReducers({
  settings: settingReducer,
});

export default rootReducer;
