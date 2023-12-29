import axios from "axios";
export const getProfile = (keycloakId) => {
  return axios
    .get(
      `${window.APP_CONFIG.VH_API_BASE_URL}/profile/v1/profile/${keycloakId}`
    )
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};
export const getMembershipStatus = (email) => {
  return axios
    .get(`${window.APP_CONFIG.VH_API_BASE_URL}/pay/status/${email}`)
    .then((res) => res.data);
};

export const getMembershipStatusV2 = (kc_id) => {
  return axios
    .get(`${window.APP_CONFIG.VH_API_BASE_URL}/profile/v1/membership/kcid/${kc_id}`)
    .then((res) => {
      return res.data.data
    }).catch(err => {
      if (err?.response?.status === 404) {
        return {} // 404 means no membership info. That's fine
      } else {
        return {"error": err.toJSON()} // we got some unexpected error
      }
    });
}

export const getUserProfileData = (keycloakId) => {
  return axios
    .get(
      `${window.APP_CONFIG.VH_API_BASE_URL}/profile/v1/profile/${keycloakId}`
    )
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const saveUserProfileData = (data) => {
  return axios.patch(
    `${window.APP_CONFIG.VH_API_BASE_URL}/profile/v1/profile/${data.keycloak_id}`,
    data
  );
};

export const requestHelpHaver = (data) => {
  return axios
    .post(`${window.APP_CONFIG.VH_API_BASE_URL}/profile/v1/request`, data)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const cancelMembership = (data) => {
  return axios
    .post(
      `${window.APP_CONFIG.VH_API_BASE_URL}/profile/v1/membership/cancellation`,
      data
    )
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};
