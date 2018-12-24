import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

let configureStore;

if (process.env.NODE_ENV === 'production') {
  configureStore = preloadedState => 
    createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(
        thunkMiddleware // no logger middleware 
      )
    )
} else {
  const loggerMiddleware = createLogger();
  configureStore = preloadedState => 
    createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(
        thunkMiddleware, 
        loggerMiddleware 
      )
    )
}


export default configureStore;
