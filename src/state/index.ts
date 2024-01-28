import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { requestReducer } from './RequestReducer';
import thunkMiddleware from 'redux-thunk';
import { responseReducer } from './ResponseReducer';

const rootReducer = combineReducers({
  request: requestReducer,
  response: responseReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
});
