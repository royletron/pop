import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers'

let middlewares = [thunkMiddleware]
if (process.env.NODE_ENV === 'development') {
  const createLogger = require(`redux-logger`);
  const logger = createLogger();
  middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  applyMiddleware(
    ...middlewares
  )
)

export default store
