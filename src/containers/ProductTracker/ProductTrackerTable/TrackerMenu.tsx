import React, { Component } from 'react';
import { Menu, Header } from 'semantic-ui-react';
import get from 'lodash/get';
import { connect } from 'react-redux';
import './index.scss';
import CreateGroup from './CreateGroup';

interface State {
  name: string;
}
interface TrackerMenuProps {
  group: any;
  handleSubmit: any;
  handleChange: any;
  handleMenu: any;
  productTrackID: any;
  handleCreateCancel: any;
  handleAddGroup: any;
  open: any;
  setMenu: any;
  error: boolean;
}

class TrackerMenu extends Component<TrackerMenuProps> {
  render() {
    const {
      group,
      handleChange,
      handleMenu,
      handleSubmit,
      open,
      handleAddGroup,
      handleCreateCancel,
      error,
    } = this.props;

    return (
      <div className="menu-bar">
        <Menu
          pointing={true}
          stackable={true}
          secondary={true}
          style={{ width: 'max-content' }}
          color={'blue'}
          className="wdt100"
        >
          <Menu.Item
            name={'All Groups'}
            active={this.props.setMenu === null ? true : false}
            onClick={(id: any) => handleMenu(null)}
          >
            <Header as="h4">{'All Groups'}</Header>
          </Menu.Item>
          {group &&
            group.map((data: any) => {
              return (
                <Menu.Item
                  name={data.name}
                  active={data.id === this.props.setMenu ? true : false}
                  onClick={(id: any) => handleMenu(data.id)}
                >
                  <Header as="h4">{data.name}</Header>
                </Menu.Item>
              );
            })}
          <Menu.Item name="+" onClick={handleAddGroup}>
            <Header as="h4">+</Header>
          </Menu.Item>
        </Menu>
        <CreateGroup
          open={open}
          handleGroupChange={(e: any) => handleChange(e)}
          handleCancel={handleCreateCancel}
          handleSubmit={handleSubmit}
          error={error}
        />
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    setMenu: get(state, 'productTracker.menuItem'),
  };
};

export default connect(mapStateToProps)(TrackerMenu);
