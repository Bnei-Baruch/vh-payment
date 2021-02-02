import { combineReducers } from 'redux';

import themeReducer from './themeReducers';
import userReducers from './userReducers';

export default combineReducers({
	themeReducer,
	userReducers
});
