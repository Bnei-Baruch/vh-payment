import * as types from "../types";

export function setTheme(value) {
  return {
    type: types.SET_THEME,
    payload: value,
  };
}
