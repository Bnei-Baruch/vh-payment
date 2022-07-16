import { combineReducers } from "redux";

import theme from "./themeReducers";
import user from "./userReducers";
import order from "./orderReducers";
import language from "./languageReducers";
import currency from "./currencyReducers";

export default combineReducers({
  theme,
  user,
  order,
  language,
  currency,
});
