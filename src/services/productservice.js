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
    const response = await axios.get(apiUrl);

    if (response.data && response.data.data) {
      const data = response.data.data;
      return {
        amount: data.amount,
        currency: data.currency,
        pricingVersion: data.pricing_version,
        hasErrors: data.has_errors || false,
        v2Details: data.v2_details,
        v1AllPrices: data.v1_all_prices || null,
      };
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

/**
 * Get membership product with pricing.
 * Fetches pricing from backend API which handles version logic (v1/v2/t1).
 *
 * @param {string} kc_id - Keycloak user subject ID
 * @returns {Promise<{product: Object|null, error: Object|null}>} On success
 *   `{ product, error: null }`; on any failure `{ product: null, error: { reason, ... } }`.
 *   (Never returns null — callers must check `error`/`product`, not falsiness.)
 */
export const getMembershipProduct = async (kc_id) => {
  // Local capture: this is the single chokepoint behind every membership/HH
  // "Something went wrong". On failure we return the real cause so the dialog
  // can offer it for copy-to-clipboard. (No global state — caller threads it.)
  try {
    const price = await getMembershipMonthlyPricing(kc_id);

    if (!price) {
      return { product: null, error: { reason: "pricing_unavailable", kc_id } };
    }

    // Validate pricing data. Note: amount may legitimately be 0 (e.g. a 100% Help
    // Haver grant = free membership), so check for presence, not truthiness.
    if (!price.currency || price.amount == null || !price.pricingVersion) {
      return { product: null, error: { reason: "missing_fields", price } };
    }

    if (price.hasErrors) {
      return { product: null, error: { reason: "has_errors", price } };
    }

    const copy = JSON.parse(JSON.stringify(membershipsplans));
    copy.plans.forEach((plan) => {
      if (price.v1AllPrices) {
        plan.price = Object.fromEntries(
          Object.entries(price.v1AllPrices).map(([cur, amount]) => [
            cur, { amount, fixed: true },
          ])
        );
      } else {
        plan.price = {
          [price.currency.toLowerCase()]: { amount: price.amount, fixed: true },
        };
      }
    });

    // Attach pricing metadata to the product
    copy.pricingVersion = price.pricingVersion;
    copy.pricingCurrency = price.currency;
    copy.v2Details = price.v2Details || null;

    return { product: copy, error: null };
  } catch (e) {
    return { product: null, error: { reason: "exception", message: e.message } };
  }
};
