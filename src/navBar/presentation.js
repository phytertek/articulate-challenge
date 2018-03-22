import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';

import headerLogo from './resources/enmapi_red_d40000.svg';
import NavMenu from './navMenu';

const style = theme => ({
  flex: { flex: 1 },
  logo: {
    height: 40,
    paddingLeft: 15
  }
});

const NavBarPresentation = ({ classes, anchorEl, isAuth }) => {
  const open = !!anchorEl;
  return (
    <AppBar position="sticky">
      <Toolbar disableGutters>
        <img src={headerLogo} className={classes.logo} />
        <div className={classes.flex} />
        <NavMenu isAuth={isAuth} />
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(style)(NavBarPresentation);
