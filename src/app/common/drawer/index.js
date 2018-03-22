import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Drawer from 'material-ui/Drawer';
import { closeModal } from '../../store';

const style = theme => ({
  title: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2
  }
});

const AppDrawer = ({ classes, openDrawers, closeModal }) => {
  const currentDrawer = !!openDrawers.length
    ? openDrawers[0]
    : { element: null, title: '' };

  const closeCurrentDrawer = () => closeModal('drawer', currentDrawer.title);

  return (
    <Drawer
      anchor="right"
      open={!!currentDrawer.element}
      onClose={closeCurrentDrawer}
    >
      {!!currentDrawer.title &&
        !currentDrawer.hideTitle && (
          <Typography
            variant="display1"
            gutterBottom={false}
            className={classes.title}
          >
            {currentDrawer.title}
          </Typography>
        )}
      {!!currentDrawer.element && currentDrawer.element}
    </Drawer>
  );
};
const mapStateToProps = (state, ownProps) => ({
  openDrawers: state.app.openDrawers
});
const mapDispatchToProps = { closeModal };

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(style)(AppDrawer)
);
