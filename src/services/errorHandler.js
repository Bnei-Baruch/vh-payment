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
  
  return error;
};

// DRY error handler for all axios calls
export const handleAxiosError = (error) => {
  throw enhanceError(error);
};
