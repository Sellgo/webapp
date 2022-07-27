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
        {daysLeft() <= 14 ? (
          <Link
            to={{ pathname: 'https://help.sellgo.com/en' }}
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              Welcome to AiStock! Do you want to get smarter forecast for businesses like yours?
              &nbsp;<span>Yes, let's improve my inventory and cash flow planning</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() <= 13 ? (
          <Link
            to={{ pathname: 'https://help.sellgo.com/en' }}
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              Tada! Now you can find quick and easy training here. It'll just take a few minutes to
              read through each section. &nbsp;<span>Check training here</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() <= 12 ? (
          <Link
            to="/subscription/payment"
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              You have {daysLeft()} more days of trial. Get 50% off first month or first year if you
              upgrade before your free trial ends. Use "FIRST50" &nbsp;<span>Get 50% off now</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() <= 11 ? (
          <Link
            to={{ pathname: 'https://calendly.com/sellgo-richard/aistock-onboarding' }}
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              Did you know that you can always get an in-person help for onboarding? &nbsp;
              <span>Schedule here</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() <= 10 ? (
          <Link
            to={{ pathname: 'https://help.sellgo.com/en' }}
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              Did you know that you can create a smart order to streamline and automate your
              inventory order for the next 12-24 months? &nbsp;<span>Learn more</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() <= 9 ? (
          <Link
            to={{ pathname: 'https://help.sellgo.com/en' }}
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              Did you know that you can avoid missing out of growth, profits and healthy cash flow
              by enabling smart cash flow projection? &nbsp;<span>Learn more</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() <= 8 ? (
          <Link
            to="/settings/aistock/sku-settings"
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              Did you know that you can change your SKU settings to get more accurate planning?
              &nbsp;<span>Go to SKU settings</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() <= 7 ? (
          <Link
            to="/subscription/payment"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              Thanks again for using AiStock! Take our survey and get an additional 10% off coupon
              for your first month or first year. &nbsp;<span>Check survey here</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() <= 6 ? (
          <Link
            to="/settings/aistock/days-of-inventory-settings"
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              Did you know that changing days of inventory settings will impact your stock quantity
              to order? &nbsp;<span>Go to Days of Inventory settings</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() <= 5 ? (
          <Link
            to="/subscription/payment"
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              Did you know a feature that you wish you would be able to use here? &nbsp;
              <span>Tell us more</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() <= 4 ? (
          <Link
            to="/subscription/payment"
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              Did you know that you can save more than $15,000 / year for 1M GMV with volume bound
              optimization? &nbsp;<span>Learn more</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() <= 3 ? (
          <Link
            to="/subscription/payment"
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              You have {daysLeft()} more days of trial, Your 50% off first month or first year will
              be gone when your free trial ends. &nbsp;<span>Get discount now</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() <= 2 ? (
          <Link
            to="/subscription/payment"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              Last day discount alert. 50% first month or first year during 14-day free trial are
              still available for tomorrow. Use "FIRST50" &nbsp;<span>Get my discount</span>
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : daysLeft() <= 1 ? (
          <Link
            to="/subscription/payment"
            target="_blank"
            style={{ textDecoration: 'none' }}
            onClick={() => setShowBanner(false)}
          >
            <p className={styles.bannerText} style={{ color: fontColor }}>
              This is your last day of free trial, to not lose access please upgrade your
              subscription &nbsp;<span>here</span> Use "FIRST50" to get 50% off your first month or
              year.
              <Icon name="arrow right" />
            </p>
          </Link>
        ) : (
          <p className={styles.bannerText} style={{ color: fontColor }}>
            On Trial - {daysLeft()} days remaining.
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
