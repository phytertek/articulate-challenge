import { combineReducers, createStore, applyMiddleware } from 'redux';

// Import reducers and async middlwares from components
import { app } from './app';
import { tabBlock } from './tabBlock';

const store = combineReducers({
  // Add component reducers heres
  app: app.store,
  tabBlock: tabBlock.store
});
const createStoreWithMiddleware = applyMiddleware()(createStore); // Add component async middlewares as arguments to the applyMiddleware function

export default (process.env.NODE_ENV === 'development'
  ? createStoreWithMiddleware(
      store,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  : createStoreWithMiddleware(store));
