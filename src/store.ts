import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import thunk from 'redux-thunk';

import rootReducer from './reducers/root';

export default function configureAppStore(preloadedState: any) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), thunk],
    preloadedState,
  });

  return store;
}
