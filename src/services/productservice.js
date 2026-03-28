import {
  convention,
  convention10,
  conventiontest,
  tickets,
  userfee,
  userfeeonetime,
  membershipsplans,
} from "../shared/products";

import axios from "axios";
import { getForcedPricingVersion } from "../shared/featureFlags";

//Getting the Product.
/**
 * This is a service to get the product can be replace later
 * with the backend API.
 *
 * @param {*} id Id of the product
 * @returns Product of the payment
 */
export const getProduct = (id) => {
  if (id) {
    switch (id) {
      case "1":
        return userfee;
      case "3":
        return userfeeonetime;
      case "4":
        return convention10;
      case "5":
        return conventiontest;
      default:
        return convention;
    }
  }
};

export const getEventsProductBySlug = (slug) => {
  if (tickets.event.slug === slug) return tickets;
};

/**
 * Fetch monthly membership pricing from the orders API
 * @param {string} kc_id - Keycloak user subject ID
 * @returns {Promise<Object|null>} Pricing object with {currency, amount, pricingVersion} or null on error
 */
export const getMembershipMonthlyPricing = async (kc_id) => {
  // Read user's preferred currency from localStorage
  const preferredCurrency = localStorage.getItem("VH_DEFAULT_CURRENCY") || "";

  // Get forced pricing version from URL parameter (if set)
  // null (default) = backend automatically determines appropriate version (RECOMMENDED)
  const forcedPricingVersion = getForcedPricingVersion();

  // Build API URL with parameters
  const params = new URLSearchParams();
  if (preferredCurrency) params.append("currency", preferredCurrency);
  if (forcedPricingVersion) params.append("pricing_version", forcedPricingVersion);

  const apiUrl = `${window.APP_CONFIG.VH_API_BASE_URL}/pay/v2/pricing/monthly/${kc_id}?${params.toString()}`;

  try {
    console.log('[Pricing] Fetching pricing for user:', kc_id,
                'requested version:', forcedPricingVersion || 'auto (backend decides)',
                'currency:', preferredCurrency || '(not set)');
    const response = await axios.get(apiUrl);

    if (response.data && response.data.data) {
      const data = response.data.data;
      console.log('[Pricing] Backend returned:',
                  'version:', data.pricing_version,
                  'amount:', data.amount,
                  'currency:', data.currency);
      return {
        amount: data.amount,
        currency: data.currency,
        pricingVersion: data.pricing_version,
        v2Details: data.v2_details,
      };
    } else {
      console.warn('[Pricing] Invalid response format:', response.data);
      return null;
    }
  } catch (err) {
    // Log detailed error information for debugging
    if (err.response) {
      // Server responded with error status
      console.warn(
        `[Pricing] API error ${err.response.status}:`,
        err.response.data?.message || err.response.statusText,
        '\nUsing fallback pricing'
      );
    } else if (err.request) {
      // Request made but no response received
      console.warn('[Pricing] No response from API. Network error or server down. Using fallback pricing');
    } else {
      // Error setting up request
      console.warn('[Pricing] Request setup error:', err.message, '\nUsing fallback pricing');
    }

    return null;
  }
}

/**
 * Get membership product with pricing
 * Fetches pricing from backend API which handles version logic (v1/v2/t1)
 * Returns null if API fails - caller must handle error
 *
 * @param {string} kc_id - Keycloak user subject ID
 * @returns {Promise<Object|null>} Product object with pricing, or null on error
 */
export const getMembershipProduct = async (kc_id) => {
  const price = await getMembershipMonthlyPricing(kc_id);

  if (!price) {
    console.error('[Pricing] Failed to fetch pricing from API');
    return null;
  }

  // Validate pricing data
  if (!price.currency || !price.amount || !price.pricingVersion) {
    console.error('[Pricing] Invalid pricing data, missing required fields:', price);
    return null;
  }

  console.log(`[Pricing] Applying price: ${price.amount} ${price.currency.toUpperCase()} (version: ${price.pricingVersion})`);

  const copy = JSON.parse(JSON.stringify(membershipsplans));
  copy.plans.forEach((plan) => {
    plan.price = {
      [price.currency.toLowerCase()]: {
        amount: price.amount,
        fixed: true,
      }
    };
  });

  // Attach pricing metadata to the product
  copy.pricingVersion = price.pricingVersion;
  copy.pricingCurrency = price.currency;
  copy.v2Details = price.v2Details || null;

  return copy;
};
