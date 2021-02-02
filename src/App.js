import {connect} from 'react-redux';

import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import {StylesProvider} from '@material-ui/styles';
import {ThemeProvider} from 'styled-components';
import maTheme from './theme';

import Routes from './routes';

import './i18n';

function App({theme}) {
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={maTheme[theme.currentTheme]}>
        <ThemeProvider theme={maTheme[theme.currentTheme]}>
          <Routes/>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}

export default connect(store => ({theme: store.themeReducer}))(App);
