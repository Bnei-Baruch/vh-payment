import axios from "axios";

export const getParticipantByEmail = (email) => {
    return axios.get(`${window.APP_CONFIG.VH_API_BASE_URL}/events/v1/participant/email/${email}`).then(res => res.data.data);
}

export const addAParticipant = (data) => {
    return axios.post(`${window.APP_CONFIG.VH_API_BASE_URL}/events/v1/participant`, data).then(res => res.data.data);
}