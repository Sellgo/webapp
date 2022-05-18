import React from 'react';
import UpsellPicture from '../../../assets/images/upsellPicture.png';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../components/ActionButton';
import history from '../../../history';

const UpsellCtaPage = () => {
  const redirectToPricing = () => {
    history.push('/settings/pricing');
  };

  return (
    <main className={styles.upsellCtaPage}>
      <div className={styles.leftSection}>
        <h2>You have 0 quota available with free account.</h2>
        <p>But don&apos;t worry ...</p>
        <div className={styles.benefitsTable}>
          <div className={styles.benefitsColumn}>
            <h2>Benefits</h2>
            <span>Benefit 1</span>
            <span>Benefit 2</span>
            <span>Benefit 3</span>
          </div>
          <div className={styles.freePlanColumn}>
            <h2>Free</h2>
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </div>
          <div className={styles.professionalColumn}>
            <h2>Professional</h2>
            <p className={styles.price}>$97/mo</p>
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </div>
        </div>
        <ActionButton
          type="purpleGradient"
          variant="primary"
          size="md"
          onClick={redirectToPricing}
          className={styles.activateButton}
        >
          Activate Now
        </ActionButton>
      </div>
      <img src={UpsellPicture} alt="upsell image" className={styles.upsellImg} />
    </main>
  );
};

export default UpsellCtaPage;
