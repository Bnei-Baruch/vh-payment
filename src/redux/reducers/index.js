import { combineReducers } from 'redux';

import themeReducer from './themeReducers';
import userReducers from './userReducers';
import paymentReducers from './paymentReducers';

export default combineReducers({
	themeReducer,
	userReducers,
	paymentReducers
});
