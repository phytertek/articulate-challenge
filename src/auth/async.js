export default store => next => async ({ type, data }) => {
  next({ type, data });
  switch (type) {
    default:
      break;
  }
};
