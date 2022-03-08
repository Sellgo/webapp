import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../components/ActionButton';
import history from '../../../../history';

/* Assets */
import LeadTimeLogo from '../../../../assets/images/leadTime.svg';
import ZoomLogo from '../../../../assets/images/zoomLogo.png';
import { formatNumber } from '../../../../utils/format';

interface Props {
  eta: number;
}
const AccountConnectionSection = (props: Props) => {
  const { eta } = props;
  const handleRedirectToConnectivity = () => {
    history.push('/settings/aistock/lead-time');
  };

  const handleRedirectToZoom = () => {
    /* history push to new tab */
    window.open('https://calendly.com/sellgo-richard/onboarding', '_blank');
  };

  return (
    <section className={styles.connectAccount}>
      <h1>Perfect Stock White Glove Migration is in Progress</h1>
      <p>
        {eta !== -1
          ? `${formatNumber(eta)} minutes left for migration.`
          : 'Calculating ETA for migration.'}
        <br />
        We will email you once the migration is completed.
      </p>
      <div className={styles.connectRow}>
        <div className={styles.connectAccountCard}>
          <img src={LeadTimeLogo} alt="lead time" className={styles.connectApiLogo} />
          <p className={styles.connectApiLabel}> Set up Lead Time </p>
          <p className={styles.connectApiDesc}>
            Quickly set up your logistical timeline, from manufacturer lead time to last leg check
            in
          </p>
          <ActionButton
            type="black"
            variant="primary"
            size="md"
            onClick={handleRedirectToConnectivity}
          >
            Set Up
          </ActionButton>
        </div>
        <div className={styles.connectAccountCard}>
          <img src={ZoomLogo} alt="lead time" className={styles.connectApiLogo} />
          <p className={styles.connectApiLabel}>
            {' '}
            Schedule 1:1 <br />
            Onboarding Call{' '}
          </p>
          <p className={styles.connectApiDesc}>
            We&apos;re here to help. Schedule 15-min to talk with us if you don't like self-guided
            onboarding.
          </p>
          <ActionButton type="black" variant="primary" size="md" onClick={handleRedirectToZoom}>
            Schedule
          </ActionButton>
        </div>
      </div>
    </section>
  );
};

export default AccountConnectionSection;
