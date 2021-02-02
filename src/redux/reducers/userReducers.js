import * as types from '../constants';

const DEFAULT = {
  authenticated: false,
  keycloak: undefined,
  profile: {
    email: '',
    firstName: '',
    lastName: '',
    username: ''
  }
};

export default function reducer(state= DEFAULT, actions) {
  console.log(state);
  console.log(actions.payload);

  switch (actions.type) {
    case types.SET_LOGGED_IN_USER:
      return {
        ...state,
        data: actions.payload
      }

    default:
      return state
  }
}
