import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../app/store';
import TabBlockPresentation from './presentation';

class TabBlock extends Component {
  state = { value: 0 };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  componentWillUpdate(nextProps) {
    if (this.props.tabs.length > nextProps.tabs.length)
      this.setState({ value: 0 });
  }
  render() {
    return (
      <TabBlockPresentation
        handleChange={this.handleChange}
        handleChangeIndex={this.handleChangeIndex}
        value={this.state.value}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  tabs: state.tabBlock.tabs
});

const mapDispatchToProps = {
  openModal,
  closeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(TabBlock);
