const configLocal = {
  VH_ORDER: 'http://localhost:8185',
  PAYMENT_SUCCESS_URL: 'http://9128465c414e.ngrok.io/success',
  PAYMENT_CANCEL_URL: 'https://localhost:3000/order',
  PAYMENT_ERROR_URL: 'https://localhost:3000/error',
};

const configStaging = {
  VH_ORDER: 'https://api.eurokab.info/pay',
  VH_SRV_PROFILE: 'https://api.eurokab.info/profile',
  PAYMENT_SUCCESS_URL: 'http://eurokab.info/pay/success',
  PAYMENT_CANCEL_URL: 'http://eurokab.info',
  PAYMENT_ERROR_URL: 'http://eurokab.info/pay/error',
  PAYMENT_DOMAIN: 'eurokab.info'
};

const configProd = {
  VH_ORDER: 'https://api.kli.one/pay',
  VH_SRV_PROFILE: 'https://api.kli.one/profile',
  PAYMENT_SUCCESS_URL: 'https://kli.one/pay/success',
  PAYMENT_CANCEL_URL: 'https://kli.one/',
  PAYMENT_ERROR_URL: 'https://kli.one/pay/error',
  PAYMENT_DOMAIN: 'kli.one',
};

if (process.env.REACT_APP_LOCAL === 'true') {
  module.exports = configLocal;
} else {
  if (process.env.REACT_APP_STAGING === 'true') {
    module.exports = configStaging;
  } else {
    module.exports = configProd;
  }
}
