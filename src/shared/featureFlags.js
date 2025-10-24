/**
 * Get pricing version from URL parameter
 * Supported versions:
 *   - v1: Static pricing (legacy) - user selects currency
 *   - v2: Country-based tiered pricing - backend determines currency
 *   - t1: Tier 1 rollout (IL/NIS scope) - backend determines currency
 *
 * Example: ?pricingVersion=t1
 *
 * @returns {string|null} Pricing version or null if not set (defaults to v1 in backend)
 */
export const getPricingVersion = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("pricingVersion");
};

/**
 * Check if currency picker should be shown
 * Currency picker is shown for v1 pricing (where user selects currency)
 * Hidden for v2/t1 pricing (where backend determines currency)
 *
 * @returns {boolean} true if currency picker should be shown
 */
export const shouldShowCurrencyPicker = () => {
  const version = getPricingVersion();
  // Show picker for v1 or when no version is specified (defaults to v1)
  return !version || version === "v1";
};

/**
 * Get debug user keycloak ID from URL parameter
 * Used for testing different users' pricing without logging in as them
 *
 * @returns {string|null} Debug user keycloak ID or null if not set
 */
export const getDebugUser = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const debugUser = urlParams.get("debug_user");

  if (debugUser) {
    console.warn('[Debug Mode] 🔧 Using debug_user:', debugUser);
    console.warn('[Debug Mode] ⚠️  This should ONLY be used in development!');
  }

  return debugUser;
};
