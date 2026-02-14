/**
 * Get forced pricing version from URL parameter
 *
 * IMPORTANT: This is for testing/override purposes only.
 * The common and recommended way is to NOT set this parameter (null),
 * which allows the backend to automatically determine the appropriate
 * pricing version based on user context, rollout strategy, and business logic.
 *
 * When set via URL parameter, it forces a specific pricing version:
 *   - v1: Force static pricing (legacy) - user selects currency
 *   - v2: Force country-based tiered pricing - backend determines currency
 *   - t1: Force tier 1 rollout behavior (IL/NIS scope)
 *   - null (default): Backend determines pricing automatically (RECOMMENDED)
 *
 * Example: ?pricingVersion=t1
 *
 * @returns {string|null} Forced pricing version, or null to let backend decide (default)
 */
export const getForcedPricingVersion = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("pricingVersion");
};

/**
 * Check if currency picker should be shown based on backend's pricing version
 * Currency picker is shown for v1 pricing (where user selects currency)
 * Hidden for v2/t1 pricing (where backend determines currency)
 *
 * @param {string|null|undefined} backendPricingVersion - The pricing version returned by backend
 * @returns {boolean} true if currency picker should be shown
 */
export const shouldShowCurrencyPicker = (backendPricingVersion) => {
  // If no version yet (loading), hide picker to avoid flashing
  if (!backendPricingVersion) {
    return false;
  }
  // Show picker only for v1 (user selects currency)
  return backendPricingVersion === "v1";
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
