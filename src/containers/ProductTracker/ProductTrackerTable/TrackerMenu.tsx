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
  activeGroupId: any;
  error: boolean;
  groupError: boolean;
}

class TrackerMenu extends Component<TrackerMenuProps> {
  render() {
    const {
      groups,
      handleMenu,
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
    const activeGroup =
      this.props.groups && this.props.activeGroupId
        ? this.props.groups.find((data: any) => data.id === this.props.activeGroupId)
        : null;

    return (
      <div className="menu-bar">
        <Menu pointing stackable secondary color={'blue'} className="wdt100">
          <Menu.Item
            style={{ paddingBottom: '17px' }}
            name={'All Groups'}
            active={this.props.activeGroupId === null ? true : false}
            onClick={(id: any) => {
              if (this.props.activeGroupId !== null) handleMenu(null);
            }}
          >
            <Header as="h4">{'All Groups'}</Header>
          </Menu.Item>
          <Menu
            pointing
            stackable
            secondary
            style={{ width: 'max-content' }}
            color={'blue'}
            className="wdt100 menu-bar-inner"
          >
            <Menu.Item
              name={'Ungrouped'}
              active={this.props.activeGroupId === -1 ? true : false}
              onClick={(id: any) => {
                if (this.props.activeGroupId !== -1) handleMenu(-1);
              }}
            >
              <Header as="h4">{'Ungrouped'}</Header>
            </Menu.Item>
            {groups &&
              groups
                .slice()
                .sort((group: any, other: any) => (group.id > other.id ? 1 : -1))
                .map((data: any) => {
                  const isActiveGroup = data.id === this.props.activeGroupId;
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
                      <Header as="h4" style={{ margin: '0' }}>
                        {data.name}
                      </Header>
                      {isActiveGroup && (
                        <div style={{ padding: '5px' }}>
                          <Icon name="pencil" link onClick={() => handleEditGroup(data)} />
                          <Icon name="trash alternate" link onClick={handleDeleteGroup} />
                        </div>
                      )}
                    </Menu.Item>
                  );
                })}
          </Menu>
          <Menu.Item style={{ paddingBottom: '17px' }} name="+" onClick={handleAddGroup}>
            <Icon name="plus" />
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
          activeGroup={activeGroup}
          handleCancel={handleEditGroupCancel}
          handleSubmit={handleEditGroupSubmit}
        />
        <DeleteGroupModal
          open={deleteGroup}
          groupId={this.props.activeGroupId}
          handleCancel={handleDeleteGroupCancel}
          handleSubmit={handleDeleteGroupSubmit}
        />
        {/* Magic to make scrollbar disappear */}
        <div className="cover-bar"></div>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    activeGroupId: get(state, 'productTracker.menuItem'),
  };
};

export default connect(mapStateToProps)(TrackerMenu);
