import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { calendarReducer } from './calendarReducer';
import { uiReducer } from './uiReducers';

export const rootReducer = combineReducers({
  uiReducer: uiReducer,
  calendarReducer: calendarReducer,
  auth: authReducer,
});
