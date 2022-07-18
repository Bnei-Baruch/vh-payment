import { SET_CURRENCY } from "../types";

export function setCurrency(value) {
  return {
    type: SET_CURRENCY,
    payload: value,
  };
}
