import React from 'react';

const style = theme => ({
  root: { width: 400 },
  container: { paddwing: 20 }
});

const RegLoginFormPresentation = ({
  classes,
  email,
  password,
  __emailError,
  __passwordError,
  __showPassword
}) => {
  return;
  <div className={classes.root}>
    <div className={classes.container}>
      <Grid container direction="column">
        <Grid item>
          <TextField
            type="email"
            value={email}
            error={!!__emailError}
            helperText={__emailError}
            onChange={handleChange}
            name="email"
            label="Email"
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  </div>;
};

export default withStyles(style)(RegLoginFormPresentation);
