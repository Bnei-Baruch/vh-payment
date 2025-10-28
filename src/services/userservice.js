import axios from "axios";
import { handleAxiosError, enhanceError } from "./errorHandler";

export const getProfile = (keycloakId) => {
  return axios
    .get(
      `${window.APP_CONFIG.VH_API_BASE_URL}/profile/v1/profile/${keycloakId}`
    )
    .then((res) => res.data)
    .catch(handleAxiosError);
};

export const getMembershipStatus = (email) => {
  return axios
    .get(`${window.APP_CONFIG.VH_API_BASE_URL}/pay/status/${email}`)
    .then((res) => res.data)
    .catch(handleAxiosError);
};

export const getMembershipStatusV2 = (kc_id) => {
  return axios
    .get(`${window.APP_CONFIG.VH_API_BASE_URL}/profile/v1/membership/kcid/${kc_id}`)
    .then((res) => res.data.data)
    .catch((error) => {
      if (error.response?.status === 404) {
        // 404 is not an error in this context, return empty object
        return {};
      } else {
        // Return error object instead of throwing
        return { "error": enhanceError(error) };
      }
    });
};

export const getUserProfileData = (keycloakId) => {
  return axios
    .get(
      `${window.APP_CONFIG.VH_API_BASE_URL}/profile/v1/profile/${keycloakId}`
    )
    .then((res) => res.data)
    .catch(handleAxiosError);
};

export const saveUserProfileData = (data) => {
  return axios
    .patch(
      `${window.APP_CONFIG.VH_API_BASE_URL}/profile/v1/profile/${data.keycloak_id}`,
      data
    )
    .catch(handleAxiosError);
};

export const requestHelpHaver = (data) => {
  return axios
    .post(`${window.APP_CONFIG.VH_API_BASE_URL}/profile/v1/request`, data)
    .then((res) => res.data)
    .catch(handleAxiosError);
};

export const cancelMembership = (data) => {
  return axios
    .post(
      `${window.APP_CONFIG.VH_API_BASE_URL}/profile/v1/membership/cancellation`,
      data
    )
    .then((res) => res.data)
    .catch(handleAxiosError);
};
