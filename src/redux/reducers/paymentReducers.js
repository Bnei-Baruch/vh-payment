import {SET_PAYMENT_INFO} from '../types';

const DEFAULT = {
  amount: {
    value: 0,
    min: 0,
    max: 100,
    step: 1,
    fixed: true
  },
  buttonText: '',
  cancel: {
    text: '',
    url: ''
  },
  logoUrl: '',
};

export default function reducer(state= DEFAULT, {type, payload}) {
  switch (type) {
    case SET_PAYMENT_INFO:
      return {
        ...state,
        amount: {...state.amount},
        cancel: {...state.cancel},
        ...payload
      };
    default:
      return state;
  }
}
