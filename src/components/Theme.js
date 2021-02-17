import React, {useEffect, useState} from 'react';
import {StylesProvider, ThemeProvider as MuiThemeProvider} from '@material-ui/styles';
import {ThemeProvider} from 'styled-components';
import {Themes} from '../theme';
import {useSelector} from 'react-redux';

const Theme = ({children}) => {
  const {currentTheme} = useSelector(state => state.theme);
  const {dir} = useSelector(state => state.language);
  const [theme, setTheme] = useState(Themes(currentTheme, dir));

  useEffect(() => {
    setTheme(Themes(currentTheme, dir));
  }, [currentTheme, dir]);

  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};

export default Theme;
