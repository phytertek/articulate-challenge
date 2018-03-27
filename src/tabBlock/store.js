import mockTabs from './mockData.json';
import __ from 'ramda/src/__';
import evolve from 'ramda/src/evolve';
import has from 'ramda/src/has';
import append from 'ramda/src/append';
import reject from 'ramda/src/reject';
import update from 'ramda/src/update';

const createAction = (type, payload) => ({ type, payload });
const doAction = {};
const definedAction = has(__, doAction);

const initState = { tabs: mockTabs };

export const addTab = tab => createAction('ADD_TAB', tab);
doAction.ADD_TAB = (setState, tab) =>
  setState({ tabs: tabs => append(tab, tabs) });

export const editTab = (tab, index) => createAction('EDIT_TAB', { tab, index });
doAction.EDIT_TAB = (setState, { tab, index }) =>
  setState({
    tabs: tabs => update(index, tab, tabs)
  });

export const removeTab = name => createAction('REMOVE_TAB', name);
doAction.REMOVE_TAB = (setState, name) =>
  setState({ tabs: tabs => reject(tab => tab.name === name, tabs) });

export default (state = initState, { type, payload }) =>
  definedAction(type) ? doAction[type](evolve(__, state), payload) : state;
