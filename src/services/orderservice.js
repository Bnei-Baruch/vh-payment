import axios from "axios";
import { handleAxiosError } from "./errorHandler";

/**
 * Retries an async function with exponential backoff.
 * Only retries if error.isRetryable is true (set by errorHandler).
 */
export const retryWithBackoff = async (fn, maxRetries = 3) => {
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (!error.isRetryable || attempt === maxRetries) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
    }
  }
  throw lastError;
};

export const handlePayment = (data) => {
  return axios
    .post(`${window.APP_CONFIG.VH_API_BASE_URL}/pay/v2/transaction`, data)
    .then((response) => response)
    .catch(handleAxiosError);
};

export const getTransactionById = (id) => {
  return axios
    .get(`${window.APP_CONFIG.VH_API_BASE_URL}/pay/v2/transaction/${id}`)
    .then((response) => response)
    .catch(handleAxiosError);
};

export const updateTransactionById = (id, data) => {
  return axios
    .patch(
      `${window.APP_CONFIG.VH_API_BASE_URL}/pay/v2/transaction/${id}`,
      data
    )
    .then((response) => response)
    .catch(handleAxiosError);
};

export const paymentSuccess = (data) => {
  return axios
    .post(`${window.APP_CONFIG.VH_API_BASE_URL}/pay/orders/paid`, data)
    .then(function (response) {
      return response;
    })
    .catch(handleAxiosError);
};

export const getOrderByID = async (id) => {
  return await axios
    .get(`${window.APP_CONFIG.VH_API_BASE_URL}/pay/v2/order/${id}`)
    .then((res) => res?.data)
    .catch(handleAxiosError);
};

export const updateOrderById = async (id, data) => {
  return await axios
    .patch(`${window.APP_CONFIG.VH_API_BASE_URL}/pay/v2/order/${id}`, data)
    .then((res) => res?.data)
    .catch(handleAxiosError);
};

export const updateCard = async (data) => {
  return await axios
    .post(
      `${window.APP_CONFIG.VH_API_BASE_URL}/pay/v2/transaction/new_token`,
      data
    )
    .then((response) => response)
    .catch(handleAxiosError);
};

export const cardSuccessfullyUpdated = async (data) => {
  return await axios
    .post(
      `${window.APP_CONFIG.VH_API_BASE_URL}/pay/v2/order/update_token`,
      data
    )
    .then((response) => response)
    .catch(handleAxiosError);
};

export const getCardDetails = async (id) => {
  return await axios
    .get(`pay/v2/card_detail/${id}`)
    .then((response) => response)
    .catch(handleAxiosError);
};
