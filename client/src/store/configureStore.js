import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import get from 'lodash/get';

import appReducer from './middlewares/reducers';
import globalSagas from './middlewares/sagas';
import { createBrowserHistory } from 'history';

const ReduxDevTools = get(window, '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__');
export const history = createBrowserHistory();

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const enhancers = applyMiddleware(sagaMiddleware);

  const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  typeof ReduxDevTools === 'function'
    ? ReduxDevTools
    : compose;

  const store = createStore(
    appReducer(history),
    fromJS(initialState),
    composeEnhancers(enhancers),
  );
  if (globalSagas instanceof Array) {
    globalSagas.forEach(saga => sagaMiddleware.run(saga));
  }
  return store;
}

