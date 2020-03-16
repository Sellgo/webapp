import React, { Component, ReactElement } from 'react';
import { Menu, Segment, Sidebar, Grid, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Auth from '../Auth/Auth';
import './Sidebar.scss';

interface IconD {
  id: number;
  icon: string;
  path: string;
  label: string;
}

interface State {
  sidebarIcon?: IconD[];
  children: ReactElement;
}

export default class SidebarCollapsible extends Component<
  { auth: Auth },
  { visible: boolean },
  State
> {
  state = {
    sidebarIcon: [
      { id: 1, label: 'Profit Finder', icon: 'fa-search-dollar', path: '/synthesis' },
      { id: 2, label: 'Product Tracker', icon: 'fa-fingerprint', path: '/product-tracker' },
      { id: 3, label: '', icon: 'fa-angle-right', path: '' },
      { id: 4, label: 'Logout', icon: 'fa-sign-out-alt', path: '' },
      { id: 5, label: 'Settings', icon: 'fa-user-cog', path: '/settings' },
    ],
    visible: true,
  };

  handleAnimationChange = () => this.setState(prevState => ({ visible: !prevState.visible }));

  render() {
    const { visible } = this.state;
    const { children, auth } = this.props;

    const sidebarMenu = (
      <>
        <Menu.Menu>
          {this.state.sidebarIcon.map(icon => {
            if (icon.id < 3) {
              return (
                <Menu.Item
                  key={icon.id}
                  as={Link}
                  to={icon.path}
                  name={icon.icon}
                  icon="labeled"
                  active={window.location.pathname === icon.path}
                >
                  <i className={`fas ${icon.icon}`} />
                  <Label> {icon.label} </Label>
                </Menu.Item>
              );
            }
          })}
        </Menu.Menu>
        <Menu.Menu className="sidebar-bottom-icon">
          {this.state.sidebarIcon.map(icon => {
            if (icon.id === 3) {
              return (
                <Menu.Item
                  key={icon.id}
                  name={icon.icon}
                  icon="labeled"
                  onClick={e => this.handleAnimationChange()}
                >
                  <i className={`fas ${visible ? icon.icon : 'fa-angle-left'}`} />
                </Menu.Item>
              );
            }
            if (icon.id > 3) {
              return (
                <Menu.Item
                  key={icon.id}
                  as={Link}
                  to={icon.path}
                  name={icon.icon}
                  icon="labeled"
                  active={window.location.pathname === icon.path}
                  onClick={e => {
                    if (icon.id === 4) {
                      auth.logout();
                    }
                  }}
                >
                  <i className={`fas ${icon.icon}`} />
                  <Label> {icon.label} </Label>
                </Menu.Item>
              );
            }
          })}
        </Menu.Menu>
      </>
    );

    return (
      <Grid className="sidebar-container">
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="uncover"
            direction="left"
            icon="labeled"
            inverted
            vertical
            visible={visible}
            className="sidebar-menu"
            borderless={true}
          >
            {sidebarMenu}
          </Sidebar>

          <Sidebar.Pusher className={`container ${visible ? '' : 'pusher-scroll-x'}`}>
            <Sidebar.Pusher>{children}</Sidebar.Pusher>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Grid>
    );
  }
}
