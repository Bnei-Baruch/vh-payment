import {SET_PAYMENT_INFO} from '../constants';

export function setPaymentInfo(value) {
  return {
    type: SET_PAYMENT_INFO,
    payload: value
  }
}
