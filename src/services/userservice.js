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

export const getUserProfileData = (keycloakId) => {
  return axios
    .get(
      `${window.APP_CONFIG.VH_API_BASE_URL}/profile/v1/profile/${keycloakId}`
    )
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}
