import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import NavBar from '../navBar';
import Dialog from './common/dialog';
import Drawer from './common/drawer';
import Snackbar from './common/snackbar';
const style = theme => {};

const AppPresentation = ({ openModal }) => {
  return (
    <div>
      <NavBar />
      <Dialog />
      <Drawer />
      <Snackbar />
    </div>
  );
};

export default withStyles(style)(AppPresentation);
