window.APP_CONFIG = {
    SHORT_SHA: '{{env.Getenv "SHORT_SHA" "-"}}',
    VH_API_BASE_URL: '{{env.Getenv "VH_API_BASE_URL" "http://api.eurokab.info"}}',
    VH_BASE_URL: '{{env.Getenv "VH_BASE_URL" "http://eurokab.info"}}',
    KEYCLOAK_CONFIG: {
        realm: '{{env.Getenv "KEYCLOAK_REALM" "master"}}',
        url: '{{env.Getenv "KEYCLOAK_URL" "https://auth.2serv.eu/auth/"}}',
        clientId: '{{env.Getenv "KEYCLOAK_CLIENT_ID" "membership_pay_dev"}}'
    },
    CRISP_WEBSITE_ID: '{{env.Getenv "CRISP_WEBSITE_ID" "a88f7eac-d881-450b-b589-ab82160fb08a"}}',
    SENTRY_DSN: '{{env.Getenv "SENTRY_DSN" ""}}',
    SENTRY_ENVIRONMENT: '{{env.Getenv "SENTRY_ENVIRONMENT" "production"}}'
};
