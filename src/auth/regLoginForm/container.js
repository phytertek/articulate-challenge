import React, { Component } from 'react';

import RegLoginFormPresentation from './presentation';

class RegLoginForm extends Component {
  state = {
    email: '',
    password: '',
    __emailError: false,
    __passwordError: false,
    __showPassword: false
  };

  handleShowPassword = () =>
    this.setState(state => ({ __showPassword: !state.__showPassword }));
  render() {
    return <RegLoginFormPresentation />;
  }
}

export default RegLoginForm;
