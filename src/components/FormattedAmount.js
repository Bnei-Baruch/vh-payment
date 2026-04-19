import React from "react";
import { useSelector } from "react-redux";
import { currencies } from "../shared/currencies";

// currency can be a Currency object { id, sign } or a backend string ("NIS", "USD", "EUR")
function resolveCurrency(currency) {
  if (!currency) return null;
  if (typeof currency === "string") {
    return currencies.find(c => c.id === currency.toLowerCase())
      || { id: currency.toLowerCase(), sign: currency };
  }
  return currency;
}

export default function FormattedAmount({ amount, currency }) {
  const { dir } = useSelector((state) => state.language);
  const isRTL = dir === "rtl";
  const cur = resolveCurrency(currency);
  const isNIS = cur?.id === "nis";

  if (isNIS && isRTL) return <span dir="ltr">{cur.sign} {amount}</span>;
  if (isNIS)          return <span dir="ltr">{amount} NIS</span>;
  return                     <span dir="ltr">{amount} {cur?.sign}</span>;
}
