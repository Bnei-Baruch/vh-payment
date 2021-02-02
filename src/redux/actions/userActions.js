import * as types from '../constants';

export function setTheme(value) {
  return {
    type: types.SET_LOGGED_IN_USER,
    payload: value
  }
}
