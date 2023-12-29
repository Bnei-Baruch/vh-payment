import {
  SET_LOGGED_IN_USER,
  SET_MEMBERSHIP_DATA,
  SET_MEMBERSHIP_DATA_V2,
  SET_USER_PROFILE_DATA,
} from "../types";

export function setLoggedInUser(value) {
  return {
    type: SET_LOGGED_IN_USER,
    payload: value,
  };
}

export function setMembershipData(value) {
  return {
    type: SET_MEMBERSHIP_DATA,
    payload: value,
  };
}

export function setMembershipDataV2(value) {
  return {
    type: SET_MEMBERSHIP_DATA_V2,
    payload: value,
  };
}

export function setUserProfileData(value) {
  return {
    type: SET_USER_PROFILE_DATA,
    payload: value,
  };
}
