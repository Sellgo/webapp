import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

import rightArrow from '../../assets/images/crossIcon.svg';

interface Props {
  paymentMode: string;
}
const FailedPaymentsBanner = (props: Props) => {
  const { paymentMode } = props;
  const [showBanner, setShowBanner] = React.useState(true);

  if (showBanner) {
    return (
      <div className={`${styles.failedPaymentsBanner}`}>
        <Link
          to="/settings/billing"
          style={{ textDecoration: 'none' }}
          onClick={() => setShowBanner(false)}
        >
          <p className={styles.bannerText}>
            Recurring {paymentMode} payment to Sellgo was unsuccessful, please update your billing
            information to continue your subscription
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
