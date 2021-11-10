import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './userReducer';
import configReducer from './configReducer';
import { __ACCESS_CHECK, __LOGGER } from '../middleware';

const reducers = combineReducers({
  user: userReducer,
  config: configReducer
});

const middleware = [ __ACCESS_CHECK, thunk, __LOGGER ];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  process.env.NODE_ENV === "development"
    ? composeEnhancers(applyMiddleware(...middleware))
    : compose(applyMiddleware(...middleware))
);
 console.log("REDUX", store)
export default store;
