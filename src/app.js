import React, { Component } from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import Typography from 'material-ui/Typography';

import NavBar from './navBar';

class App extends Component {
  render() {
    return (
      <div>
        <CssBaseline />
        <NavBar />
      </div>
    );
  }
}

export default App;
