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
    window.open('https://calendly.com/aistock-richard/onboarding', '_blank');
  };

  return (
    <section className={styles.connectAccount}>
      <h1>AiStock migration is in progress</h1>
      <p>
        {eta !== -1
          ? `${formatNumber(eta)} minutes left for migration.`
          : 'Calculating ETA for migration.'}
        <br />
        We will email you once the migration is completed.
      </p>
      <div className={styles.connectRow}>
        <div className={styles.connectAccountContainer}>
          <div className={styles.connectAccountCard}>
            <img src={LeadTimeLogo} alt="lead time" className={styles.connectApiLogo} />
            <p className={styles.connectApiLabel}> Set up lead time </p>
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
              Set up
            </ActionButton>
          </div>
          <div className={styles.connectAccountCard}>
            <img src={ZoomLogo} alt="zoom" className={styles.connectApiLogo} />
            <p className={styles.connectApiLabel}>
              {' '}
              Schedule 1:1 <br />
              onboarding call{' '}
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
              Schedule a call
            </ActionButton>
          </div>
        </div>
        <div className={styles.migrationDesc}>
          <h2>Thanks for your patience of waiting for the migration.</h2>
          <p>
            Say goodbye to missing out on growth, profits and healthy cash flow because of manual
            and outdated supply chain. We will streamline and automate what is often the most
            stressful, time consuming and costly process of your Amazon business.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AccountConnectionSection;
