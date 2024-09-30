import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { MenuItem, Menu, IconButton as MuiIconButton } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { languages } from "../shared/languages";
import { setLanguage } from "../redux/actions/languageActions";
import { setCurrency } from "../redux/actions/currencyActions";
import { currencies } from "../shared/currencies";
import LanguageIcon from "@material-ui/icons/Language";
const VH_DEFAULT_LANG = "i18nextLng";

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
  span {
    color: #747474;
    font-size: 14px;
  }
  :hover {
    background-color: transparent !important;
  }
`;

const LanguagePicker = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.language);

  const [anchorMenu, setAnchorMenu] = useState(null);
  const changeCurrency = () => {
    const cr = currencies.find((l) => l.id === "nis");
    dispatch(setCurrency(cr));
    localStorage.setItem("VH_DEFAULT_CURRENCY", "he");
  };
  useEffect(() => {
    const langId = localStorage.getItem(VH_DEFAULT_LANG) || i18n.language;

    if (langId) {
      const lang = languages.find((l) => l.id === langId);

      if (lang) {
        dispatch(setLanguage(lang));
        i18n.changeLanguage(langId).catch((err) => console.error(err));
      }
      if (window.location.search.slice(6) === "he" || i18n.language === "he") {
        changeCurrency();
      }
    }
    // eslint-disable-next-line
  }, [dispatch, i18n]);
  useEffect(() => {
    if (window.location.search.slice(6) === "he") {
      changeCurrency();
    }
    // eslint-disable-next-line
  }, []);

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleChange = (langId) => {
    const lang = languages.find((l) => l.id === langId);

    dispatch(setLanguage(lang));
    i18n.changeLanguage(langId).catch((err) => console.error(err));
    if (langId === "he") {
      changeCurrency();
    }
    setAnchorMenu(null);
  };

  return (
    <>
      <IconButton
        aria-owns={anchorMenu ? "menu-appbar" : undefined}
        aria-haspopup="true"
        onClick={toggleMenu}
        color="inherit"
      >
        <LanguageIcon /> &nbsp;
        {id?.toUpperCase()}
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={() => setAnchorMenu(null)}
        style={{ maxHeight: 350 }}
      >
        {languages.map((item) => (
          <MenuItem key={item.id} onClick={() => handleChange(item.id)}>
            {t(item.i18nKey)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguagePicker;
