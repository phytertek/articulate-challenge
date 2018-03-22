import React, { Component } from 'react';
import { connect } from 'react-redux';
import { equals, ifElse, omit } from 'ramda';
import { REQUIRED, STRONG_PASSWORD, EMAIL } from '../app/common/validation';
import { login, register } from './async';
import Form from '../app/common/form';

const fields = [
  {
    name: 'email',
    type: 'email',
    value: '',
    validate: [REQUIRED, EMAIL],
    fullWidth: true
  },
  {
    name: 'password',
    type: 'password',
    value: '',
    validate: [REQUIRED, STRONG_PASSWORD],
    fullWidth: true
  }
];

class AuthForm extends Component {
  state = {
    authType: 'Login'
  };
  toggleAuthType = form => {
    form.setState({
      fields: form.state.fields.map(f => omit(['error'], f))
    });
    this.setState({
      authType: equals(this.state.authType, 'Login') ? 'Register' : 'Login'
    });
  };
  onSubmit = fields => {
    const submitFields = fields.reduce((sf, f) => {
      sf[f.name] = f.value;
      return sf;
    }, {});
    equals(this.state.authType, 'Login')
      ? this.props.login(submitFields)
      : this.props.register(submitFields);
  };
  render() {
    const formOptions = {
      publish: false,
      validate: equals(this.state.authType, 'Register'),
      title: this.state.authType,
      submit: { label: this.state.authType, action: this.onSubmit },
      showProgressBar: true, //this.props.authenticating,
      secondaryActions: [
        {
          label: equals(this.state.authType, 'Login') ? 'Register' : 'Login',
          action: this.toggleAuthType
        }
      ]
    };
    return <Form fields={fields} {...formOptions} />;
  }
}
const mapStateToProps = (state, ownProps) => ({
  authenticating: state.auth.authenticating
});

const mapDispatchToProps = { login, register };

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
