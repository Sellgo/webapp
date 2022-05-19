import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

import { ReactComponent as CrossIcon } from '../../assets/images/crossIcon.svg';

interface Props {
  expiryDate: string;
}
const TrialRemainingBanner = (props: Props) => {
  const { expiryDate } = props;
  const [showBanner, setShowBanner] = React.useState(true);
  /* Count number of days left to expiry date */
  const daysLeft = () => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diff = Math.abs(expiry.getTime() - today.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays;
  };

  let bannerColor;
  let fontColor;
  if (daysLeft() >= 8) {
    bannerColor = '#3CF7AF';
    fontColor = '#1E1E1E';
  } else if (daysLeft() >= 4) {
    bannerColor = '#FFCC2F';
    fontColor = '#1E1E1E';
  } else if (daysLeft() === 3) {
    bannerColor = '#FC7900';
    fontColor = '#FFF';
  } else if (daysLeft() === 2) {
    bannerColor = '#FF7B82';
    fontColor = '#FFF';
  } else if (daysLeft() === 1) {
    bannerColor = '#E34850';
    fontColor = '#FFF';
  } else {
    bannerColor = '#E34850';
    fontColor = '#FFF';
  }

  if (showBanner) {
    return (
      <div
        className={`${styles.failedPaymentsBanner}`}
        style={{
          background: bannerColor,
        }}
      >
        {daysLeft() <= 3 ? (
          <Link
            to="/settings/pricing"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              You have {daysLeft()} more days of trial, to not lose access please upgrade your
              subscription &nbsp;<span>here</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : (
          <p
            className={styles.bannerText}
            style={{ color: fontColor }}
            onClick={() => setShowBanner(false)}
          >
            On Trial - {daysLeft()} days remaining.
            <Icon name="arrow right" />
          </p>
        )}
        <button onClick={() => setShowBanner(false)}>
          <CrossIcon
            className={`${daysLeft() <= 3 ? styles.crossIcon__white : styles.crossIcon__black}`}
          />
        </button>
      </div>
    );
  } else {
    return null;
  }
};

export default TrialRemainingBanner;
