import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Dialog, { withMobileDialog } from 'material-ui/Dialog';
import { closeModal } from '../../store';

const style = theme => ({
  dialog: {
    minWidth: 450
  },
  title: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2
  }
});

const AppDialog = ({ classes, openDialogs, closeModal, fullScreen }) => {
  const open = openDialogs.length > 0;
  return (
    <Dialog
      onClose={() => closeModal('dialog', openDialogs[0].title)}
      open={open}
      fullScreen={fullScreen}
      className={classes.dialog}
    >
      {open &&
        !openDialogs[0].hideTitle && (
          <Typography
            variant="display1"
            gutterBottom={false}
            className={classes.title}
          >
            {openDialogs[0].title}
          </Typography>
        )}
      {open && openDialogs[0].element}
    </Dialog>
  );
};

const mapStateToProps = state => ({
  openDialogs: state.app.openDialogs
});

const mapDispatchToProps = { closeModal };

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(style)(withMobileDialog({ breakpoint: 'xs' })(AppDialog))
);
