import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import AppBar from './common/appBar';
import Dialog from './common/dialog';

import TabBlockControl from '../tabBlockControl';
import TabBlock from '../tabBlock';

const style = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    'overflow-x': 'hidden',
    'overflow-y': 'hidden'
  }
});

const App = ({ classes }) => {
  return (
    <Paper elevation={0}>
      <AppBar />
      <Paper elevation={0} className={classes.paper}>
        <Grid container spacing={8}>
          <Grid item xs={12} md={4}>
            <TabBlockControl />
          </Grid>
          <Grid item xs={12} md={8}>
            <TabBlock />
          </Grid>
        </Grid>
      </Paper>
      <Dialog />
    </Paper>
  );
};

export default withStyles(style)(App);
