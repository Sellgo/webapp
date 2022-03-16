import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../components/ActionButton';
import history from '../../../../history';

/* Assets */
import LeadTimeLogo from '../../../../assets/images/leadTime.svg';

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
      </div>
    </section>
  );
};

export default AccountConnectionSection;
