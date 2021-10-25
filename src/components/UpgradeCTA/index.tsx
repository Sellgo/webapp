import React from 'react';
import { Link } from 'react-router-dom';

/* Styling */
import styles from './index.module.scss';

import unlockIcon from '../../assets/images/unlockIcon.svg';
import rightArrow from '../../assets/images/rightArrowPurple.svg';

import { SellerSubscription } from '../../interfaces/Seller';

import { DAILY_SUBSCRIPTION_PLANS } from '../../constants/Subscription';
import { connect } from 'react-redux';

interface Props {
  type: 'Unlock' | 'Upgrade';
  className?: string;
  sellerSubscription: SellerSubscription;
}

const UpgradeCTA = (props: Props) => {
  const { className, type, sellerSubscription } = props;
  if (DAILY_SUBSCRIPTION_PLANS.includes(sellerSubscription.subscription_id)) {
    return (
      <Link
        to="/settings/pricing"
        className={`${styles.upgradeCTA} ${className}`}
        style={{ color: '#b318f1' }}
      >
        <img src={unlockIcon} alt="unlock-icon" className={styles.unlockIcon} />
        {type}
        <img src={rightArrow} alt="right-arrow-icon" className={styles.arrowIcon} />
      </Link>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state: any) => ({
  sellerSubscription: state.subscription.sellerSubscription,
});

export default connect(mapStateToProps)(UpgradeCTA);
