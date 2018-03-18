import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// App main
import App from './app';

// App actions and storage
import { Provider } from 'react-redux';
import store from './store';

// App Material theming and ui components
import { MuiThemeProvider } from 'material-ui/styles';
import theme from './theme.js';

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
