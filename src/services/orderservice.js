import axios from "axios"

export const handlePayment = (data) => {
    return axios
      .post(window.APP_CONFIG.VH_ORDER + '/orders/newandpay', data)
      .then((response) => response)
      .catch((error) => {
          throw error
      })
}

export const paymentSuccess = (data) => {
    return axios
        .post(window.APP_CONFIG.VH_ORDER + '/orders/paid', data)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            throw error
        })
}

