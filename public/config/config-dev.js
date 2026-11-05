// staging
// window.APP_CONFIG = {
//   VH_BASE_URL: 'http://eurokab.info',
//   VH_API_BASE_URL: 'https://api.eurokab.info',
//   KEYCLOAK_CONFIG: {
//     realm: "master",
//     url: "https://auth.2serv.eu/auth/",
//     clientId: "membership_pay_dev",
//   },
//   CRISP_WEBSITE_ID: 'a88f7eac-d881-450b-b589-ab82160fb08a'
// };

// production
// window.APP_CONFIG = {
//   VH_BASE_URL: 'https://kli.one',
//   VH_API_BASE_URL: 'https://api.kli.one',
//   KEYCLOAK_CONFIG: {
//     realm: "main",
//     url: "https://accounts.kab.info/auth/",
//     clientId: "membership_pay",
//   },
//   CRISP_WEBSITE_ID: 'a88f7eac-d881-450b-b589-ab82160fb08a'
// };

// local backend, production keycloak
window.APP_CONFIG = {
  VH_BASE_URL: 'http://localhost:8080',
  VH_API_BASE_URL: 'http://localhost:9000',
  KEYCLOAK_CONFIG: {
    realm: "main",
    url: "https://accounts.kab.info/auth/",
    clientId: "membership_pay",
  },
  CRISP_WEBSITE_ID: 'a88f7eac-d881-450b-b589-ab82160fb08a',
  SENTRY_DSN: '',
  SENTRY_ENVIRONMENT: 'development'
};
