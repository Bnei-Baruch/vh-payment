import {SET_THEME} from '../constants';

export default function reducer(state={ currentTheme: 0 }, actions) {
  switch (actions.type) {

    case SET_THEME:
      return {
        ...state,
        currentTheme: actions.payload
      }

    default:
      return state
  }
}
