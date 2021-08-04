import React from 'react';
import {
  AppBar,
  Box,
  FormControl,
  Hidden,
  InputLabel,
  Toolbar,
  Typography,
} from '@material-ui/core';
import logo from '../images/tree.svg';
import { makeStyles } from '@material-ui/styles';
import LanguagePicker from '../components/LanguagePicker';
import CurrencyPicker from '../components/CurencyPicker';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { UserMenu } from '../components/UserMenu/UserMenu';

const useStyles = makeStyles({
  appbar: {
    boxShadow:
      'rgb(0 0 0 / 20%) 0 3px 1px -2px, rgb(0 0 0 / 14%) 0 2px 2px 0, rgb(0 0 0 / 12%) 0 1px 5px 0',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '4px 24px',
    maxHeight: 65,
  },
  image: {
    maxHeight: 65,
  },
  text: {
    fontWeight: 700,
    fontSize: 20,
    marginInlineStart: 4,
  },
  menu: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: 20,
  },
  currencySign: {
    fontSize: 22,
    marginInlineEnd: 8,
    color: '#595959',
  },
  subtitle: {
    color: '#4aa5ff',
    fontSize: 12,
    marginInlineStart: 4,
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
});

const HeaderLayout = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { dir } = useSelector(state => state.language);
  const { sign } = useSelector(state => state.currency);
  const { appbar } = useSelector(state => state.order);

  return (
    <AppBar
      color='default'
      position='relative'
      dir={dir}
      className={classes.appbar}
    >
      <Toolbar className={classes.toolbar}>
        <Box className={classes.logoWrapper}>
          <img
            className={classes.image}
            src={appbar.logo || logo}
            alt='BB Logo'
          />
          <Hidden xsDown>
            <Box ml={1}>
              <Typography
                className={classes.text}
                style={{ color: appbar.textColor || '#00457c' }}
              >
                BNEI BARUCH
              </Typography>
              <Box className={classes.subtitle}>VIRTUAL HOME</Box>
            </Box>
          </Hidden>
        </Box>

        <Box className={classes.menu}>
          <Box display='flex' alignItems='center'>
            <Hidden xsDown>
              <Typography className={classes.currencySign}>{sign}</Typography>
            </Hidden>
            <FormControl>
              <InputLabel>{t('appbar.currency')}</InputLabel>
              <CurrencyPicker />
            </FormControl>
          </Box>

          <Box display='flex' alignItems='center'>
            <LanguagePicker />
          </Box>

          <Box>
            <UserMenu />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderLayout;
