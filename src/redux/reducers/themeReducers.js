import {SET_THEME} from '../types';

const DEFAULT = {
  currentTheme: 0
};

export default function reducer(state = DEFAULT, {type, payload}) {
  switch (type) {
    case SET_THEME:
      return {
        ...state,
        currentTheme: payload
      };
    default:
      return state;
  }
}
