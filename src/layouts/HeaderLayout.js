import React from 'react';
import {AppBar, Box, FormControl, InputLabel, Toolbar} from '@material-ui/core';
import logo from '../images/tree.svg'
import {makeStyles} from '@material-ui/styles';
import LanguagePicker from '../components/LanguagePicker';
import CurrencyPicker from '../components/CurencyPicker';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '4px 24px',
    maxHeight: 65
  },
  bar: {
    boxShadow: 'rgb(0 0 0 / 20%) 0 3px 1px -2px, rgb(0 0 0 / 14%) 0 2px 2px 0, rgb(0 0 0 / 12%) 0 1px 5px 0'
  },
  image: {
    maxHeight: 65
  },
  text: {
    fontFamily: 'Assistant',
    fontWeight: '700',
    fontSize: '1.3rem',
    color: "#00457c"
  },
  menu: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: 20
  },
});

const HeaderLayout = () => {
  const classes = useStyles();
  const {t} = useTranslation();
  const {dir} = useSelector(state => state.language);
  const {logoUrl} = useSelector(state => state.payment);
  return (
    <AppBar color="default" dir={dir} className={classes.bar}>
      <Toolbar className={classes.root}>
        <Box>
          <img className={classes.image} src={logoUrl || logo} alt="BB Logo"/>
        </Box>

        <Box className={classes.menu}>
          <FormControl>
            <InputLabel>{t('appbar.language')}</InputLabel>
            <LanguagePicker/>
          </FormControl>

          <FormControl>
            <InputLabel>{t('appbar.currency')}</InputLabel>
            <CurrencyPicker/>
          </FormControl>
        </Box>
      </Toolbar>
    </AppBar>
  )
};

export default HeaderLayout;
