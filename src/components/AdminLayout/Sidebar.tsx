import React, { Component, ReactElement } from 'react';
import { connect } from 'react-redux';
import { Menu, Segment, Sidebar, Grid, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { notifyIdSelector } from '../../selectors/UserOnboarding';
import SidebarPusher from './SidebarPusher';
import './Sidebar.scss';
import { getLatestSupplier } from '../../actions/Suppliers';
import get from 'lodash/get';

import { LogoWithoutText } from '../Logo/index';

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
    currentNotifyId: number;
    subscriptionPlan: any;
  },
  { visible: boolean; openConfirm: boolean },
  State
> {
  state = {
    sidebarIcon: [
      {
        id: 1,
        label: 'Search Management',
        icon: 'fas fa-clipboard-list',
        path: '/synthesis',
        notifyId: 1,
      },
      {
        id: 2,
        label: 'Profit Finder',
        icon: 'fas fa-search-dollar',
        path: '/profit-finder',
        notifyId: 1,
      },
      {
        id: 3,
        label: 'Product Tracker',
        icon: 'fas fa-fingerprint',
        path: '/product-tracker',
        notifyId: 2,
      },
      {
        id: 4,
        label: 'Leads Tracker',
        icon: 'fas fa-user-ninja',
        path: '/leads-tracker',
        notifyId: 2,
      },
      { id: 5, label: 'Settings', icon: 'fas fa-cog', path: '/settings', notifyId: 4 },
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

  render() {
    const { visible, sidebarIcon } = this.state;
    const { children, currentNotifyId } = this.props;
    let supplier_id = '';
    const latest = getLatestSupplier();
    if (latest) {
      supplier_id = latest.supplier_id;
    }
    const currentPath = window.location.pathname;
    const links = sidebarIcon.map((link: any) =>
      link.id === 2 ? `${link.path}/${supplier_id}` : link.path
    );
    const sidebarMenu = (
      <>
        <Link to="/" className="sidebar-menu__logo">
          <LogoWithoutText />
        </Link>
        <Menu.Menu>
          {this.state.sidebarIcon.map(icon => {
            if (icon.id < 5) {
              return (
                <Menu.Item
                  onClick={() => {
                    visible && this.handleAnimationChange();
                  }}
                  as={icon.id === 2 && !supplier_id ? 'div' : Link}
                  disabled={!!(icon.id === 2 && !supplier_id)}
                  to={icon.id === 2 && !!supplier_id ? `${icon.path}/${supplier_id}` : icon.path}
                  name={icon.icon}
                  active={links[icon.id - 1] === currentPath}
                  className={'sidebar-menu__items'}
                  key={icon.id}
                >
                  <i
                    className={`fas ${icon.icon} ${currentNotifyId === icon.notifyId &&
                      'forward'} ${icon.id === 2 && !supplier_id ? 'disabled-link' : ''}`}
                  />

                  <Label> {icon.label} </Label>
                </Menu.Item>
              );
            } else {
              return null;
            }
          })}
        </Menu.Menu>
        <Menu.Menu className="sidebar-bottom-icon">
          {this.state.sidebarIcon.map(icon => {
            if (icon.id > 4) {
              return (
                <Menu.Item
                  key={icon.id}
                  as={Link}
                  to={icon.path}
                  name={icon.icon}
                  active={links[icon.id - 1] === currentPath}
                  className={'sidebar-menu__items'}
                >
                  <i
                    className={`fas ${icon.icon} ${currentNotifyId === icon.notifyId &&
                      'forward'} `}
                  />
                  <Label> {icon.label} </Label>
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
            <Grid className={`${currentNotifyId > 0 && 'Sidebar__pushable custom-dimmer'}`} />
            {sidebarMenu}
          </Sidebar>

          <SidebarPusher
            dimmed={currentNotifyId > 0 ? true : false}
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
  subscriptionPlan: get(state, 'subscription.plan'),
});

export default connect(mapStateToProps)(SidebarCollapsible);
