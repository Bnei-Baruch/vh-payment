import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { MenuItem, Select } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { setCurrency } from "../redux/actions/currencyActions";
import { currencies } from "../shared/currencies";

const VH_DEFAULT_CURRENCY = "VH_DEFAULT_CURRENCY";

const CurrencyPicker = (props) => {
  const { t } = useTranslation();
  const currency = useSelector((state) => state.currency);
  const dispatch = useDispatch();

  useEffect(() => {
    const currId = localStorage.getItem(VH_DEFAULT_CURRENCY);

    if (currId) {
      const cr = currencies.find((l) => l.id === currId);
      if (cr) {
        dispatch(setCurrency(cr));
      }
    }
  }, [dispatch]);

  const handleChange = (value) => {
    const cr = currencies.find((l) => l.id === value);
    dispatch(setCurrency(cr));
    localStorage.setItem(VH_DEFAULT_CURRENCY, value);
  };
  return (
    <Select
      {...props}
      value={currency.id}
      onChange={(event) => handleChange(event.target.value)}
    >
      {currencies.map((l) => (
        <MenuItem key={l.id} value={l.id}>
          {l.sign + " " + t(l.i18nKey)}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CurrencyPicker;
