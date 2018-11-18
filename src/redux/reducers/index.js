import { combineReducers } from 'redux';
import globalData from './globalDataReducer';
import codeReducer from './codeReducer';

export default combineReducers({
  globalData,
  codeReducer
});