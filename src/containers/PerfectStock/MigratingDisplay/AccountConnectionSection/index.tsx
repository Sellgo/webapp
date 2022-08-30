import React from 'react';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../components/ActionButton';
import history from '../../../../history';

/* Assets */
import LeadTimeLogo from '../../../../assets/images/leadTime.svg';
import GraduationCapLogo from '../../../../assets/images/graduation-cap-solid.png';
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

  /* Open www.help.aistock.co in new tab */
  const handleOpenNewHelpTab = () => {
    window.open('http://help.aistock.co', '_blank');
  };

  /* Open /contact-us in new tab */
  const handleOpenNewContactUsTab = () => {
    window.open('https://aistock.co/contact-us', '_blank');
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
          <div className={styles.connectAccountCard}>
            <img src={GraduationCapLogo} alt="graduation cap" className={styles.connectApiLogo} />
            <p className={styles.connectApiLabel}> Browse AiStock Seller Academy </p>
            <p className={styles.connectApiDesc}>Coming soon</p>
            <ActionButton
              type="purpleGradient"
              variant="secondary"
              size="md"
              className={styles.sellerAcademyBtn}
              onClick={handleOpenNewHelpTab}
            >
              <span>Check it out</span> <Icon name="external" />
            </ActionButton>
          </div>
        </div>
      </div>

      <p className={styles.support}>
        If you have trouble with the account, you can contact us at{' '}
        <span className={styles.contactUs}>
          <a href="mailto:support@aistock.co">support@aistock.co</a>{' '}
          <Icon name="external" onClick={handleOpenNewContactUsTab} />
        </span>{' '}
        We Can Help.
      </p>
    </section>
  );
};

export default AccountConnectionSection;
