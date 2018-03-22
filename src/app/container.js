import React, { Component } from 'react';
import { connect } from 'react-redux';
import CssBaseline from 'material-ui/CssBaseline';
import { openModal } from './store';

import NavBar from '../navBar';

import AppPresentation from './presentation';

class App extends Component {
  render() {
    return (
      <div>
        <CssBaseline />
        <AppPresentation {...this.props} />
      </div>
    );
  }
}

export default connect(null, { openModal })(App);
