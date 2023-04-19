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
      bannerText = `Recurring ${paymentMode} payment to Sellgo was unsuccessful for first time, please update your billing
      information to continue your subscription`;
      break;
    case 2:
      bannerText = `Recurring ${paymentMode} payment to Sellgo was unsuccessful for second time, please update your billing
      information to continue your subscription`;
      break;
    case 3:
      bannerText = `Recurring ${paymentMode} payment to Sellgo was unsuccessful for last time, please update your billing
        information to continue your subscription`;
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
