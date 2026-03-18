import * as Sentry from "@sentry/react";

// Enhanced error handler that adds classification properties
export const enhanceError = (error) => {
  if (error.response) {
    // Server responded with error status (4xx, 5xx)
    error.isRetryable = error.response.status >= 500;
    error.errorType = error.response.status >= 500 ? 'server_error' : 'client_error';
    error.statusCode = error.response.status;
    error.statusText = error.response.statusText;
  } else if (error.request) {
    // Network error - retryable
    error.isRetryable = true;
    error.errorType = 'network_error';
  } else {
    // Request configuration error
    error.isRetryable = false;
    error.errorType = 'config_error';
  }

  // Report to Sentry — skip auth errors handled by Keycloak
  const skipSentry = error.statusCode === 401 || error.statusCode === 403;
  if (!skipSentry) {
    Sentry.captureException(error, {
      extra: {
        errorType: error.errorType,
        statusCode: error.statusCode,
        isRetryable: error.isRetryable,
      },
    });
  }

  return error;
};

// DRY error handler for all axios calls
export const handleAxiosError = (error) => {
  throw enhanceError(error);
};
