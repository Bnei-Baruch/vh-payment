import axios from "axios"
import appConfig from '../shared/appconfig';
export const getProfile = (keycloakId) => {
    return axios.get(`${appConfig.VH_SRV_PROFILE}/v1/profile/${keycloakId}`)
    .then(res => res.data)
    .catch(err => {
        throw err;
    })
  }