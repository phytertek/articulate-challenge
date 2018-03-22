import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import style from '../style';

class _Password extends Component {
  state = { textVisible: false };
  toggleVisibleText = () =>
    this.setState(state => ({ textVisible: !state.textVisible }));
  render() {
    const style = {
      formControl: { width: this.props.fullWidth ? '100%' : null }
    };
    return (
      <FormControl style={style.formControl}>
        <InputLabel htmlFor={this.props.name} error={!!this.props.error}>
          {this.props.label ||
            `${this.props.name.charAt(0).toUpperCase()}${this.props.name.slice(
              1
            )}`}
        </InputLabel>
        <Input
          placeholder={this.props.placeholder}
          defaultValue={this.props.defaultValue}
          autoFocus={this.props.autoFocus}
          name={this.props.name}
          id={this.props.name}
          type={this.state.textVisible ? 'text' : 'password'}
          value={this.props.value}
          error={!!this.props.error}
          onChange={this.props.onChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={this.toggleVisibleText}
                className={
                  !!this.props.error ? this.props.classes.errorColor : null
                }
              >
                {this.state.textVisible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          fullWidth={this.props.fullWidth}
        />

        {(!!this.props.error || !!this.props.helperText) && (
          <FormHelperText error={!!this.props.error}>
            {this.props.error || this.props.helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}

export const Password = withStyles(style)(_Password);
