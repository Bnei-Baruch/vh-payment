import {SET_PAYMENT_INFO} from '../types';

export function setPaymentInfo(value) {
  return {
    type: SET_PAYMENT_INFO,
    payload: value
  }
}
