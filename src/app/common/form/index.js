import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { equals, clone, merge, omit, remove, insert, map } from 'ramda';
import { validateField } from '../validation';
import {
  addFieldsToForm,
  updateFieldsInForm,
  removeFieldsFromForm
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
  button: {
    marginTop: theme.spacing.unit * 1
  },
  errorIconColor: {
    color: theme.palette.error.main
  }
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
    this.setState({ fields: this.addHandlers(this.props.fields) });
    if (this.props.publish) this.props.addFieldsToForm(this.props.fields);
  }
  componentWillUnmount() {
    if (this.props.publish) this.props.removeFieldsFromForm(this.props.fields);
  }
  componentWillReceiveProps(nextProps) {
    if (!equals(this.state.fields, nextProps.fields)) {
      const nextFieldsWithHandlers = this.addHandlers(nextProps.fields);
      this.setState({ fields: nextFieldsWithHandlers });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !equals(this.state.fields, nextProps.fields);
  }
  addHandlers = fields => {
    const handlers = {
      onChangeText: event => {
        const { name, value } = event.target;
        const fieldIndex = this.state.fields.findIndex(
          field => field.name === name
        );
        const field = clone(this.state.fields[fieldIndex]);
        const validatedField = this.props.validate
          ? validateField(merge(field, { value }))
          : merge(field, { value });
        const nextFields = insert(
          fieldIndex,
          validatedField,
          remove(fieldIndex, 1, this.state.fields)
        );
        this.setState({
          fields: nextFields
        });
        if (this.props.publish) this.props.updateFieldsInForm(nextFields);
      }
    };
    return fields.map(field => ({
      ...field,
      onChange: handlers.onChangeText
    }));
  };

  cleanSubmitFields = fields => map(omit(formFieldProps), fields);

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
      if (this.props.publish) this.props.updateFieldsInForm(validatedFields);
      this.setState({ fields: validatedFields });
    } else {
      if (this.props.publish) this.props.removeFieldsFromForm(validatedFields);
      this.props.submit.action(this.cleanSubmitFields(validatedFields));
    }
  };

  handleSecondaryAction = action => {
    action(this.cleanSubmitFields(this.state.fields));
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
      <Paper className={classes.paper} elevation={0}>
        {!!title && (
          <Typography variant="headline" color="primary" gutterBottom>
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
        {showProgressBar ? (
          <LinearProgress color="secondary" />
        ) : (
          <div>
            <Button
              onClick={this.handleSubmit}
              className={classes.button}
              variant="raised"
              color="secondary"
              fullWidth
            >
              <Typography variant="headline" color="inherit">
                {submit.label || 'Submit'}
              </Typography>
            </Button>
            {secondaryActions &&
              secondaryActions.length &&
              secondaryActions.map(a => (
                <Button
                  key={a.label}
                  variant="raised"
                  color="primary"
                  className={classes.button}
                  fullWidth
                  onClick={() => {
                    a.action(fields);
                  }}
                >
                  {a.label}
                </Button>
              ))}
          </div>
        )}
      </Paper>
    );
  }
}

const mapDispatchToProps = {
  addFieldsToForm,
  removeFieldsFromForm,
  updateFieldsInForm
};

export default connect(null, mapDispatchToProps)(withStyles(style)(Form));
