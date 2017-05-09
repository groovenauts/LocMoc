import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import loggerMiddleware from 'redux-logger';
import logger from 'js-logger';
import { $PRODUCTION_MODE } from './const';

import reducers from './reducer';
import saga from './saga';

let $inited = false;
let store = null;

/**
 * Initialize store function.
 * @return {Store} redux Store object.
 */
function initialize() {
  let store = null;
  let middleware = null;
  logger.useDefaults();

  const sagaMiddleware = createSagaMiddleware();

  if ($PRODUCTION_MODE) {
    middleware = applyMiddleware(sagaMiddleware);
    logger.setLevel(logger.WARN);
  } else {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    middleware = composeEnhancers(applyMiddleware(sagaMiddleware, loggerMiddleware));
    logger.setLevel(logger.DEBUG);
  }

  store = createStore(reducers, {}, middleware);
  sagaMiddleware.run(saga);

  $inited = true;
  return store;
}


if (!$inited) {
  store = initialize();
}


export default store;
