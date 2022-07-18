import {
  SET_LOGGED_IN_USER,
  SET_MEMBERSHIP_DATA,
  SET_USER_PROFILE_DATA,
} from "../types";

const DEFAULT = {
  authenticated: false,
  keycloak: null,
  membershipdata: undefined,
  profileData: undefined,
  profile: {
    email: "",
    firstName: "",
    lastName: "",
    username: "",
  },
};

export default function reducer(state = DEFAULT, { type, payload }) {
  switch (type) {
    case SET_LOGGED_IN_USER:
      return {
        ...state,
        profile: { ...state.profile },
        ...payload,
      };
    case SET_MEMBERSHIP_DATA:
      return {
        ...state,
        membershipdata: payload,
      };

    case SET_USER_PROFILE_DATA:
      return {
        ...state,
        profileData: payload,
      };
    default:
      return state;
  }
}
