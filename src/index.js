import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import { Provider } from 'react-redux';
import store from './store';

import { MuiThemeProvider } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';
import theme from './theme.js';

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
