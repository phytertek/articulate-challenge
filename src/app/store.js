import __ from 'ramda/src/__';
import evolve from 'ramda/src/evolve';
import contains from 'ramda/src/contains';
import reject from 'ramda/src/reject';
import has from 'ramda/src/has';
import concat from 'ramda/src/concat';
import prepend from 'ramda/src/prepend';
import dropLast from 'ramda/src/dropLast';
import map from 'ramda/src/map';

const createAction = (type, payload) => ({ type, payload });
const doAction = {};
const definedAction = has(__, doAction);

const initState = {
  openDialogs: [],
  currentForm: []
};

const name = queue => `open${queue.charAt(0).toUpperCase()}${queue.slice(1)}s`;

export const openModal = (queue, item) =>
  createAction('OPEN_MODAL', { queue, item });
doAction.OPEN_MODAL = (setState, { queue, item }) => {
  const queueName = name(queue);
  return setState({ [queueName]: v => prepend(item, v) });
};

export const closeModal = (queue, title) =>
  createAction('CLOSE_MODAL', { queue, title });
doAction.CLOSE_MODAL = (setState, { queue, title }) => {
  const queueName = name(queue);
  return setState({
    [queueName]: v =>
      title ? reject(i => i.title === title, v) : dropLast(1, v)
  });
};

export const addFieldsToForm = fields =>
  createAction('ADD_FIELDS_TO_FORM', fields);
doAction.ADD_FIELDS_TO_FORM = (setState, fields) =>
  setState({ currentForm: v => concat(v, fields) });

export const removeFieldsFromForm = fields =>
  createAction('REMOVE_FIELDS_FROM_FORM', fields);
doAction.REMOVE_FIELDS_FROM_FORM = (setState, fields) =>
  setState({
    currentForm: v => {
      const removedFields = map(f => f.name, fields);
      return reject(f => contains(f.name, removedFields), v);
    }
  });

export const updateFieldsInForm = fields =>
  createAction('UPDATE_FIELDS_IN_FORM', fields);
doAction.UPDATE_FIELDS_IN_FORM = (setState, fields) =>
  setState({
    currentForm: v => {
      const updatedFields = map(f => f.name, fields);
      const otherFields = reject(f => contains(f.name, updatedFields));
      return concat(otherFields, fields);
    }
  });

export default (state = initState, { type, payload }) =>
  definedAction(type) ? doAction[type](evolve(__, state), payload) : state;
