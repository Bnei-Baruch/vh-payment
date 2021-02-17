const keycloakConfigProd = {
  realm: 'main',
  url: 'https://accounts.kab.info/auth/',
  clientId: 'membership_pay'
};

const keycloakConfigDev = {
  realm: "master",
  url: "http://auth.2serv.eu/auth/",
  clientId: "membership_pay_dev"
};

module.exports = process.env.REACT_APP_STAGING ? keycloakConfigDev : keycloakConfigProd;

