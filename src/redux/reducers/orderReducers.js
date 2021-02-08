import {SET_ORDER} from '../types';

const DEFAULT = {
  appbar: {
    logo: '',
    text: '',
    textColor: ''
  },
  header: {
    title: '',
    subtitle: '',
    description: ''
  },
  body: {
    title: '',
    description: ''
  },
  termsLink: '',
  cancel: {
    text: '',
    url: ''
  },
  buttonText: '',
  currency: {
    amount: 0,
    min: 0,
    max: 100,
    step: 1,
    fixed: true
  }
};

export default function reducer(state = DEFAULT, {type, payload}) {
  switch (type) {
    case SET_ORDER:
      return {
        ...state,
        appbar: {...state.appbar},
        header: {...state.header},
        body: {...state.body},
        cancel: {...state.cancel},
        currency: {...state.currency},
        ...payload
      };
    default:
      return state;
  }
}
