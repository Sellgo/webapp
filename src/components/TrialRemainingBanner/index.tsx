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
    const diff = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays;
  };

  const DAYS_LEFT_TO_SHOW_BANNER = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
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
  if (daysLeft() === 14) {
    bannerColor = '#5AA9FA';
    fontColor = '#FFFFFF';
  } else if (daysLeft() === 13) {
    bannerColor = '#5AA9FA';
    fontColor = '#FFFFFF';
  } else if (daysLeft() === 12) {
    bannerColor = '#5AA9FA';
    fontColor = '#FFFFFF';
  } else if (daysLeft() === 11) {
    bannerColor = '#5AA9FA';
    fontColor = '#FFFFFF';
  } else if (daysLeft() === 10) {
    bannerColor = '#5AA9FA';
    fontColor = '#FFFFFF';
  } else if (daysLeft() === 9) {
    bannerColor = '#5AA9FA';
    fontColor = '#FFFFFF';
  } else if (daysLeft() === 8) {
    bannerColor = '#5AA9FA';
    fontColor = '#FFFFFF';
  } else if (daysLeft() === 7) {
    bannerColor = '#5AA9FA';
    fontColor = '#FFFFFF';
  } else if (daysLeft() === 6) {
    bannerColor = '#5AA9FA';
    fontColor = '#FFFFFF';
  } else if (daysLeft() === 5) {
    bannerColor = '#5AA9FA';
    fontColor = '#FFFFFF';
  } else if (daysLeft() === 4) {
    bannerColor = '#5AA9FA';
    fontColor = '#FFFFFF';
    //change color
  } else if (daysLeft() === 3) {
    bannerColor = '#FFCC2F';
    fontColor = '#1E1E1E';
    //change color
  } else if (daysLeft() === 2) {
    bannerColor = '#FF7B82';
    fontColor = '#FFFFFF';
    //change color
  } else if (daysLeft() === 1) {
    bannerColor = '#E34850';
    fontColor = '#FFFFFF';
  } else {
    bannerColor = '#E34850';
    fontColor = '#FFFFFF';
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
        {daysLeft() === 14 ? (
          <Link
            to={{ pathname: 'https://calendly.com/sellgo-richard/aistock-onboarding' }}
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              Welcome home! Did you know that you can always get an in-person help for onboarding?
              &nbsp;<span>Schedule here</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() === 13 ? (
          <Link
            to="/subscription/payment"
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              You have {daysLeft()} more days of free trial. &nbsp;<span>Upgrade now</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() === 12 ? (
          <Link
            to="/subscription/payment"
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              You have {daysLeft()} more days of free trial. &nbsp;<span>Upgrade now</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() === 11 ? (
          <Link
            to="/subscription/payment"
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              You have {daysLeft()} more days of free trial. &nbsp;<span>Upgrade now</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() === 10 ? (
          <Link
            to="/subscription/payment"
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              You have {daysLeft()} more days of free trial. &nbsp;<span>Upgrade now</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() === 9 ? (
          <Link
            to="/subscription/payment"
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              You have {daysLeft()} more days of free trial. &nbsp;<span>Upgrade now</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() === 8 ? (
          <Link
            to="/subscription/payment"
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              You have {daysLeft()} more days of free trial. &nbsp;<span>Upgrade now</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() === 7 ? (
          <Link
            to="/subscription/payment"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              Thanks again for using AiStock! Get a 10% off coupon after you fill feedback survey
              (check right bottom).
            </p>
          </Link>
        ) : daysLeft() === 6 ? (
          <Link
            to="/subscription/payment"
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              You have {daysLeft()} more days of free trial. &nbsp;<span>Upgrade now</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() === 5 ? (
          <Link
            to="/subscription/payment"
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              You have {daysLeft()} more days of free trial. &nbsp;<span>Upgrade now</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() === 4 ? (
          <Link
            to="/subscription/payment"
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              You have {daysLeft()} more days of free trial. &nbsp;<span>Upgrade now</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() === 3 ? (
          <Link
            to="/subscription/payment"
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              You have {daysLeft()} more days of free trial, to not lose access please upgrade your
              subscription &nbsp;<span>here.</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() === 2 ? (
          <Link
            to="/subscription/payment"
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              You have {daysLeft()} more days of free trial, to not lose access please upgrade your
              subscription &nbsp;<span>here.</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() === 1 ? (
          <Link
            to="/subscription/payment"
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              You have {daysLeft()} more days of free trial, to not lose access please upgrade your
              subscription &nbsp;<span>here.</span>
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
            className={`${daysLeft() <= 3 ? styles.crossIcon__black : styles.crossIcon__white}`}
          />
        </button>
      </div>
    );
  } else {
    return null;
  }
};

export default TrialRemainingBanner;
