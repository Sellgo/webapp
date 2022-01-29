import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../components/ActionButton';
import history from '../../../../history';

/* Assets */
// import ZapierLogo from '../../../../assets/images/zapier.svg';
import AmazonLogo from '../../../../assets/images/amazonLogo.svg';
import Lightbulb from '../../../../assets/images/lightbulb.svg';

const AccountConnectionSection = () => {
  const handleRedirectToConnectivity = () => {
    history.push('./settings/connectivity?first-time-logged-in=true');
  };

  // const handleRedirectToZapier = () => {
  //   history.push('./settings/api-keys?first-time-logged-in=true');
  // };

  return (
    <section className={styles.connectAccount}>
      <h1>Perfect Stock White Glove Migration is in Progress</h1>
      <p>
        Depending on the number of products you have this could take anytime between 5-10 hours.
        <br />
        We will email you once the migration is completed.
      </p>
      <div className={styles.lightbulbLabel}>
        <img src={Lightbulb} alt="lightbulb" />
        <p>Users save 30+ hours/ month with {<br />}integrations</p>
      </div>
      <div className={styles.connectRow}>
        <div className={styles.connectAccountCard}>
          <img src={AmazonLogo} alt="amazon" className={styles.connectApiLogo} />
          <p className={styles.connectApiLabel}> Amazon Seller Central </p>
          <ActionButton
            type="black"
            variant="secondary"
            size="small"
            onClick={handleRedirectToConnectivity}
          >
            Connect
          </ActionButton>
        </div>
        {/* <div className={styles.connectAccountCard}>
          <img src={ZapierLogo} alt="zapier" className={styles.connectApiLogo} />
          <p className={styles.connectApiLabel}> Zapier </p>
          <ActionButton
            type="black"
            variant="secondary"
            size="small"
            onClick={handleRedirectToZapier}
          >
            Connect
          </ActionButton>
        </div> */}
      </div>
    </section>
  );
};

export default AccountConnectionSection;
