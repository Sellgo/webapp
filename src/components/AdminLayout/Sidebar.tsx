import React, { Component, ReactElement } from 'react';
import { Menu, Segment, Sidebar, Grid, Label, Transition } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Auth from '../Auth/Auth';
import LogoutConfirm from '../LogoutConfirm';
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
  { visible: boolean; openConfirm: boolean },
  State
> {
  state = {
    sidebarIcon: [
      { id: 1, label: 'Profit Finder', icon: 'fa-search-dollar', path: '/synthesis' },
      { id: 2, label: 'Product Tracker', icon: 'fa-fingerprint', path: '/product-tracker' },
      { id: 3, label: '', icon: 'fa-angle-right', path: '' },
      { id: 4, label: 'Logout', icon: 'fa-sign-out-alt', path: '#' },
      { id: 5, label: 'Settings', icon: 'fa-user-cog', path: '/settings' },
    ],
    visible: false,
    openConfirm: false,
  };

  handleAnimationChange = () => this.setState(prevState => ({ visible: !prevState.visible }));
  open = () => {
    this.setState({ openConfirm: true });
  };
  openConfirm = (text: boolean) => this.setState({ openConfirm: text });

  render() {
    const { visible } = this.state;
    const { children, auth } = this.props;
    const initPath = window.location.pathname;

    const sidebarMenu = (
      <>
        <Menu.Menu>
          {this.state.sidebarIcon.map(icon => {
            if (icon.id < 3) {
              return (
                <Menu.Item
                  onClick={() => {
                    visible && this.handleAnimationChange();
                  }}
                  key={icon.id}
                  as={Link}
                  to={icon.path}
                  name={icon.icon}
                  active={initPath.startsWith(icon.path)}
                >
                  <i className={`fas ${icon.icon}`} />

                  <Transition duration={200} visible={visible} animation="scale">
                    {<Label> {icon.label} </Label>}
                  </Transition>
                </Menu.Item>
              );
            } else {
              return null;
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
                  onClick={() => {
                    this.handleAnimationChange();
                  }}
                >
                  <i className={`fas ${!visible ? icon.icon : 'fa-angle-left'}`} />
                </Menu.Item>
              );
            } else if (icon.id > 3) {
              return (
                <Menu.Item
                  key={icon.id}
                  as={Link}
                  to={icon.path}
                  name={icon.icon}
                  active={initPath.startsWith(icon.path)}
                  onClick={() => {
                    icon.id === 4 && this.open();
                    icon.id === 5 && visible && this.handleAnimationChange();
                  }}
                >
                  <i className={`fas ${icon.icon}`} />
                  <Transition duration={200} visible={visible} animation="scale">
                    {<Label> {icon.label} </Label>}
                  </Transition>
                </Menu.Item>
              );
            } else {
              return null;
            }
          })}
        </Menu.Menu>
      </>
    );

    return (
      <Grid className="sidebar-container">
        <Sidebar.Pushable className="Sidebar__pushable" as={Segment}>
          <Sidebar
            as={Menu}
            animation="overlay"
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

          <LogoutConfirm auth={auth} open={this.state.openConfirm} openFunc={this.openConfirm} />

          <Sidebar.Pusher
            dimmed={visible}
            onClick={() => {
              visible && this.handleAnimationChange();
            }}
            className={`container Sidebar__pusher ${visible ? '' : 'pusher-scroll-x'}`}
          >
            <Sidebar.Pusher>{children}</Sidebar.Pusher>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Grid>
    );
  }
}
