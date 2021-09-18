import React, { Component, ReactElement } from 'react';
import { connect } from 'react-redux';
import { Menu, Segment, Sidebar, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { notifyIdSelector } from '../../selectors/UserOnboarding';
import SidebarPusher from './SidebarPusher';
import './Sidebar.scss';
import { getLatestSupplier } from '../../actions/Suppliers';
import get from 'lodash/get';

import sellerMapIcon from '../../assets/images/sellerMapIcon.svg';
import sellerFinderIcon from '../../assets/images/sellerFinder.svg';

import BetaLabel from '../BetaLabel';
import { isBetaAccount, isSubscriptionIdFreeAccount } from '../../utils/subscriptions';
import { getSellerSubscription } from '../../selectors/Subscription';
import { SellerSubscription } from '../../interfaces/Seller';

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
    subscriptionType: string;
    sellerSubscription: SellerSubscription;
  },
  { visible: boolean; openConfirm: boolean },
  State
> {
  state = {
    sidebarIcon: [
      {
        id: 2,
        label: 'Search Management',
        icon: 'fas fa-clipboard-list',
        path: '/synthesis',
        notifyId: 1,
        imageType: false,
        tooltip: '',
      },
      {
        id: 3,
        label: 'Profit Finder',
        icon: 'fas fa-search-dollar',
        path: '/profit-finder',
        notifyId: 1,
        imageType: false,
        tooltip: '',
      },
      {
        id: 4,
        label: 'Product Tracker',
        icon: 'fas fa-fingerprint',
        path: '/product-tracker',
        notifyId: 2,
        imageType: false,
        tooltip: '',
      },
      {
        id: 5,
        label: 'Leads Tracker',
        icon: 'fas fa-user-ninja',
        path: '/leads-tracker',
        notifyId: 2,
        imageType: false,
        tooltip: '',
      },
      {
        id: 6,
        label: 'Seller Research',
        icon: sellerMapIcon,
        path: '/seller-research',
        notifyId: 4,
        imageType: true,
        isBeta: false,
        tooltip: '',
      },
      {
        id: 7,
        label: 'Seller Finder',
        icon: sellerFinderIcon,
        path: '/seller-finder',
        notifyId: 4,
        imageType: true,
        isBeta: false,
        tooltip: '',
      },
      {
        id: 9,
        label: 'Settings',
        icon: 'fas fa-cog',
        path: '/settings',
        notifyId: 4,
        tooltip: '',
      },
    ],
    visible: false,
    openConfirm: false,
  };

  handleAnimationChange = () => this.setState(prevState => ({ visible: !prevState.visible }));

  render() {
    const { visible, sidebarIcon } = this.state;
    const { children, currentNotifyId, sellerSubscription } = this.props;

    const upperNavbar = this.state.sidebarIcon.filter(icon => icon.id < 9);
    const lowerNavbar = this.state.sidebarIcon.filter(icon => icon.id >= 9);

    let supplier_id = '';

    const latest = getLatestSupplier();
    if (latest) {
      supplier_id = latest.supplier_id;
    }

    const currentPath = window.location.pathname;
    const links = sidebarIcon.map((link: any) =>
      link.id === 3 ? `${link.path}/${supplier_id}` : link.path
    );

    const isFreeeAccount = isSubscriptionIdFreeAccount(sellerSubscription.subscription_id);
    const isBetaUser = isBetaAccount(sellerSubscription);

    const sidebarMenu = (
      <>
        {/* Upper portion of sidebar */}
        <Menu.Menu>
          {upperNavbar.map(icon => {
            return (
              <Menu.Item
                onClick={() => {
                  visible && this.handleAnimationChange();
                }}
                as={isFreeeAccount || (icon.id === 3 && !supplier_id) ? 'div' : Link}
                disabled={isFreeeAccount || !!(icon.id === 3 && !supplier_id)}
                to={icon.id === 3 && !!supplier_id ? `${icon.path}/${supplier_id}` : icon.path}
                name={icon.icon}
                active={links[icon.id - 1] === currentPath}
                className={'sidebar-menu__items'}
                key={icon.id}
              >
                {icon.imageType ? (
                  <>
                    <img src={icon.icon} alt="Icons" data-disabled={isFreeeAccount} />
                    {icon.isBeta && <BetaLabel />}
                  </>
                ) : (
                  <i
                    className={`fas ${icon.icon} ${currentNotifyId === icon.notifyId &&
                      'forward'} ${
                      (icon.id === 3 && !supplier_id) || isFreeeAccount ? 'disabled-link' : ''
                    }`}
                  />
                )}
                {/* <span className="sidebarTooltip">Tooltip placeholder</span> */}
              </Menu.Item>
            );
          })}
        </Menu.Menu>
        {/* Lower portion os sidebar */}
        <Menu.Menu className="sidebar-bottom-icon">
          {lowerNavbar.map(icon => {
            return (
              <Menu.Item
                key={icon.id}
                as={isBetaUser && icon.path === '/settings' ? 'div' : Link}
                to={icon.path}
                name={icon.icon}
                active={links[icon.id - 1] === currentPath}
                className={'sidebar-menu__items'}
                disabled={isBetaUser && icon.path === '/settings'}
              >
                <i
                  className={`fas ${icon.icon} ${currentNotifyId === icon.notifyId && 'forward'} ${
                    isBetaUser && icon.path === '/settings' ? 'disabled-link' : ''
                  } `}
                />
              </Menu.Item>
            );
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
  subscriptionType: get(state, 'subscription.subscriptionType'),
  sellerSubscription: getSellerSubscription(state),
});

export default connect(mapStateToProps)(SidebarCollapsible);
