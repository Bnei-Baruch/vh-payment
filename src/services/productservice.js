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

export const getMembershipMonthlyCost = async (kc_id) => {
  return axios
    .get(`${window.APP_CONFIG.VH_API_BASE_URL}/profile/v1/membership/cost/${kc_id}`)
    .then((res) => {
      return res.data.data
    }).catch(err => {
      return {"error": err.toJSON()};
    });
}

export const getMembershipProduct = async (kc_id) => {
  const cost = await getMembershipMonthlyCost(kc_id);

  if (!cost || !cost.costs) {
    // Falbacck to hard coded cost.
    return membershipsplans;
  }

  const copy = structuredClone(membershipsplans);
  copy.plans.forEach((plan) => {
    plan.price = {};
    cost.costs.forEach((c) => {
      plan.price[c.currency] = {
        amount: c.amount,
        fixed: true,
      }
    });
  });

  return copy;
};
