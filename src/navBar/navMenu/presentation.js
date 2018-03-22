import React from 'react';
import IconButton from 'material-ui/IconButton';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import MenuIcon from 'material-ui-icons/Menu';
import Menu, { MenuItem } from 'material-ui/Menu';

import AuthForm from '../../auth';

const NavMenuAuthPresentation = ({
  open,
  isAuth,
  openModal,
  anchorEl,
  handleOpen,
  handleClose
}) => (
  <div>
    <IconButton
      aria-owns={open ? 'menu-appbar' : null}
      aria-haspopup="true"
      onClick={handleOpen}
      color="secondary"
    >
      {isAuth ? <AccountCircleIcon /> : <MenuIcon />}
    </IconButton>
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={open}
      onClose={handleClose}
    >
      <MenuItem
        onClick={() =>
          openModal('drawer', {
            element: <AuthForm />
          })
        }
      >
        Login
      </MenuItem>
      {isAuth && <MenuItem onClick={handleClose}>My account</MenuItem>}
    </Menu>
  </div>
);

export default NavMenuAuthPresentation;
