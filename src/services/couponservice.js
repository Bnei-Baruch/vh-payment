import axios from "axios";
import { handleAxiosError } from "./errorHandler";

/**
 * Redeem a coupon for the logged-in member. The keycloak subject is taken from
 * the auth token (attached by the global axios interceptor), never from the body.
 * @param {string} code
 */
export const redeemCoupon = (code) => {
  return axios
    .post(`${window.APP_CONFIG.VH_API_BASE_URL}/pay/v2/coupon/redeem`, { code })
    .then((response) => response)
    .catch(handleAxiosError);
};
