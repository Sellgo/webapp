import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';

export default function configureAppStore(preloadedState: any) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), thunk],
    preloadedState,
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers/rootReducer', () => store.replaceReducer(rootReducer));
  }

  return store;
}
