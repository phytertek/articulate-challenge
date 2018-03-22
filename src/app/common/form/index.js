import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { equals, clone, merge, append, omit, remove, insert } from 'ramda';
import { validateField } from '../validation';
import {
  addFieldsToCurrentForm,
  updateFieldsInCurrentForm,
  removeFieldsFromCurrentForm
} from '../../store';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { Text, Password } from '../field';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';

const style = theme => ({
  paper: {
    padding: theme.spacing.unit * 2
  },
  grid: {
    paddingBottom: theme.spacing.unit * 4
  },
  textField: {
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1
  },
  buttonMain: {
    padding: 20,
    width: '100%'
  },
  secondaryButton: {
    width: '100%'
  },
  errorIconColor: {
    color: theme.palette.error.main
  },
  progressBar: theme.palette.error.main
});

const render = field => {
  switch (field.type) {
    case 'password':
      return <Password {...field} />;
    default:
      return <Text {...field} />;
  }
};
const formFieldProps = ['onChange'];

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: this.addHandlers(props.fields)
    };
  }

  componentDidMount() {
    if (this.props.publish)
      this.props.addFieldsToCurrentForm(this.props.fields);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !equals(this.state.fields, nextState.fields) ||
      !equals(this.props, nextProps)
    );
  }

  addHandlers = fields => {
    const handlers = {
      onChangeText: e => {
        const { name, value } = e.target;
        const fIndex = this.state.fields.findIndex(f => f.name === name);
        const field = clone(this.state.fields[fIndex]);
        const validatedField = this.props.validate
          ? validateField(merge(field, { value }))
          : merge(field, { value });
        const nextFields = insert(
          fIndex,
          validatedField,
          remove(fIndex, 1, this.state.fields)
        );
        this.setState({
          fields: nextFields
        });
        if (this.props.publish)
          this.props.updateFieldsInCurrentForm(nextFields);
      }
    };
    return fields.map(field => ({
      ...field,
      onChange: handlers.onChangeText
    }));
  };

  cleanSubmitFields = fields =>
    fields.map(field => omit(formFieldProps, field));

  handleSubmit = e => {
    e.preventDefault();
    let fieldErrors = false;
    const validatedFields = this.props.validate
      ? this.state.fields.map(field => {
          const validated = validateField(field);
          if (!!validated.error) fieldErrors = true;
          return validated;
        })
      : clone(this.state.fields);
    if (fieldErrors) {
      if (this.props.publish)
        this.props.updateFieldsInCurrentForm(validatedFields);
      this.setState({ fields: validatedFields });
    } else {
      if (this.props.publish)
        this.props.removeFieldsFromCurrentForm(validatedFields);
      this.props.submit.action(this.cleanSubmitFields(validatedFields));
    }
  };

  render() {
    const {
      classes,
      title,
      secondaryActions,
      submit,
      showProgressBar
    } = this.props;
    const { fields } = this.state;
    return (
      <div>
        <Paper className={classes.paper}>
          {!!title && (
            <Typography variant="display2" gutterBottom>
              {title}
            </Typography>
          )}
          <Grid>
            {fields.map(field => (
              <Grid item className={classes.textField} key={field.name}>
                {render(field)}
              </Grid>
            ))}
          </Grid>
        </Paper>
        {showProgressBar ? (
          <LinearProgress color="secondary" />
        ) : (
          <div>
            <Button
              onClick={this.handleSubmit}
              className={classes.buttonMain}
              variant="raised"
              color="primary"
            >
              <Typography variant="title" color="inherit">
                {submit.label || 'Submit'}
              </Typography>
            </Button>
            {secondaryActions &&
              secondaryActions.length &&
              secondaryActions.map(a => (
                <Button
                  key={a.label}
                  variant="raised"
                  color="secondary"
                  className={classes.secondaryButton}
                  onClick={() => a.action(this)}
                >
                  {a.label}
                </Button>
              ))}
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  addFieldsToCurrentForm,
  removeFieldsFromCurrentForm,
  updateFieldsInCurrentForm
};

export default connect(null, mapDispatchToProps)(withStyles(style)(Form));
