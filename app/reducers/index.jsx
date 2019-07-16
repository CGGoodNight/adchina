import { combineReducers } from "redux";

import mainReducers from './mainReducers';
import loginReducers from "./loginReducers";
import messageReducers from "./messageReducers";
import detailReducers from "./detailReducers";
import searchReducers from "./searchReducers";
const reducer = combineReducers({
  mainReducers,
  loginReducers,
  messageReducers,
  detailReducers,
  searchReducers
});

export default reducer;
