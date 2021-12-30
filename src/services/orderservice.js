import axios from "axios"
import appConfig from '../shared/appconfig'

export const handlePayment = (data) => {
    return axios
      .post(appConfig.VH_ORDER + '/orders/newandpay', data)
      .then((response) => response)
      .catch((error) => {
          throw error
      })
}

export const paymentSuccess = (data) => {
    return axios
        .post(appConfig.VH_ORDER + '/orders/paid', data)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            throw error
        })
}

