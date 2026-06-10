window.APP_CONFIG = {
    SHORT_SHA: '{{env.Getenv "SHORT_SHA" "-"}}',
    VH_API_BASE_URL: '{{env.Getenv "VH_API_BASE_URL" "http://api.eurokab.info"}}',
    VH_BASE_URL: '{{env.Getenv "VH_BASE_URL" "http://eurokab.info"}}',
    KEYCLOAK_CONFIG: {
        realm: '{{env.Getenv "KEYCLOAK_REALM" "master"}}',
        url: '{{env.Getenv "KEYCLOAK_URL" "https://auth.2serv.eu/auth/"}}',
        clientId: '{{env.Getenv "KEYCLOAK_CLIENT_ID" "membership_pay_dev"}}'
    },
    GLASSIX_API_KEY: '{{env.Getenv "GLASSIX_API_KEY" ""}}',
    SENTRY_DSN: '{{env.Getenv "SENTRY_DSN" ""}}',
    SENTRY_ENVIRONMENT: '{{env.Getenv "SENTRY_ENVIRONMENT" "production"}}'
};
