import React, {useEffect} from 'react'

import {useDispatch, useSelector} from 'react-redux'

import {MenuItem, Select} from '@material-ui/core'
import {useTranslation} from 'react-i18next';
import {languages} from '../shared/languages';
import {setLanguage} from '../redux/actions/languageActions';
import {setCurrency} from '../redux/actions/currencyActions';
import {currencies} from '../shared/currencies';

const VH_DEFAULT_LANG = 'VH_DEFAULT_LANG';

const LanguagePicker = () => {
  const {t, i18n} = useTranslation();
  const language = useSelector(state => state.language);
  const dispatch = useDispatch();

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

  const handleChange = (langId) => {
    const lang = languages.find(l => l.id === langId);
    dispatch(setLanguage(lang));
    localStorage.setItem(VH_DEFAULT_LANG, langId);
    i18n.changeLanguage(langId).catch(err => console.error(err));

    if (langId === 'he') {
      const cr = currencies.find(l => l.id === 'nis');
      dispatch(setCurrency(cr))
      localStorage.setItem('VH_DEFAULT_CURRENCY', 'he');
    }
  };

  return (
    <Select
      value={language.id}
      onChange={event => handleChange(event.target.value)}
    >
      {
        languages.map((l) => <MenuItem key={l.id} value={l.id}>{t(l.i18nKey)}</MenuItem>)
      }
    </Select>
  )
}

export default LanguagePicker
