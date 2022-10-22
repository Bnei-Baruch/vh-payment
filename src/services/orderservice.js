import axios from "axios";

export const handlePayment = (data) => {
  return axios
    .post(`${window.APP_CONFIG.VH_API_BASE_URL}/pay/v2/transaction`, data)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const getTransactionById = (id) => {
  return axios
    .get(`${window.APP_CONFIG.VH_API_BASE_URL}/pay/v2/transaction/${id}`)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const updateTransactionById = (id, data) => {
  return axios
    .patch(
      `${window.APP_CONFIG.VH_API_BASE_URL}/pay/v2/transaction/${id}`,
      data
    )
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const paymentSuccess = (data) => {
  return axios
    .post(`${window.APP_CONFIG.VH_API_BASE_URL}/pay/orders/paid`, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      throw error;
    });
};

export const updateStatus = async (data) =>
  await axios
    .post(
      `${window.APP_CONFIG.VH_API_BASE_URL}/register/choice/kc/${data.keycloakid}`,
      data
    )
    .then((res) => res?.data);

export const getOrderByID = async (id) => {
  return await axios
    .get(`${window.APP_CONFIG.VH_API_BASE_URL}/pay/v2/order/${id}`)
    .then((res) => res?.data);
};

export const updateOrderById = async (id, data) => {
  return await axios
    .patch(`${window.APP_CONFIG.VH_API_BASE_URL}/pay/v2/order/${id}`, data)
    .then((res) => res?.data);
};
