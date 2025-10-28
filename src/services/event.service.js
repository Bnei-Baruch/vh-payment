import axios from "axios";
import { handleAxiosError } from "./errorHandler";

export const addPariticpantInEvent = (data) => {
  return axios
    .post(
      `${window.APP_CONFIG.VH_API_BASE_URL}/events/v1/participation-status`,
      data
    )
    .then((res) => res.data.data)
    .catch(handleAxiosError);
};
