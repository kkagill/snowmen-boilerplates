import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeReducers } from 'redux-compose';
import thunkMiddleware from "redux-thunk";
import reduxReset from 'redux-reset'
import { createLogger } from "redux-logger";
import { reducer } from "./src/redux/reducers";

const finalCreateStore = composeReducers(
  applyMiddleware(thunkMiddleware, createLogger()),
  reduxReset(),
)(createStore)

const store = finalCreateStore(reducer);

export default store;
