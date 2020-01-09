import React, { Component } from 'react';
import { Menu, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setSupplierTableTab } from '../../../actions/Suppliers';
import './index.scss';

class TrackerMenu extends Component {
  handleItemClick = (e: any) => {
    console.log('========', e);
  };

  render() {
    return (
      <div className="menu-bar">
        <Menu
          pointing={true}
          secondary={true}
          style={{ width: 'max-content' }}
          color={'blue'}
          className="flex-col wdt100 menu-item"
        >
          <Menu.Item name="All Groups" onClick={this.handleItemClick} className="wdt100">
            <Header as="h4">All Groups</Header>
          </Menu.Item>
          <Menu.Item name="Ungrouped" onClick={this.handleItemClick} className="wdt100">
            <Header as="h4">Ungrouped</Header>
          </Menu.Item>
          <Menu.Item name="Group 1" onClick={this.handleItemClick} className="wdt100">
            <Header as="h4">Group 1</Header>
          </Menu.Item>
          <Menu.Item name="+" onClick={this.handleItemClick} className="wdt100">
            <Header as="h4">+</Header>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default TrackerMenu;
