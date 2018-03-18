import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBarPresentation from './presentation';

class NavBar extends Component {
  state = {};
  render() {
    return <NavBarPresentation />;
  }
}

const mapStateToProps = (state, ownProps) => ({
  isAuth: state.auth.isAuth
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
