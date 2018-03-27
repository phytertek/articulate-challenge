import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Dialog from 'material-ui/Dialog';
import { closeModal } from '../../store';
import Slide from 'material-ui/transitions/Slide';

const style = theme => ({
  title: {
    padding: theme.spacing.unit * 2
  }
});

const Transition = props => (
  <Slide {...props} direction="down" mountOnEnter unmountOnExit />
);

const AppDialog = ({ classes, openDialogs, closeModal }) => {
  const open = openDialogs.length > 0;
  return (
    <Dialog
      onClose={() =>
        !!openDialogs[0] && closeModal('dialog', openDialogs[0].title)
      }
      open={open}
      fullScreen={true}
      transition={Transition}
      transitionDuration={{ enter: 250, exit: 100 }}
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
  withStyles(style)(AppDialog)
);
