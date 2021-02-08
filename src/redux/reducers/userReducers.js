import {SET_LOGGED_IN_USER} from '../types';

const DEFAULT = {
  authenticated: false,
  keycloak: null,
  profile: {
    email: '',
    firstName: '',
    lastName: '',
    username: ''
  }
};

export default function reducer(state= DEFAULT, {type, payload}) {
  switch (type) {
    case SET_LOGGED_IN_USER:
      return {
        ...state,
        profile: {...state.profile},
        ...payload
      };
    default:
      return state;
  }
}
