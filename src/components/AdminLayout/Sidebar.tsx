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
import { getLatestSupplier } from '../../actions/Suppliers';

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
  { visible: boolean; openConfirm: boolean; active: number },
  State
> {
  state = {
    sidebarIcon: [
      {
        id: 1,
        label: 'Search Management',
        icon: 'fas fa-clipboard-list',
        path: '/synthesis/',
        notifyId: 1,
      },
      {
        id: 2,
        label: 'Search Management',
        icon: 'fas fa-search-dollar',
        path: '/synthesis',
        notifyId: 1,
      },
      {
        id: 3,
        label: 'Product Tracker',
        icon: 'fas fa-fingerprint',
        path: '/product-tracker',
        notifyId: 2,
      },

      { id: 4, label: '', icon: 'fas fa-angle-right', path: '', notifyId: 6 },
      { id: 5, label: 'Logout', icon: 'fas fa-sign-out-alt', path: '#', notifyId: 5 },
      { id: 6, label: 'Settings', icon: 'fas fa-user-cog', path: '/settings', notifyId: 4 },
      {
        id: 7,
        label: 'Onboarding',
        icon: 'far fa-question-circle',
        path: '/onboarding',
        notifyId: 3,
      },
    ],
    visible: false,
    openConfirm: false,
    active: 1,
  };

  handleAnimationChange = () => this.setState(prevState => ({ visible: !prevState.visible }));
  open = () => {
    this.setState({ openConfirm: true });
  };
  openConfirm = (text: boolean) => this.setState({ openConfirm: text });
  setActiveLink = (id: number) => this.setState({ active: id });

  render() {
    const { visible } = this.state;
    const { children, auth, currentNotifyId } = this.props;
    const initPath = window.location.pathname;
    let supplier_id = '';
    const latest = getLatestSupplier();
    if (latest) {
      supplier_id = latest.supplier_id;
    }

    const sidebarMenu = (
      <>
        <Menu.Menu>
          {this.state.sidebarIcon.map(icon => {
            if (icon.id <= 3) {
              return (
                <Tour
                  data={icon}
                  key={icon.id}
                  child={
                    <Menu.Item
                      onClick={() => {
                        visible && this.handleAnimationChange();
                        this.setActiveLink(icon.id);
                      }}
                      as={Link}
                      disabled={!!(icon.id === 1 && !supplier_id)}
                      to={icon.id === 1 && !!supplier_id ? `${icon.path}${supplier_id}` : icon.path}
                      name={icon.icon}
                      active={icon.id === this.state.active}
                    >
                      <i
                        className={`fas ${icon.icon} ${currentNotifyId === icon.notifyId &&
                          'forward'} ${icon.id === 1 && !supplier_id ? 'disabled-link' : ''}`}
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
            if (icon.id === 4) {
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
                        icon.id === 5 && this.open();
                        icon.id === 6 && visible && this.handleAnimationChange();
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
