export default store => next => async ({ type, payload }) => {
  next({ type, payload });
};
