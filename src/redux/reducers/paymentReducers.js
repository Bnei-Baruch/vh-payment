import {SET_PAYMENT_INFO} from '../constants';

const DEFAULT = {
  lang: 'en',
  currency: 'USD',
  currencySign: '$',
  fixedAmount: true,
  amount: 0,
  minAmount: 0,
  maxAmount: 100,
  stepAmount: 1,
  logoUrl: '',
  buttonText: '',
  dir: 'ltr'
};

export default function reducer(state= DEFAULT, actions) {
  switch (actions.type) {
    case SET_PAYMENT_INFO:
      return {
        ...state,
        ...actions.payload
      }
    default:
      return state;
  }
}
