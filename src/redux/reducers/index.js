import { combineReducers } from 'redux';
import globalDataReducer from './globalData';
import codeReducer from './codeReducer';

export default combineReducers({
  globalDataReducer,
  codeReducer
});