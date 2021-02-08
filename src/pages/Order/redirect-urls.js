const prodUrl = 'https://kli.one/payment/';
const devUrl = 'http://86431566a175.ngrok.io/payment/';

const url = process.env.NODE_ENV === 'production' ? prodUrl : devUrl;

export const PAYMENT_SUCCESS_URL = `${url}success`;
export const PAYMENT_CANCEL_URL = `${url}cancel`;
export const PAYMENT_ERROR_URL = `${url}error`;
