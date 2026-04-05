import {
  SET_ORDER,
  SET_SELECTED_MEMBERSHIP,
  SET_SELECTED_TICKET,
  SET_MEMBERSHIP_PRODUCT,
  SET_PRODUCT,
  SPECIAL_SELECTED_OPTION,
} from "../types";

const DEFAULT = {
  appbar: {
    logo: "",
    text: "",
    textColor: "",
  },
  header: {
    title: "",
    subtitle: "",
    description: "",
  },
  body: {
    title: "",
    description: "",
  },
  termsLink: "",
  cancel: {
    text: "",
    url: "",
  },
  buttonText: "",
  currency: {
    amount: 0,
    min: 0,
    max: 100,
    step: 1,
    fixed: true,
  },
  product: {
    SKU: "",
    reference: "",
    type: "",
    productType: "",
    recurringFreq: 0,
    organization: "",
  },
  ticketProduct: undefined,
  selectedTicket: undefined,
  selectedMembership: undefined,
  membershipProduct: undefined,
};

export default function reducer(state = DEFAULT, { type, payload }) {
  switch (type) {
    case SET_ORDER:
      return {
        ...state,
        appbar: { ...state.appbar },
        header: { ...state.header },
        body: { ...state.body },
        cancel: { ...state.cancel },
        currency: { ...state.currency },
        product: { ...state.product },
        ...payload,
      };

    case SET_MEMBERSHIP_PRODUCT:
      return {
        ...state,
        membershipProduct: payload,
      };

    case SET_SELECTED_MEMBERSHIP:
      return {
        ...state,
        selectedMembership: payload,
      };

    case SET_SELECTED_TICKET:
      return {
        ...state,
        selectedTicket: payload,
      };

    case SET_PRODUCT:
      return {
        ...state,
        ticketProduct: payload,
      };

    case SPECIAL_SELECTED_OPTION:
      return {
        ...state,
        specialSelectedOption: payload,
      };

    default:
      return state;
  }
}
