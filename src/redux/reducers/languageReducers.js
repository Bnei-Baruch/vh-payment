import { SET_LANGUAGE } from "../types";
import { languages } from "../../shared/languages";

const DEFAULT = languages[0];

export default function reducer(state = DEFAULT, { type, payload }) {
  switch (type) {
    case SET_LANGUAGE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
