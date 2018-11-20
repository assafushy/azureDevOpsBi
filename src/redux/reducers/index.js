import { combineReducers } from 'redux';
import globalData from './globalDataReducer';
import codeData from './codeReducer';

export default combineReducers({
  globalData,
  codeData
});