import {SET_CURRENCY} from '../types';
import {currencies} from '../../shared/currencies';

const DEFAULT = currencies[0];

export default function reducer(state = DEFAULT, {type, payload}) {
  switch (type) {
    case SET_CURRENCY:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}
