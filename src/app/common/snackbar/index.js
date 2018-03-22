import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import { closeModal } from '../../store';
import { duration } from 'material-ui/styles/transitions';

const style = theme => {
  const closeSize = theme.spacing.unit * 4;
  return {
    close: { width: closeSize, height: closeSize }
  };
};

const SnackbarPresentation = ({ classes, openSnackbars, closeModal }) => {
  let duration = 6000;
  const currentSnackbar = !!openSnackbars.length
    ? openSnackbars[0]
    : { element: null, title: '' };

  const closeCurrentSnackbar = () =>
    closeModal('snackbar', currentSnackbar.title);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway' || !currentSnackbar) return;
    if (openSnackbars.length > 1) duration = 6000;
    closeCurrentSnackbar();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={!!currentSnackbar.element}
      autoHideDuration={duration}
      onClose={handleClose}
      message={!!currentSnackbar && currentSnackbar.element}
      action={
        <IconButton
          key={`${currentSnackbar.title}close`}
          aria-label={`${currentSnackbar.title} close`}
          color="inherit"
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      }
    />
  );
};

const mapStateToProps = state => ({ openSnackbars: state.app.openSnackbars });
const mapDispatchToProps = { closeModal };

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(style)(SnackbarPresentation)
);
