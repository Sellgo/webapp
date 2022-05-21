import React from 'react';
import UpsellPicture from '../../../assets/images/upsellPicture.png';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../components/ActionButton';
import history from '../../../history';

const UpsellCtaPage = () => {
  const redirectToPricing = () => {
    history.push('/subscription');
  };

  return (
    <main className={styles.upsellCtaPage}>
      <div className={styles.leftSection}>
        <h2>Sorry, your free trial subscription has expired.</h2>
        <p>
          Make more strategic business decision while always liquid with valuable forecast from our
          inventory and cash flow forecast tool.
        </p>
        <div className={styles.benefitsTable}>
          <div className={styles.benefitsColumn}>
            <h2>Benefits</h2>
            <span>Enable more than 5+ SKUs</span>
            <span>Streamline smart order for longer than 6-month period</span>
            <span>Unlock advance sales forecast with seasonality and deals</span>
            <span>Enable smart order volume-bound optimization </span>
            <span>Unlock cash flow tool</span>
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
            <h2>Professional</h2>
            <p className={styles.price}>$97/mo</p>
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
          Activate now
        </ActionButton>
      </div>
      <img src={UpsellPicture} alt="upsell image" className={styles.upsellImg} />
    </main>
  );
};

export default UpsellCtaPage;
