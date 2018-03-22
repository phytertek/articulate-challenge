import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../app/store';
import NavMenuAuthPresentation from './presentation';

class NavMenuAuth extends Component {
  state = { anchorEl: null };
  handleOpen = e => this.setState({ anchorEl: e.currentTarget });
  handleClose = () => this.setState({ anchorEl: null });
  render() {
    const open = !!this.state.anchorEl;
    return (
      <NavMenuAuthPresentation
        open={open}
        isAuth={this.props.isAuth}
        openModal={this.props.openModal}
        anchorEl={this.state.anchorEl}
        handleOpen={this.handleOpen}
        handleClose={this.handleClose}
      />
    );
  }
}

export default connect(null, { openModal })(NavMenuAuth);
