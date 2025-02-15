import React from 'react';
import { Link } from 'react-router-dom';

/* Styling */
import styles from './index.module.scss';

import unlockIcon from '../../assets/images/unlockIcon.svg';
import rightArrow from '../../assets/images/rightArrowPurple.svg';

import { SellerSubscription } from '../../interfaces/Seller';

import { DAILY_SUBSCRIPTION_PLANS } from '../../constants/Subscription/Sellgo';
import { connect } from 'react-redux';

interface Props {
  type: 'Unlock' | 'Upgrade';
  showText?: boolean;
  className?: string;
  sellerSubscription: SellerSubscription;
}

const UpgradeCTA = (props: Props) => {
  const { className, type, sellerSubscription, showText } = props;
  if (DAILY_SUBSCRIPTION_PLANS.includes(sellerSubscription.subscription_id)) {
    return (
      <span>
        {showText && <span> for $1.99 plan. </span>}
        <Link
          to="/settings/pricing"
          className={`${styles.upgradeCTA} ${className}`}
          style={{ color: '#b318f1' }}
        >
          <img src={unlockIcon} alt="unlock-icon" className={styles.unlockIcon} />
          {type}
          <img src={rightArrow} alt="right-arrow-icon" className={styles.arrowIcon} />
        </Link>
      </span>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state: any) => ({
  sellerSubscription: state.subscription.sellerSubscription,
});

export default connect(mapStateToProps)(UpgradeCTA);
