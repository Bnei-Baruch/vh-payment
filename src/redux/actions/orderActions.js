import {
  SET_ORDER,
  SET_SELECTED_TICKET,
  SET_SELECTED_MEMBERSHIP,
  SET_PRODUCT
} from "../types";

export function setOrder(value) {
  return {
    type: SET_ORDER,
    payload: value,
  };
}

export function setSelectedTicket(value) {
  return {
    type: SET_SELECTED_TICKET,
    payload: value,
  };
}

export function setSelectedMembership(value) {
  return {
    type: SET_SELECTED_MEMBERSHIP,
    payload: value,
  };
}

export function setProduct(value) {
  return {
    type: SET_PRODUCT,
    payload: value,
  };
}
