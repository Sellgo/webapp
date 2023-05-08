import React from 'react';
import UpsellPicture from '../../../assets/images/upsellPicture.png';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../components/ActionButton';
import history from '../../../history';

/* Utils */
import { trackDripDropOff } from '../../../utils/analyticsTracking';

const UpsellCtaPage = () => {
  const redirectToPricing = () => {
    history.push('/settings/pricing');
  };

  React.useEffect(() => {
    trackDripDropOff('Sellgo No Quota');
  }, []);

  // const daysTillNextMonth = () => {
  //   const today = new Date();
  //   const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  //   const timeDiff = Math.abs(nextMonth.getTime() - today.getTime());
  //   const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  //   return diffDays;
  // };

  return (
    <main className={styles.upsellCtaPage}>
      <div className={styles.leftSection}>
        <h2>Activate your subscription now</h2>
        <p>
          Stay ahead of the game by unlocking premium leads! Don't miss out on new opportunities -
          stay subscribed.
        </p>
        <div className={styles.benefitsTable}>
          <div className={styles.benefitsColumn}>
            <h2>
              Get started with $399/month for annual plan
              <br />
            </h2>
            <span>Unlimited leads discovery</span>
            <span>Decision maker contact info</span>
            <span>Bulk export, and more</span>
          </div>
          {/* <div className={styles.freePlanColumn}>
            <h2>Free account</h2>
            <span>5 lookups/ month</span>
            <span>Limited</span>
            <span>Limited</span>
          </div> */}
          <div className={styles.professionalColumn}>
            <h2>Benefits</h2>
            <span>Immediate access to high quality leads</span>
            <span>Email, phones, social media, and more</span>
            <span>CSV, CRM, and Zapier!</span>
          </div>
        </div>
        <ActionButton
          type="purpleGradient"
          variant="primary"
          size="md"
          onClick={redirectToPricing}
          className={styles.activateButton}
        >
          Activate subscription now
        </ActionButton>
      </div>
      <img src={UpsellPicture} alt="upsell image" className={styles.upsellImg} />
    </main>
  );
};

export default UpsellCtaPage;
