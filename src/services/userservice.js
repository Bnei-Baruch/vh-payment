import axios from "axios"
export const getProfile = (keycloakId) => {
    return axios.get(`${window.APP_CONFIG.VH_SRV_PROFILE}/v1/profile/${keycloakId}`)
    .then(res => res.data)
    .catch(err => {
        throw err;
    })
  }