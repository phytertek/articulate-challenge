import concat from 'ramda/src/concat';
import merge from 'ramda/src/merge';

const initState = {
  openDialogs: [],
  openDrawers: [],
  openSnackbars: [],
  currentForm: []
};

const getQueueName = queue =>
  `open${queue.charAt(0).toUpperCase()}${queue.slice(1)}s`;

const removeFromQueue = (state, { queue, title }) => {
  const queueName = getQueueName(queue);
  const remainingInQueue = !!title
    ? state[queueName].filter(item => item.title !== title)
    : state[queueName].slice(0, state[queueName].length - 1);
  return { ...state, [queueName]: remainingInQueue };
};
const addToQueue = (state, { queue, item }) => {
  const queueName = getQueueName(queue);
  return {
    ...state,
    [queueName]: [item, ...state[queueName]]
  };
};
const OPEN_MODAL = 'OPEN_MODAL';
export const openModal = (queue, item) => ({
  type: OPEN_MODAL,
  payload: { queue, item }
});

const CLOSE_MODAL = 'CLOSE_MODAL';
export const closeModal = (queue, title) => ({
  type: CLOSE_MODAL,
  payload: { queue, title }
});

const ADD_FIELDS_TO_CURRENT_FORM = 'ADD_FIELDS_TO_CURRENT_FORM';
export const addFieldsToCurrentForm = fields => ({
  type: ADD_FIELDS_TO_CURRENT_FORM,
  payload: fields
});
const addFieldsToCurrentFormState = (state, fields) =>
  merge(state, { currentForm: concat(state.currentForm, fields) });

const REMOVE_FIELDS_FROM_CURRENT_FORM = 'REMOVE_FIELDS_FROM_CURRENT_FORM';
export const removeFieldsFromCurrentForm = fields => ({
  type: REMOVE_FIELDS_FROM_CURRENT_FORM,
  payoad: fields
});
const removeFieldsFromCurrentFormState = (state, fields) => {
  const removeFieldsList = fields.map(field => field.name);
  const nextForm = state.currentForm.filter(
    field => !removeFieldsList.includes(field.name)
  );
  return merge(state, { currentForm: nextForm });
};

const UPDATE_FIELDS_IN_CURRENT_FORM = 'UPDATE_FIELDS_IN_CURRENT_FORM';
export const updateFieldsInCurrentForm = fields => ({
  type: UPDATE_FIELDS_IN_CURRENT_FORM,
  payload: fields
});
const updateFieldsInCurrentFormState = (state, fields) => {
  const updatedFieldsList = fields.map(field => field.name);
  const nextForm = concat(
    state.currentForm.filter(field => !updatedFieldsList.includes(field.name)),
    fields
  );
  return merge(state, { currentForm: nextForm });
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case OPEN_MODAL:
      return addToQueue(state, payload);
    case CLOSE_MODAL:
      return removeFromQueue(state, payload);
    case ADD_FIELDS_TO_CURRENT_FORM:
      return addFieldsToCurrentFormState(state, payload);
    case REMOVE_FIELDS_FROM_CURRENT_FORM:
      return removeFieldsFromCurrentFormState(state, payload);
    case UPDATE_FIELDS_IN_CURRENT_FORM:
      return updateFieldsInCurrentFormState(state, payload);
    default:
      return state;
  }
};
