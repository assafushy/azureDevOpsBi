import { combineReducers } from "redux";
import globalData from "./globalDataReducer";
import codeData from "./codeReducer";
import buildData from "./buildReducer";
import policyData from "./policyReducer";

export default combineReducers({
  globalData,
  codeData,
  buildData,
  policyData
});
