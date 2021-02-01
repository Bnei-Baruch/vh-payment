import './App.css';
import {connect} from 'react-redux';

import {ThemeProvider, ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import {StylesProvider} from "@material-ui/styles";

import maTheme from './theme';
import Routes from './routes';

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
