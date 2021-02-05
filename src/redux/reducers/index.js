import {combineReducers} from 'redux';

import theme from './themeReducers';
import user from './userReducers';
import payment from './paymentReducers';

export default combineReducers({
	theme,
	user,
	payment
});
