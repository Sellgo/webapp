import React, { Component } from 'react';
import { Menu, Header } from 'semantic-ui-react';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import './index.scss';
import CreateGroup from './CreateGroup';

interface State {
  name: string;
  open: boolean;
}
interface TrackerMenuProps {
  group: any;
  // handleSubmit:any;
  handleChange: any;
  handleMenu: any;
  productTrackID: any;
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
      open: false,
    };
  }

  handleItemClick = (e: any) => {
    this.setState({
      open: true,
    });
  };
  handleCancel = () => {
    this.setState({
      open: false,
    });
  };
  render() {
    const { group, handleChange, handleMenu, productTrackID } = this.props;

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
          <Menu.Item name="+" onClick={this.handleItemClick}>
            <Header as="h4">+</Header>
          </Menu.Item>
        </Menu>
        <CreateGroup
          open={this.state.open}
          handleGroupChange={(e: any) => handleChange(e)}
          handleCancel={this.handleCancel}
          // handleSubmit={handleSubmit}
        />
      </div>
    );
  }
}
export default TrackerMenu;
