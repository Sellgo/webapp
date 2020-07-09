import React, { Component, ReactElement } from 'react';
import { connect } from 'react-redux';
import { Menu, Segment, Sidebar, Grid, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { notifyIdSelector } from '../../selectors/UserOnboarding';
import Auth from '../Auth/Auth';
import LogoutConfirm from '../LogoutConfirm';
import Tour from '../QuickTourMessage';
import SidebarPusher from './SidebarPusher';
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

class SidebarCollapsible extends Component<
  {
    auth: Auth;
    currentNotifyId: number;
  },
  { visible: boolean; openConfirm: boolean },
  State
> {
  state = {
    sidebarIcon: [
      {
        id: 1,
        label: 'Profit Finder',
        icon: 'fas fa-search-dollar',
        path: '/synthesis',
        notifyId: 1,
      },
      {
        id: 2,
        label: 'Product Tracker',
        icon: 'fas fa-fingerprint',
        path: '/product-tracker',
        notifyId: 2,
      },
      { id: 3, label: '', icon: 'fas fa-angle-right', path: '', notifyId: 6 },
      { id: 4, label: 'Logout', icon: 'fas fa-sign-out-alt', path: '#', notifyId: 5 },
      { id: 5, label: 'Settings', icon: 'fas fa-user-cog', path: '/settings', notifyId: 4 },
      {
        id: 6,
        label: 'Onboarding',
        icon: 'far fa-question-circle',
        path: '/onboarding',
        notifyId: 3,
      },
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
    const { children, auth, currentNotifyId } = this.props;
    const initPath = window.location.pathname;

    const sidebarMenu = (
      <>
        <Menu.Menu>
          {this.state.sidebarIcon.map(icon => {
            if (icon.id < 3) {
              return (
                <Tour
                  data={icon}
                  key={icon.id}
                  child={
                    <Menu.Item
                      onClick={() => {
                        visible && this.handleAnimationChange();
                      }}
                      as={Link}
                      to={icon.path}
                      name={icon.icon}
                      active={initPath.startsWith(icon.path)}
                    >
                      <i
                        className={`fas ${icon.icon} ${currentNotifyId === icon.notifyId &&
                          'forward'}`}
                      />

                      <Label> {icon.label} </Label>
                    </Menu.Item>
                  }
                />
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
                <Tour
                  data={icon}
                  key={icon.id}
                  child={
                    <Menu.Item
                      key={icon.id}
                      name={icon.icon}
                      onClick={() => {
                        this.handleAnimationChange();
                      }}
                    >
                      <i
                        className={`fas ${
                          !visible ? icon.icon : 'fa-angle-left'
                        } ${currentNotifyId === icon.notifyId && 'forward'}`}
                      />
                    </Menu.Item>
                  }
                />
              );
            } else if (icon.id > 3) {
              return (
                <Tour
                  data={icon}
                  key={icon.id}
                  child={
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
                      <i
                        className={`fas ${icon.icon} ${currentNotifyId === icon.notifyId &&
                          'forward'}`}
                      />
                      <Label> {icon.label} </Label>
                    </Menu.Item>
                  }
                />
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
            <Grid className={`${currentNotifyId > 0 && 'Sidebar__pushable custom-dimmer'}`} />
            {sidebarMenu}
          </Sidebar>

          <LogoutConfirm auth={auth} open={this.state.openConfirm} openFunc={this.openConfirm} />

          <SidebarPusher
            dimmed={currentNotifyId > 0 ? true : visible}
            handleAnimationChange={this.handleAnimationChange}
            visible={visible}
          >
            {children}
          </SidebarPusher>
        </Sidebar.Pushable>
      </Grid>
    );
  }
}

const mapStateToProps = (state: any) => ({
  currentNotifyId: notifyIdSelector(state),
});

export default connect(mapStateToProps)(SidebarCollapsible);
