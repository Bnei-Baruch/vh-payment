import { SET_LANGUAGE } from "../types";

export function setLanguage(value) {
  return {
    type: SET_LANGUAGE,
    payload: value,
  };
}
