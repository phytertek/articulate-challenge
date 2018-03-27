export default theme => {
  const spacing = theme.spacing.unit * 3;
  const topBottomSpace = spacing / 2;
  return {
    appBar: { paddingTop: topBottomSpace, paddingBottom: topBottomSpace },
    paper: {
      backgroundColor: theme.palette.background.paper,
      flexGrow: 1,
      marginTop: spacing
    },
    textContent: { padding: spacing },
    textLine: { padding: theme.spacing.unit / 3 },
    imageContainer: {
      height: 380,
      position: 'relative'
      // marginBottom: spacing
    },
    image: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'scale-down',
      cursor: 'zoom-in'
    },
    modalImage: {
      height: '100%',
      width: '100%',
      objectFit: 'scale-down',
      cursor: 'zoom-out'
    }
  };
};
