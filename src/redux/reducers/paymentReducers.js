import {SET_PAYMENT_INFO} from '../types';

const DEFAULT = {
  lang: 'en',
  amount: {
    value: 0,
    min: 0,
    max: 100,
    step: 1,
    fixed: true
  },
  currency: {
    name: 'USD',
    sign: '$'
  },
  logoUrl: '',
  buttonText: '',
  dir: 'ltr'
};

export default function reducer(state= DEFAULT, {type, payload}) {
  switch (type) {
    case SET_PAYMENT_INFO:
      return {
        ...state,
        amount: {...state.amount},
        currency: {...state.currency},
        ...payload
      };
    default:
      return state;
  }
}
