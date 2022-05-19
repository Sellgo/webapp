import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../components/ActionButton';
import history from '../../../../history';

/* Assets */
import LeadTimeLogo from '../../../../assets/images/leadTime.svg';
import ZoomLogo from '../../../../assets/images/zoomLogo.png';

/* Utils */
import { formatNumber } from '../../../../utils/format';

interface Props {
  eta: number;
}
const AccountConnectionSection = (props: Props) => {
  const { eta } = props;
  const handleRedirectToConnectivity = () => {
    history.push('/settings/aistock/lead-time');
  };

  /* Open www.calendly.com in new tab */
  const handleOpenNewCalendlyTab = () => {
    window.open('https://calendly.com/sellgo-richard/aistock-onboarding', '_blank');
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
            type="purpleGradient"
            variant="secondary"
            size="md"
            onClick={handleRedirectToConnectivity}
          >
            Set Up
          </ActionButton>
        </div>
        <div className={styles.connectAccountCard}>
          <img src={ZoomLogo} alt="zoom" className={styles.connectApiLogo} />
          <p className={styles.connectApiLabel}>
            {' '}
            Schedule 1:1 <br />
            Onboarding Call{' '}
          </p>
          <p className={styles.connectApiDesc}>
            Set up a quick onboarding call today in order to get a head start on AiStock
          </p>
          <ActionButton
            type="purpleGradient"
            variant="secondary"
            size="md"
            onClick={handleOpenNewCalendlyTab}
          >
            Schedule A Call
          </ActionButton>
        </div>
      </div>
    </section>
  );
};

export default AccountConnectionSection;
