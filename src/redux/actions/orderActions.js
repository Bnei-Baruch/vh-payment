import {SET_ORDER} from '../types';

export function setOrder(value) {
  return {
    type: SET_ORDER,
    payload: value
  }
}
