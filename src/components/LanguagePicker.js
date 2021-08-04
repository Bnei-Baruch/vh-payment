import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  MenuItem,
  Menu,
  IconButton as MuiIconButton,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { languages } from '../shared/languages';
import { setLanguage } from '../redux/actions/languageActions';
import { setCurrency } from '../redux/actions/currencyActions';
import { currencies } from '../shared/currencies';

const VH_DEFAULT_LANG = 'VH_DEFAULT_LANG';

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const LanguagePicker = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useSelector(state => state.language);

  const [anchorMenu, setAnchorMenu] = useState(null);

  useEffect(() => {
    const langId = localStorage.getItem(VH_DEFAULT_LANG);
    if (langId) {
      const lang = languages.find(l => l.id === langId);

      if (lang) {
        dispatch(setLanguage(lang));
        i18n.changeLanguage(langId).catch(err => console.error(err));
      }
    }
  }, [dispatch, i18n]);

  const toggleMenu = event => {
    setAnchorMenu(event.currentTarget);
  };

  const handleChange = langId => {
    const lang = languages.find(l => l.id === langId);
    dispatch(setLanguage(lang));
    localStorage.setItem(VH_DEFAULT_LANG, langId);
    i18n.changeLanguage(langId).catch(err => console.error(err));

    if (langId === 'he') {
      const cr = currencies.find(l => l.id === 'nis');
      dispatch(setCurrency(cr));
      localStorage.setItem('VH_DEFAULT_CURRENCY', 'he');
    }

    setAnchorMenu(null);
  };

  const countryToFlag = isoCode => {
    return typeof String.fromCodePoint !== 'undefined'
      ? isoCode
          .toUpperCase()
          .replace(/./g, char =>
            String.fromCodePoint(char.charCodeAt(0) + 127397),
          )
      : isoCode;
  };

  return (
    <>
      <IconButton
        aria-owns={anchorMenu ? 'menu-appbar' : undefined}
        aria-haspopup='true'
        onClick={toggleMenu}
        color='inherit'
      >
        {countryToFlag(languages.find(value => value.id === id).country)}
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={() => setAnchorMenu(null)}
        style={{ maxHeight: 350 }}
      >
        {languages.map(item => (
          <MenuItem key={item.id} onClick={() => handleChange(item.id)}>
            {t(item.i18nKey)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguagePicker;
