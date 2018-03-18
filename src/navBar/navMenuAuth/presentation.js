import React from 'react';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';

const NavMenuAuthPresentation = ({
  open,
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
      <AccountCircle />
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
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>My account</MenuItem>
    </Menu>
  </div>
);

export default NavMenuAuthPresentation;
