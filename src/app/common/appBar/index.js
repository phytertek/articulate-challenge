import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import articulate_logo from '../../resources/articulate_logo.svg';
import rise_logo from '../../resources/rise_logo.svg';

const style = theme => ({
  title: { flex: 1, paddingLeft: theme.spacing.unit * 2 },
  logo: {
    height: 20,
    paddingLeft: theme.spacing.unit * 2
  },
  logo2: {
    height: 40,
    paddingLeft: theme.spacing.unit * 2
  }
});

const _AppBar = ({ classes, anchorEl, isAuth }) => {
  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar disableGutters>
        <img
          alt="Articulate logo"
          src={articulate_logo}
          className={classes.logo}
        />
        <img alt="Rise logo" src={rise_logo} className={classes.logo2} />
        <Typography variant="headline" className={classes.title}>
          Developer Challenge
        </Typography>
        <Button disabled>
          <Typography variant="headline" color="textSecondary">
            Ryan Lowe
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(style)(_AppBar);
