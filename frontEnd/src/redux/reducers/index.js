import { combineReducers } from 'redux';
import globalData from './globalDataReducer';
import codeData from './codeReducer';
import buildData from './buildReducer';

export default combineReducers({
  globalData,
  codeData,
  buildData
});