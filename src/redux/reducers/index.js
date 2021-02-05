import {combineReducers} from 'redux';

import theme from './themeReducers';
import user from './userReducers';
import payment from './paymentReducers';
import language from './languageReducers';
import currency from './currencyReducers';

export default combineReducers({
	theme,
	user,
	payment,
	language,
	currency
});
