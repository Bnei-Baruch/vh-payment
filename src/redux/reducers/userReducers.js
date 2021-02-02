import {SET_LOGGED_IN_USER} from '../constants';

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

export default function reducer(state= DEFAULT, actions) {
  switch (actions.type) {
    case SET_LOGGED_IN_USER:
      return {
        ...state,
        ...actions.payload,
        profile: {...actions.payload.profile}
      }
    default:
      return state;
  }
}
