import { createMuiTheme } from 'material-ui/styles';

const theme = {
  palette: {
    primary: {
      light: '#2c2c2c',
      main: '#000000',
      dark: '#000000',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ff5131',
      main: '#d40000',
      dark: '#9a0000',
      contrastText: '#ffffff'
    },
    error: {
      light: '#a0ff56',
      main: '#63ff00',
      dark: '#00cb00',
      contrastText: '#000000'
    },
    type: 'dark' // Switch between dark and light mode
  }
};

export default createMuiTheme(theme);
