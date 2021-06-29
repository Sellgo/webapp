import React, { Component } from 'react';
import { Menu, Header, Icon } from 'semantic-ui-react';
import get from 'lodash/get';
import { connect } from 'react-redux';
import './index.scss';
import CreateGroup from './CreateGroup';
import EditGroupModal from './EditGroupModal';
import DeleteGroupModal from './DeleteGroupModal';
import GroupBadgeCount from './GroupBadgeCount';

interface SellerGroupsProps {
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
  items: any;
  editError: boolean;
  filteredProducts: any;
  handleMoveGroup: any;
  handleKeepTracking: any;
}

class SellerGroups extends Component<SellerGroupsProps> {
  render() {
    const {
      groups,
      handleMenu,
      open,
      editGroup,
      deleteGroup,
      handleAddGroup,
      error,
      items = [],
      handleAddGroupCancel,
      handleAddGroupSubmit,
      handleAddGroupNameChange,
      handleEditGroup,
      handleEditGroupCancel,
      handleEditGroupSubmit,
      handleDeleteGroup,
      editError,
      filteredProducts,
      handleKeepTracking,
      handleDeleteGroupSubmit,
    } = this.props;

    const activeGroup =
      this.props.groups && this.props.activeGroupId
        ? this.props.groups.find((data: any) => data.id === this.props.activeGroupId)
        : null;

    const allGroupsCount = items.length;
    const unGroupedCount =
      items && items.length > 0
        ? items.filter((data: any) => data.merchant_group === null).length
        : 0;

    return (
      <div className="sf-menu-bar">
        <Menu pointing={true} stackable={true} secondary={true} color={'grey'} className="wdt100">
          <Menu.Item
            style={{ paddingBottom: '14px' }}
            name={'All Groups'}
            active={this.props.activeGroupId === null ? true : false}
            onClick={() => {
              if (this.props.activeGroupId !== null) {
                handleMenu(null);
              }
            }}
          >
            <Header as="h4">
              {'All Groups'}
              <GroupBadgeCount count={allGroupsCount} />
            </Header>
          </Menu.Item>

          <Menu.Item
            name={'Ungrouped'}
            active={this.props.activeGroupId === -1 ? true : false}
            onClick={() => {
              if (this.props.activeGroupId !== -1) {
                handleMenu(-1);
              }
            }}
          >
            <Header as="h4">
              {'Ungrouped'}
              <GroupBadgeCount count={unGroupedCount} />
            </Header>
          </Menu.Item>
          {groups &&
            groups
              .slice()
              .sort((group: any, other: any) => (group.id > other.id ? 1 : -1))
              .map((data: any) => {
                const isActiveGroup = data.id === this.props.activeGroupId;
                const groupBadgeCount = items.filter((d: any) => d.merchant_group === data.id)
                  .length;

                return (
                  <Menu.Item
                    name={data.name}
                    key={data.id}
                    active={isActiveGroup ? true : false}
                    onClick={() => {
                      if (!isActiveGroup) {
                        handleMenu(data.id);
                      }
                    }}
                    verticalalign="middle"
                  >
                    <Header as="h4" style={{ margin: '0', color: '16px !important' }}>
                      {data.name}
                      <GroupBadgeCount count={groupBadgeCount} />
                    </Header>
                    {isActiveGroup && (
                      <div style={{ padding: '5px' }}>
                        <Icon name="pencil" link={true} onClick={() => handleEditGroup(data)} />
                        <Icon
                          name="trash alternate"
                          link={true}
                          onClick={() => {
                            filteredProducts.length > 0
                              ? handleDeleteGroup()
                              : handleDeleteGroupSubmit(this.props.activeGroupId);
                          }}
                        />
                      </div>
                    )}
                  </Menu.Item>
                );
              })}
          <Menu.Item name="+" onClick={handleAddGroup}>
            <Icon name="plus" />
          </Menu.Item>
        </Menu>
        <CreateGroup
          open={open}
          error={error}
          handleGroupChange={(e: any) => handleAddGroupNameChange(e)}
          handleCancel={handleAddGroupCancel}
          handleSubmit={handleAddGroupSubmit}
        />
        <EditGroupModal
          open={editGroup}
          activeGroup={activeGroup}
          handleCancel={handleEditGroupCancel}
          handleSubmit={handleEditGroupSubmit}
          error={editError}
        />
        <DeleteGroupModal
          open={deleteGroup}
          groupId={this.props.activeGroupId}
          handleUntrack={handleDeleteGroupSubmit}
          activeGroup={activeGroup}
          handleKeepTracking={handleKeepTracking}
        />
        {/* Magic to make scrollbar disappear */}
        <div className="cover-bar" />
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    activeGroupId: get(state, 'sellerFinder.sellerMenuItem'),
  };
};

export default connect(mapStateToProps)(SellerGroups);
