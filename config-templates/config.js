window.APP_CONFIG = {
    BUILD_TIME: '{{ (time.Now).UTC }}',
    REG_BRANCH: '{{env.Getenv "CI_COMMIT_REF_NAME" "-"}}',
    REF_VERSION: '{{env.Getenv "CI_COMMIT_SHA" "-"}}',
    VH_ORDER: '{{env.Getenv "VH_ORDER" "https://api.eurokab.info/pay"}}',
    VH_SRV_PROFILE: '{{env.Getenv "VH_SRV_PROFILE" "https://api.eurokab.info/profile"}}',
    PAYMENT_SUCCESS_URL: '{{env.Getenv "PAYMENT_SUCCESS_URL" "http://eurokab.info/pay/success"}}',
    PAYMENT_CANCEL_URL: '{{env.Getenv "PAYMENT_CANCEL_URL" "http://eurokab.info"}}',
    PAYMENT_ERROR_URL: '{{env.Getenv "PAYMENT_ERROR_URL" "http://eurokab.info/pay/error"}}',
    PAYMENT_DOMAIN: '{{env.Getenv "PAYMENT_DOMAIN" "eurokab.info"}}',
    KEYCLOAK_CONFIG: {
        realm: '{{env.Getenv "KEYCLOAK_REALM" "master"}}',
        url: '{{env.Getenv "KEYCLOAK_URL" "https://auth.2serv.eu/auth/"}}',
        clientId: '{{env.Getenv "KEYCLOAK_CLIENT_ID" "membership_pay_dev"}}'
    }
};