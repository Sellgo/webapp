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

  const daysTillNextMonth = () => {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const timeDiff = Math.abs(nextMonth.getTime() - today.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  };

  return (
    <main className={styles.upsellCtaPage}>
      <div className={styles.leftSection}>
        <h2>You have 0 quota available with free account.</h2>
        <p>
          Wait for {daysTillNextMonth()} days to restore your free quota, or upgrade to get
          immediate access.
        </p>
        <div className={styles.benefitsTable}>
          <div className={styles.benefitsColumn}>
            <h2>Benefits</h2>
            <span>Export seller data</span>
            <span>Advanced filtering</span>
            <span>Unlock 2,000 seller access</span>
          </div>
          <div className={styles.freePlanColumn}>
            <h2>Free</h2>
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
