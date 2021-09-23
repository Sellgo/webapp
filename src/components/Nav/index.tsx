import React, { Component, ReactElement } from 'react';
import { connect } from 'react-redux';
import { Accordion, Menu, Segment, Sidebar, Icon, Transition } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import { getLatestSupplier } from '../../actions/Suppliers';
import get from 'lodash/get';

import { LogoWithoutText } from '../Logo/index';
import NavIcon from '../Icons/NavIcon';
import sellerFinderIcon from '../../assets/images/sellerFinder.svg';
import productResearchIcon from '../../assets/images/product-research.svg';
import sellerMapIcon from '../../assets/images/sellerMapIcon.svg';
import placeholderIcon from '../../assets/placeholder.svg';

import BetaLabel from '../BetaLabel';
import { isBetaAccount, isSubscriptionIdFreeAccount } from '../../utils/subscriptions';
import { getSellerSubscription } from '../../selectors/Subscription';
import { SellerSubscription } from '../../interfaces/Seller';

import {getActiveIndex, OPTIONS} from '../../constants/AdminLayout';
import NavbarDropdown from './NavbarSuboptions';
import {disableNavOption, updateNavPath} from '../../utils/nav';


// https://medium.com/@9cv9official/create-a-beautiful-hover-triggered-expandable-sidebar-with-simple-html-css-and-javascript-9f5f80a908d1


const NavBar = (props:any) => {
  const [navOptions, setNavOptions] = React.useState<any[]>(OPTIONS);
  const [currentPath, setCurrentPath] = React.useState<string>(window.location.pathname+window.location.search);
  const startingExpandedIndex = getActiveIndex(currentPath);
  const [expandedIndex, setExpandedIndex] = React.useState<number>(startingExpandedIndex);
  const [isExpanded, setExpanded] = React.useState<boolean>(false);
  const {subscriptionPlan, subscriptionType, sellerSubscription} = props;
  
  React.useEffect(() => {
      /* Adding supplier id to profit-finder path parameter */
      let supplier_id = '';
      const latest = getLatestSupplier();
      if (latest) {
        supplier_id = latest.supplier_id;
      }
      const newNavOptions = [...navOptions]
      updateNavPath('/profit-finder', `/profit-finder/${supplier_id}`, newNavOptions);
      disableNavOption('Product Research', newNavOptions);
      setNavOptions(newNavOptions);
  }, [])

  const isFreeeAccount = isSubscriptionIdFreeAccount(0); //Subscription iD
  // const isBetaUser = isBetaAccount(null); //subscription

  const handleSetExpandedIndex = (e:any, titleProps:any) => {
    const { index } = titleProps
    const newIndex = expandedIndex === index ? -1 : index
    setExpandedIndex(newIndex)
  }

  const handleOnHoverIn = () => {
    setExpandedIndex(startingExpandedIndex);
    setExpanded(true);
  }

  const handleOnHoverOut = () => {
    setExpanded(false);
  }

  return (
      <div className={styles.navbarWrapper}> 
          <Accordion className={styles.navBar} onMouseEnter={handleOnHoverIn} onMouseOut={handleOnHoverOut}>
              {navOptions.map((option:any, index: number) => {
                  return (
                    <NavbarDropdown
                      currentPath={currentPath}
                      setCurrentPath={setCurrentPath}
                      option={option}
                      optionIndex={index}
                      expandedIndex={expandedIndex}
                      setExpandedIndex={handleSetExpandedIndex}
                      mainOptionClassName={styles.mainNavOption}
                      subOptionClassName={styles.subNavOptions}
                    />
                  )    
              })}
          </Accordion>
      </div>
  )
}

const mapStateToProps = (state: any) => ({
  subscriptionPlan: get(state, 'subscription.plan'),
  subscriptionType: get(state, 'subscription.subscriptionType'),
  sellerSubscription: getSellerSubscription(state),
});

export default connect(mapStateToProps)(NavBar);
