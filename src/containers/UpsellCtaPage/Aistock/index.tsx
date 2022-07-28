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
    trackDripDropOff('Aistock Trial Ended');
  }, []);

  return (
    <main className={styles.upsellCtaPage}>
      <div className={styles.leftSection}>
        <h2>Your free trial has expired, upgrade to continue.</h2>
        <p>Take control of your business success through inventory and cash flow forecast.</p>
        <div className={styles.benefitsTable}>
          <div className={styles.benefitsColumn}>
            <h2>Benefits</h2>
            <span>Streamline smart order for longer than 6-month period</span>
            <span>Activate all sales forecasting features</span>
            <span>Activate all order planning features</span>
            <span>Activate all 3PL manager features</span>
            <span>Activate all cash flow expense features</span>
          </div>
          <div className={styles.freePlanColumn}>
            <h2>Free</h2>
            <span>-</span>
            <span>-</span>
            <span>-</span>
            <span>-</span>
            <span>-</span>
          </div>
          <div className={styles.professionalColumn}>
            <h2>Starting from</h2>
            <p className={styles.price}>$77/mo</p>
            <span>Yes</span>
            <span>Yes</span>
            <span>Yes</span>
            <span>Yes</span>
            <span>Yes</span>
          </div>
        </div>
        <ActionButton
          type="purpleGradient"
          variant="primary"
          size="md"
          onClick={redirectToPricing}
          className={styles.activateButton}
        >
          Upgrade now
        </ActionButton>
      </div>
      <img src={UpsellPicture} alt="upsell image" className={styles.upsellImg} />
    </main>
  );
};

export default UpsellCtaPage;
