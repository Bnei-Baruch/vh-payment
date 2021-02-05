import {SET_LOGGED_IN_USER} from '../types';

export function setLoggedInUser(value) {
  return {
    type: SET_LOGGED_IN_USER,
    payload: value
  }
}
