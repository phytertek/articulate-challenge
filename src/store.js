import { combineReducers, createStore, applyMiddleware } from 'redux';

// Import reducers and async middlwares from components
import { navStore as nav } from './navBar';
import { authStore as auth } from './auth';

const store = combineReducers({
  // Add component reducers here
  todo: (state = {}, action) => state,
  nav: nav.store,
  auth: auth.store
});
const createStoreWithMiddleware = applyMiddleware(nav.async, auth.async)(
  createStore
); // Add component async middlewares as arguments to the applyMiddleware function

export default (process.env.NODE_ENV === 'development'
  ? createStoreWithMiddleware(
      store,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  : createStoreWithMiddleware(store));
