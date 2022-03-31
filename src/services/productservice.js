import {
  convention,
  convention10,
  conventiontest,
  tickets,
  userfee,
  userfeeonetime,
} from "../shared/products";

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
