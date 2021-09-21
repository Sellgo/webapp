import React, { Component, ReactElement } from 'react';
import { connect } from 'react-redux';
import { Menu, Segment, Sidebar, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './index.scss';
import { getLatestSupplier } from '../../actions/Suppliers';
import get from 'lodash/get';

import { LogoWithoutText } from '../Logo/index';
import sellerFinderIcon from '../../assets/images/sellerFinder.svg';
import productResearchIcon from '../../assets/images/product-research.svg';
import sellerMapIcon from '../../assets/images/sellerMapIcon.svg';
import placeholderIcon from '../../assets/placeholder.svg';

import BetaLabel from '../BetaLabel';
import { isBetaAccount, isSubscriptionIdFreeAccount } from '../../utils/subscriptions';
import { getSellerSubscription } from '../../selectors/Subscription';
import { SellerSubscription } from '../../interfaces/Seller';

import * as NAV_OPTIONS from '../../constants/AdminLayout';

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
        id: NAV_OPTIONS.SEARCH_MANAGEMENT_ID,
        label: 'Search Management',
        icon: 'fas fa-clipboard-list',
        path: '/synthesis',
        imageType: false,
      },
      {
        id: NAV_OPTIONS.PROFIT_FINDER_ID,
        label: 'Profit Finder',
        icon: 'fas fa-search-dollar',
        path: '/profit-finder',
        imageType: false,
      },
      {
        id: 3,
        label: 'Product Tracker',
        icon: 'fas fa-fingerprint',
        path: '/product-tracker',
        imageType: false,
      },
      {
        id: 4,
        label: 'Leads Tracker',
        icon: 'fas fa-user-ninja',
        path: '/leads-tracker',
        imageType: false,
      },
      {
        id: 5,
        label: 'Seller Research',
        icon: sellerMapIcon,
        path: '/seller-research',
        imageType: true,
        isBeta: true,
      },
      {
        id: 6,
        label: 'Seller Finder',
        icon: sellerFinderIcon,
        path: '/seller-finder',
        imageType: true,
        isBeta: true,
      },
      {
        id: 7,
        label: 'Product Research',
        icon: productResearchIcon,
        path: '/product-research',
        imageType: true,
        isBeta: true,
      },
      {
        id: 8,
        label: 'Keyword Research',
        icon: placeholderIcon,
        path: '/keyword-research',
        imageType: true,
        isBeta: true,
      },
      { id: 9, label: 'Settings', icon: 'fas fa-cog', path: '/settings', notifyId: 4 },
      {
        id: 10,
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
    const { children, sellerSubscription } = this.props;

    const upperNavbar = this.state.sidebarIcon.filter(icon => icon.id < 9);
    const lowerNavbar = this.state.sidebarIcon.filter(icon => icon.id >= 9);

    let supplier_id = '';

    const latest = getLatestSupplier();
    if (latest) {
      supplier_id = latest.supplier_id;
    }

    const currentPath = window.location.pathname;
    const links = sidebarIcon.map((link: any) =>
      link.id === 2 ? `${link.path}/${supplier_id}` : link.path
    );

    const isFreeeAccount = isSubscriptionIdFreeAccount(sellerSubscription.subscription_id);
    const isBetaUser = isBetaAccount(sellerSubscription);

    const sidebarMenu = (
      <>
        <Link to="/" className="sidebar-menu__logo">
          <LogoWithoutText />
        </Link>
        {/* Upper portion of sidebar */}
        <Menu.Menu>
          {upperNavbar.map(icon => {
            return (
              <Menu.Item
                onClick={() => {
                  visible && this.handleAnimationChange();
                }}
                as={isFreeeAccount || (icon.id === 2 && !supplier_id) ? 'div' : Link}
                disabled={isFreeeAccount || !!(icon.id === 2 && !supplier_id)}
                to={icon.id === 2 && !!supplier_id ? `${icon.path}/${supplier_id}` : icon.path}
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
                    className={`fas ${icon.icon} ${
                      (icon.id === 2 && !supplier_id) || isFreeeAccount ? 'disabled-link' : ''
                    }`}
                  />
                )}
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
                as={
                  (isFreeeAccount && icon.id === 10) || (isBetaUser && icon.path === '/settings')
                    ? 'div'
                    : Link
                }
                to={icon.path}
                name={icon.icon}
                active={links[icon.id - 1] === currentPath}
                className={'sidebar-menu__items'}
                disabled={
                  (isFreeeAccount && icon.id === 10) || (isBetaUser && icon.path === '/settings')
                }
              >
                <i
                  className={`fas ${icon.icon} ${
                    (isFreeeAccount && icon.id === 10) || (isBetaUser && icon.path === '/settings')
                      ? 'disabled-link'
                      : ''
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
          {sidebarMenu}
      </Grid>
    );
  }
}

const mapStateToProps = (state: any) => ({
  subscriptionPlan: get(state, 'subscription.plan'),
  subscriptionType: get(state, 'subscription.subscriptionType'),
  sellerSubscription: getSellerSubscription(state),
});

export default connect(mapStateToProps)(SidebarCollapsible);
