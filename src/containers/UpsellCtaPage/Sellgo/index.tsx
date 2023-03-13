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
          Wait for {daysTillNextMonth()} days to restore your free quota, or upgrade to usage-based
          account to get immediate access to more than 1M Amazon seller database.
        </p>
        <div className={styles.benefitsTable}>
          <div className={styles.benefitsColumn}>
            <h2>Benefits</h2>
            <span>Unlock emails, phones, and more</span>
            <span>Advanced filtering</span>
            <span>Export bulk data, and more</span>
          </div>
          <div className={styles.freePlanColumn}>
            <h2>Free account</h2>
            <span>5 lookups/ month</span>
            <span>Limited</span>
            <span>Limited</span>
          </div>
          <div className={styles.professionalColumn}>
            <h2>Usage-based starts at $77/ month</h2>
            <span>Immediate access to up to more lookups</span>
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
