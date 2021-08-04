/* eslint-disable no-unused-vars */
const keycloakConfigProd = {
  realm: 'main',
  url: 'https://accounts.kab.info/auth/',
  clientId: 'membership_pay'
};

const keycloakConfigLocal = {
  realm: "master",
  url: "https://auth.2serv.eu/auth/",
  clientId: "membership_pay_dev"
};


const keycloakConfigDev = {
  realm: "master",
  url: "https://auth.2serv.eu/auth/",
  clientId: "membership_pay_dev"
};

if (process.env.REACT_APP_LOCAL === "true") { 
  module.exports = keycloakConfigProd;
}

else {
  if (process.env.REACT_APP_STAGING === "true"){
    module.exports = keycloakConfigDev;
  }
  else {
    module.exports = keycloakConfigProd;
  }
}

  

