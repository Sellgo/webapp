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
  const [showBanner, setShowBanner] = React.useState(false);

  /* Count number of days left to expiry date */
  const daysLeft = () => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diff = Math.abs(expiry.getTime() - today.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays;
  };

  const DAYS_LEFT_TO_SHOW_BANNER = [11, 7, 3, 2, 1];
  React.useEffect(() => {
    if (
      DAYS_LEFT_TO_SHOW_BANNER.includes(daysLeft()) &&
      localStorage.getItem(`aistock_banner_${daysLeft()}_showed`) !== 'true'
    ) {
      setShowBanner(true);
      localStorage.setItem(`aistock_banner_${daysLeft()}_showed`, 'true');
    }
  }, []);

  let bannerColor;
  let fontColor;
  if (daysLeft() === 11) {
    bannerColor = '#3CF7AF';
    fontColor = '#1E1E1E';
  } else if (daysLeft() === 7) {
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

  if (!expiryDate) {
    return null;
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
          <p className={styles.bannerText} style={{ color: fontColor }}>
            Free trial account - {daysLeft()} days remaining.
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
