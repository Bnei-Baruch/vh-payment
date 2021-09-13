const configLocal = {
  VH_ORDER: 'http://localhost:8185',
  PAYMENT_SUCCESS_URL: 'http://9128465c414e.ngrok.io/success',
  PAYMENT_CANCEL_URL: 'https://localhost:3000/order',
  PAYMENT_ERROR_URL: 'https://localhost:3000/error',
};

const configStaging = {
  VH_ORDER: 'https://api.eurokab.info/pay',
  PAYMENT_SUCCESS_URL: 'http://eurokab.info/pay/success',
  PAYMENT_CANCEL_URL: 'http://eurokab.info',
  PAYMENT_ERROR_URL: 'http://eurokab.info/pay/error',
};

const configProd = {
  VH_ORDER: 'https://api.kli.one/pay',
  PAYMENT_SUCCESS_URL: 'https://kli.one/pay/success',
  PAYMENT_CANCEL_URL: 'https://kli.one/',
  PAYMENT_ERROR_URL: 'https://kli.one/pay/error',
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
