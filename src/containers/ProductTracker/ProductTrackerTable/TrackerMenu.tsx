import React, { Component } from 'react';
import { Menu, Header } from 'semantic-ui-react';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
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
}
class TrackerMenu extends Component<TrackerMenuProps, State> {
  constructor(
    props: any,
    public dispatch: ThunkDispatch<{}, {}, AnyAction>,
    public getState: () => any
  ) {
    super(props);
    this.state = {
      name: '',
    };
  }
  render() {
    const {
      group,
      handleChange,
      handleMenu,
      productTrackID,
      handleSubmit,
      open,
      handleAddGroup,
      handleCreateCancel,
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
          {group &&
            group.map((data: any) => {
              return (
                <Menu.Item
                  name={data.name}
                  active={data.id === productTrackID ? true : false}
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
        />
      </div>
    );
  }
}
export default TrackerMenu;
