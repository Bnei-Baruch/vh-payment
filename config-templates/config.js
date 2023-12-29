window.APP_CONFIG = {
    BUILD_TIME: '{{ (time.Now).UTC }}',
    REG_BRANCH: '{{env.Getenv "CI_COMMIT_REF_NAME" "-"}}',
    REF_VERSION: '{{env.Getenv "CI_COMMIT_SHA" "-"}}',
    VH_API_BASE_URL: '{{env.Getenv "VH_API_BASE_URL" "http://api.eurokab.info"}}',
    VH_BASE_URL: '{{env.Getenv "VH_BASE_URL" "http://eurokab.info"}}',
    KEYCLOAK_CONFIG: {
        realm: '{{env.Getenv "KEYCLOAK_REALM" "master"}}',
        url: '{{env.Getenv "KEYCLOAK_URL" "https://auth.2serv.eu/auth/"}}',
        clientId: '{{env.Getenv "KEYCLOAK_CLIENT_ID" "membership_pay_dev"}}'
    },
    isMembershipV2: {{eq (env.Getenv "IS_MEMBERSHIP_V2" "false") "true"}},
};
