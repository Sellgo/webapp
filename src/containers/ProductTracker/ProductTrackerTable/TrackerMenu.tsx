import React, { Component } from 'react';
import { Menu, Header, Icon } from 'semantic-ui-react';
import get from 'lodash/get';
import { connect } from 'react-redux';
import './index.scss';
import CreateGroup from './CreateGroup';
import EditGroupModal from './EditGroupModal';
import DeleteGroupModal from './DeleteGroupModal';

interface State {
  name: string;
}
interface TrackerMenuProps {
  groups: any;
  handleMenu: any;
  productTrackID: any;
  handleAddGroup: any;
  handleAddGroupSubmit: any;
  handleAddGroupCancel: any;
  handleAddGroupNameChange: any;
  handleEditGroup: any;
  handleEditGroupSubmit: any;
  handleEditGroupCancel: any;
  handleDeleteGroup: any;
  handleDeleteGroupSubmit: any;
  handleDeleteGroupCancel: any;
  open: any;
  editGroup: any;
  deleteGroup: any;
  setMenu: any;
  error: boolean;
  groupError: boolean;
}

class TrackerMenu extends Component<TrackerMenuProps> {
  state = {
    activeGroup:
      this.props.groups && this.props.groups.find((data: any) => data.id === this.props.setMenu),
  };

  render() {
    const {
      groups,
      handleMenu,
      productTrackID,
      open,
      editGroup,
      deleteGroup,
      handleAddGroup,
      error,
      groupError,
      handleAddGroupCancel,
      handleAddGroupSubmit,
      handleAddGroupNameChange,
      handleEditGroup,
      handleEditGroupCancel,
      handleEditGroupSubmit,
      handleDeleteGroup,
      handleDeleteGroupCancel,
      handleDeleteGroupSubmit,
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
          {/* TODO: add Ungrouped */}
          {groups &&
            groups.map((data: any) => {
              const isActiveGroup = data.id === this.props.setMenu;
              return (
                <Menu.Item
                  name={data.name}
                  key={data.id}
                  active={isActiveGroup ? true : false}
                  onClick={(id: any) => {
                    if (!isActiveGroup) handleMenu(data.id);
                  }}
                  verticalalign="middle"
                >
                  {data.name}
                  {isActiveGroup && (
                    <div style={{ padding: '5px' }}>
                      <Icon name="pencil" link onClick={() => handleEditGroup(data.name)} />
                      <Icon name="trash alternate" link onClick={handleDeleteGroup} />
                    </div>
                  )}
                </Menu.Item>
              );
            })}
          <Menu.Item name="+" onClick={handleAddGroup}>
            <Header as="h4">+</Header>
          </Menu.Item>
        </Menu>
        <CreateGroup
          open={open}
          error={error}
          groupError={groupError}
          handleGroupChange={(e: any) => handleAddGroupNameChange(e)}
          handleCancel={handleAddGroupCancel}
          handleSubmit={handleAddGroupSubmit}
        />
        <EditGroupModal
          open={editGroup}
          activeGroup={this.state.activeGroup}
          handleCancel={handleEditGroupCancel}
          handleSubmit={handleEditGroupSubmit}
        />
        <DeleteGroupModal
          open={deleteGroup}
          groupId={this.props.setMenu}
          handleCancel={handleDeleteGroupCancel}
          handleSubmit={handleDeleteGroupSubmit}
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
