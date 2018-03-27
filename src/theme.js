import { createMuiTheme } from 'material-ui/styles';

const theme = {
  palette: {
    primary: {
      light: '#606060',
      main: '#363636',
      dark: '#101010',
      contrastText: '#fff'
    },
    secondary: {
      light: '#74edff',
      main: '#2dbbf2',
      dark: '#008bbf',
      contrastText: '#fff'
    },
    error: {
      main: '#ff673f',
      light: '#ff996c',
      dark: '#c53413',
      contrastText: '#fff'
    },
    background: {
      default: '#fff'
    }
  },
  typography: {
    fontFamily: '"Lato", sans-serif',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 900,
    body2: {
      fontFamily: '"Merriweather", serif'
    },
    body1: {
      fontSize: 18,
      fontFamily: '"Merriweather", serif'
    }
  }
};

export default createMuiTheme(theme);
