import {useSelector} from 'react-redux';

import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import {StylesProvider} from '@material-ui/styles';
import {ThemeProvider} from 'styled-components';
import maTheme from './theme';

import Routes from './routes';

import './i18n';

const App = () => {
  const {currentTheme} = useSelector(state => state.theme);

  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={maTheme[currentTheme]}>
        <ThemeProvider theme={maTheme[currentTheme]}>
          <Routes/>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};

export default App;
