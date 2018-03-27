import React, { Component } from 'react';
import find from 'ramda/src/find';
import map from 'ramda/src/map';
import clone from 'ramda/src/clone';
import propEq from 'ramda/src/propEq';
import { connect } from 'react-redux';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Form from '../app/common/form';
import { REQUIRED } from '../app/common/validation';
import { addTab, editTab, removeTab } from '../tabBlock/store';

const formFields = [
  {
    label: 'Tab Name',
    name: 'name',
    type: 'text',
    value: '',
    validate: [REQUIRED],
    fullWidth: true
  },
  {
    label: 'Tab Text Content',
    name: 'textContent',
    type: 'text',
    value: '',
    multiline: true,
    fullWidth: true
  },
  {
    label: 'Tab Image Content',
    name: 'imageContent',
    type: 'url',
    value: '',
    fullWidth: true
  }
];

const initState = {
  tabSelected: false,
  tabIndex: null,
  tabFields: clone(formFields)
};

class TabBlockControl extends Component {
  state = clone(initState);

  selectTab = (t, i) => {
    const tabFields = map(f => {
      f.value = t[f.name];
      return f;
    }, clone(formFields));
    this.setState(() => ({
      tabSelected: true,
      tabIndex: i,
      tabFields
    }));
  };

  clearState = () => this.setState(() => clone(initState));

  submitAction = fields => {
    const fieldData = fields.reduce((fd, f) => {
      fd[f.name] = f.value;
      return fd;
    }, {});
    if (this.state.tabSelected)
      this.props.editTab(fieldData, this.state.tabIndex);
    else this.props.addTab(fieldData);
    this.clearState();
  };

  removeAction = fields => {
    const name = find(propEq('label', 'Tab Name'), fields).value;
    this.clearState();
    this.props.removeTab(name);
  };

  render() {
    const formOptions = {
      validate: true,
      title: `${this.state.tabSelected ? 'Update' : 'Add'} a Tab`,
      submit: {
        label: this.state.tabSelected ? 'Update' : 'Add',
        action: this.submitAction
      },
      secondaryActions: this.state.tabSelected && [
        { label: 'Remove', action: this.removeAction },
        { label: 'Cancel', action: this.clearState }
      ]
    };
    return (
      <div>
        <List component="nav">
          {this.props.tabs.map((tab, index) => (
            <div key={tab.name}>
              <ListItem button onClick={() => this.selectTab(tab, index)}>
                <ListItemText primary={tab.name} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
        <Form fields={this.state.tabFields} {...formOptions} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tabs: state.tabBlock.tabs
});

const mapDispatchToProps = { addTab, editTab, removeTab };

export default connect(mapStateToProps, mapDispatchToProps)(TabBlockControl);
