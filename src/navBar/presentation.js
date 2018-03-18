import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';

import headerLogo from './resources/enmapi_red_d40000.svg';
import NavMenuAuth from './navMenuAuth';

const style = theme => ({
  flex: { flex: 1 },
  logo: {
    height: 40
  }
});

const NavBarPresentation = ({ classes, anchorEl, isAuth = true }) => {
  const open = !!anchorEl;
  return (
    <AppBar position="static">
      <Toolbar>
        <img src={headerLogo} className={classes.logo} />
        <Typography
          variant="display1"
          color="secondary"
          className={classes.flex}
        />
        {isAuth && <NavMenuAuth />}
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(style)(NavBarPresentation);
