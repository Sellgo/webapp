/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

import rightArrow from '../../assets/images/crossIcon.svg';

interface Props {
  paymentMode: string;
  paymentFailedCount?: number;
}
const FailedPaymentsBanner = (props: Props) => {
  const { paymentFailedCount, paymentMode } = props;
  const [showBanner, setShowBanner] = React.useState(true);
  let bannerText;
  switch (paymentFailedCount) {
    case 1:
      bannerText = `Recurring ${paymentMode} payment to Sellgo was unsuccessful, please update your payment method 
      to continue your subscription`;
      break;
    case 2:
      bannerText = `Keep your leads generation uninterrupted! Update your payment method now to avoid any interruption`;
      break;
    case 3:
      bannerText = `We can't wait to keep providing you with awesome leads! Update your payment method before the last charge 
      attempt to avoid cancellation`;
      break;
    default:
      bannerText = `Recurring ${paymentMode} payment to Sellgo was unsuccessful, please update your billing
        information to continue your subscription`;
      break;
  }

  if (showBanner) {
    return (
      <div className={`${styles.failedPaymentsBanner}`}>
        <Link
          to="/settings/billing"
          style={{ textDecoration: 'none' }}
          onClick={() => setShowBanner(false)}
        >
          <p className={styles.bannerText}>
            {bannerText}
            <Icon name="arrow right" />
          </p>
        </Link>
        <button onClick={() => setShowBanner(false)}>
          <img src={rightArrow} alt="close" />
        </button>
      </div>
    );
  } else {
    return null;
  }
};

export default FailedPaymentsBanner;
