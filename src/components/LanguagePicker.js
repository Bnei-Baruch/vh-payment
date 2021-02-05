import React, {useEffect, useState} from 'react'

import {useDispatch} from 'react-redux'

import {MenuItem, Select} from '@material-ui/core'
import {useTranslation} from 'react-i18next';
import {languages} from '../shared/languages';
import {setLanguage} from '../redux/actions/languageActions';
import {setCurrency} from '../redux/actions/currencyActions';

const VH_DEFAULT_LANG = 'VH_DEFAULT_LANG';

const LanguagePicker = () => {
  const {t, i18n} = useTranslation();
  const [selectedLang, setSelectedLang] = useState(languages[0]);

  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelectedLang(value);
    dispatch(setLanguage(value))
    localStorage.setItem(VH_DEFAULT_LANG, value.id);
    i18n.changeLanguage(value.id).catch(err => console.error(err));

    if (value.id === 'he') {
      dispatch(setCurrency('NIS'))
      localStorage.setItem('VH_DEFAULT_CURRENCY', 'he');
    }
  };

  useEffect(() => {
    const langId = localStorage.getItem(VH_DEFAULT_LANG);
    if (langId) {
      const lang = languages.find(l => l.id === langId);

      if (lang) {
        i18n.changeLanguage(langId).catch(err => console.error(err));
        dispatch(setLanguage(lang));
        setSelectedLang(lang);
      }
    }
  }, [dispatch, i18n]);

  return (
    <Select
      value={selectedLang}
      onChange={(event, option) => handleChange(option.props.value)}
    >
      {
        languages.map((l) => <MenuItem key={l.id} value={l}>{t(l.i18nKey)}</MenuItem>)
      }
    </Select>
  )
}

export default LanguagePicker
